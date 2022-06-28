import React, { useState, useRef, useCallback } from "react";
import {
  Pressable,
  Alert,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
  View,
  Keyboard,
  BackHandler,
  Platform,
} from "react-native";
import { azureblobfetch } from "react-native-azure-blob-storage-manager/azurblobstorage";
import MasonryList from "@react-native-seoul/masonry-list";
import { AZURE_BASE_URL } from "../../Redux-api/endPoints";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style";
import * as globals from "../../Utils/globals";
import AppConstants from "../../Theme/AppConstant";
import stylesHome from "../HomeScreen/style";
import { Header } from "../../Component/Header";
import TitleView from "../../Component/TitleView";
import Search from "../../Component/Search";
import { Text, useTheme } from "react-native-paper";
import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import { AppColor } from "../../Theme";
import moment from "moment";
import {
  getdMedialistbyAlbum,
  uploadMedia,
  deleteUserMediaAlbumDetailSuccess,
  deleteUserMediaAlbumDetailFail,
  deleteUserMediaAlbumDetail,
  getdMediaListByAlbumSuccess,
  albumDetailSuccessLocalData,
  updateAlbumImageUpload,
} from "../../Redux-api/actions/Home";

import AuthContext from "../../context/AuthContext";
import { useRoute } from "@react-navigation/core";
import { MediaCard } from "../../Component/AlbumDetailCard";
import ZoomView from "../../Component/ZoomView";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import Upload from "react-native-background-upload";
import stylesAlbum from "../Album/style";
import { CurrentDate } from "../../common";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import { removeCurrentUser } from "../../database/localDB";
import { notifyMessage } from "../../Component/AlertView";
import CalendarView from "../../Component/Calendar";
import { cloneDeep } from "lodash";

const { height, width } = Dimensions.get("screen");

const AlbumDetailScreen = (props) => {
  var countImgFailedToUpload = 0; // Only count failed images so that we can show fail images counting to user.
  var arrayLibraryLocalData = []; // Local data which need to be save on server
  // var countPickerSelectedImage = 0; // How many images selected by image picker in 1 time open picker

  const { user } = React.useContext(AuthContext);
  const [arrayImages, setArrayImages] = React.useState([]); // For date+ imageData
  const [arrayAllDates, setArrayAllDates] = React.useState([]); // Only dates to show the row title
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(""); // Assign calendar selected date
  const [isRefreshing, setisRefreshing] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const route = useRoute();
  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalCommentPage, setTotalCommentPage] = React.useState(0);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [isNewDataAdded, setIsNewDataAdded] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [formErr, setFormError] = React.useState("");
  const [urlZoom, setUrlZoom] = useState(""); // Url of the object which will zoom on the tap
  const [itemZoom, setItemZoom] = useState({}); // Passing complete item to Zoom view
  const [isaccess, setisaccess] = useState(""); // if isaccess= 0 menas readOnly else full access
  const [isImageFullScreen, setIsImageFullScreen] = useState(false); //On click make video on fullscreen.
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false); //On click make video on fullscreen.
  const [isSelectAll, setIsSelectAll] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);
  const [countPickerSelectedImage, setCountPickerSelectedImage] = useState(0);
  const [arrayCheckMarks, setArrayCheckMarks] = React.useState([]);
  const [istitle, setistitle] = useState("");
  const [isLongPress, setIsLongPress] = React.useState(false); // Media Card LongPress
  const [arrayLocalData, setArrayLocalData] = useState([]);
  const [countFailState, setCountFailState] = useState(0);
  const [searchAlbumName, setSearchAlbumName] = useState(""); // Search bar text
  const [imageUpload, setImageUpload] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const { setUserData } = React.useContext(AuthContext);
  const flatListRef = useRef();
  var countBack = 0;
  var fullScreenMediaCheck = false;

  React.useEffect(() => {
    setistitle(route.params.albumdetail.name);

    setCurrentPage(1);

    callgetmedialistbyalbumApi(route.params.albumdetail.album_id, 1);

    const unsubscribe = props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      setSearchAlbumName("");
      clearState();
      let isitaccess = route.params.access;
      setisaccess(isitaccess);
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      // flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // After adding any new object scroll flatlist to the index
    });

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, [route.params]);

  const clearState = () => {
    if (arrayImages) {
      setArrayImages([]);
      // arrayImages.length = 0;
    }
    if (arrayAllDates) {
      setArrayAllDates([]);
      // arrayAllDates.length = 0;
    }
  };

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;

    // if (fullScreenMediaCheck) {
    setIsImageFullScreen(false);
    setIsVideoFullScreen(false);
    //   return true;
    // }else
    {
      if (countBack > 2) {
        Alert.alert(
          AppConstants.constant.EXIT_APP,
          AppConstants.constant.WANT_TO_EXIT_APP,
          [
            {
              text: AppConstants.constant.CANCEL,
              onPress: () => (countBack = 0),
              style: "cancel",
            },
            {
              text: AppConstants.constant.OK,
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        setSearchAlbumName("");
        props.navigation.goBack();
      }
    }
    return true;
  };

  const callgetmedialistbyalbumApi = useCallback(
    (paramId, counter, selectedDate) => {
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      setIsApiCall(true);
      // const albumIdParam = data.HomeReducer.albumIdParam;

      if (selectedDate) {
        let param = {
          sessid: user.sessid ? user.sessid : "",
          album_id: paramId ? paramId : "",
          page: counter ? counter : currentPage,
          date: selectedDate,
        };
        dispatch(getdMedialistbyAlbum(param));
      } else {
        let param = {
          sessid: user.sessid ? user.sessid : "",
          album_id: paramId ? paramId : "",
          page: counter ? counter : currentPage,
        };
        dispatch(getdMedialistbyAlbum(param));
      }
    },
    []
  );

  const callApiToDelete = (arrayDeleteItems) => {
    // console.log("arrayDeleteItems  ===>, res ===>", arrayDeleteItems);
    setIsLongPress(false);
    setArrayCheckMarks([]);
    arrayCheckMarks.length = 0;
    //  setIsApiCall(true);

    let param = {
      sessid: user.sessid ? user.sessid : "",
      data: arrayDeleteItems,
    };
    dispatch(deleteUserMediaAlbumDetail(param));
    callToDeleteLocalItems(arrayDeleteItems);
  };

  // In Android file name is not getting by library so we are generating the random string to show the
  const generateRandomFileName = () => {
    let length = 5;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const distinctLibraryArray = (data) => {
    if (Platform.OS === "android") {
      {
        // In android for local files we added pathstring and azure files contains the file_name so we need to implement distict based on both values.
        result = data.filter(function (a) {
          var key = a.pathString
            ? a.pathString
            : "" + "|" + a.file_name
            ? a.file_name
            : "";
          if (!this[key]) {
            this[key] = true;
            return true;
          }
        }, Object.create(null));

        return result;
      }
    } else {
      const distinctArray = [
        ...new Map(data.map((x) => [x["file_name"], x])).values(),
      ];

      return distinctArray;
    }
  };

  const checkSizeBeforeupdate = () => {
    {
      // your own space is >= to yout total space
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
      })
        .then((response) => {
          setCountPickerSelectedImage(response.length);

          let tempMediaspce = 0;
          let temData = [];
          let uplodmedia = true;

          // Upload Staging api and integration
          const tempIMG = [];
          response.map((data1) => {
            if (Platform.OS === "ios") {
              fileNameTemp = data1.filename;
            } else {
              fileNameTemp = generateRandomFileName();
            }
            const source = {
              uri: Platform.OS === "android" ? data1.path : data1.sourceURL,
              name: fileNameTemp,
              // Platform.OS === "ios"
              //   ? data1.filename.split(".HEIC")[0] + ".jpg"
              //   : generateRandomFileName(),
              size: data1.size,
              type: data1.mime,
            };
            console.log("source =>", source);
            tempIMG.push(source);
            let dictImageToShow = {};
            let fileNameTemp = "";

            dictImageToShow = {
              file_name: fileNameTemp,
              file_type: data1.mime,
              is_success: true,
              size: data1.size,
              owner_id: user.user_detail.user_id,
              status: AppConstants.constant.NEW_ADDED, // So when uploading to azure only new marked data will be uploaded on azure.
              album_id: route.params.albumdetail.album_id,
              sourceURL:
                Platform.OS === "android" ? data1.path : data1.sourceURL,
              uri: Platform.OS === "android" ? data1.path : data1.sourceURL,

              user_media_id: Math.random(), // We are distincting array elements based on user_media id so we generate it unique
              pathString:
                Platform.OS === "android"
                  ? JSON.stringify(data1.path)
                  : data1.sourceURL,
            };
            tempMediaspce = tempMediaspce + data1.size;

            let userOwnSpace = {};
            if (data.HomeReducer && data.HomeReducer.userSpace) {
              userOwnSpace = data.HomeReducer.userSpace;
            } else if (
              data.HomeReducer &&
              data.HomeReducer.library &&
              data.HomeReducer.library.data &&
              data.HomeReducer.library.data.userSpace
            ) {
              userOwnSpace = data.HomeReducer.library.data.userSpace;
            }

            var currentTotalUsedBytes =
              data.HomeReducer.userSpace.own_space.own_space_used_total_bytes +
              tempMediaspce;

            if (
              currentTotalUsedBytes <
              userOwnSpace.own_space.own_space_total_bytes
            ) {
              uplodmedia = true;
              temData.push(dictImageToShow);
            } else {
              uplodmedia = false;
            }
          });
          // Upload Staging api and integration
          setImageUpload(tempIMG);

          if (uplodmedia === true) {
            if (arrayAllDates.length > 0) {
              let todayDate = moment().format("YYYY-MM-DD");
              //** check date already present in the array  */
              if (arrayAllDates.includes(todayDate)) {
                //Skip it
              } else {
                setArrayAllDates(arrayAllDates.concat(todayDate));
              }
            } else {
              let todayDate = moment().format("YYYY-MM-DD");
              setArrayAllDates([todayDate]);
            }

            if (arrayImages.length > 0) {
              let todayDate = moment().format("YYYY-MM-DD");
              let dateWithData = { [todayDate]: temData };

              let indexPresent = -1;
              for (let index = 0; index < arrayImages.length; index++) {
                const element = arrayImages[index];
                if (element[todayDate]) {
                  indexPresent = index;
                  break;
                }
              }

              let arrayImagesCopy = arrayImages;

              //** index present means data available on this date then just update the existing object  */
              if (indexPresent > -1) {
                const element = arrayImagesCopy[indexPresent];
                let arrayTemp = element[todayDate];
                let arrayTemp2 = arrayTemp.concat(temData);
                element[todayDate] = arrayTemp2;

                arrayImagesCopy[indexPresent] = element;
                setArrayImages(arrayImagesCopy);
                setIsNewDataAdded(true);
                dispatch(albumDetailSuccessLocalData(arrayImagesCopy));
              } else {
                //** Add as a new element in the array  */
                arrayImagesCopy = arrayImagesCopy.concat(dateWithData);
                setArrayImages(arrayImagesCopy);
                setIsNewDataAdded(true);
                //** For updating inner list using reducer local data */
                dispatch(albumDetailSuccessLocalData(arrayImagesCopy));
              }
            } else {
              //** Empty album adding new data  */
              let todayDate = moment().format("YYYY-MM-DD");

              let dateWithData = { [todayDate]: temData };
              setArrayImages([dateWithData]);
            }
          } else {
            showUpgradeAlert();
          }
        })
        .catch((e) => {});
    }
  };

  // Upload Staging api and integration
  const gotoUploadImage = (data) => {
    console.warn("i am in gotoUploadImage", data);
    callAPItoUploadImage(data);
  };
  // Upload Staging api and integration
  const callAPItoUploadImage = (data) => {
    const params = new FormData();
    // let getfinalTitle = getTimeStemp(title);

    console.log("413------->i am in callAPItoUploadImage=>", data);

    params.append("sessid", user.sessid);
    params.append("name", istitle);
    params.append("code_name", route.params.albumdetail.code_name);
    data.map((data1, index) => {
      params.append("album_media[" + index + "]", data1);
    });

    console.log("420------->i am in callAPItoUploadImage=>", params);
    setTimeout(() => {
      dispatch(updateAlbumImageUpload(params));
    }, 100);
    props.navigation.navigate("Home");
  };

  // Initialy check
  const checkUserAvailableSpace = () => {
    let userOwnSpace = {};
    if (data.HomeReducer && data.HomeReducer.userSpace) {
      userOwnSpace = data.HomeReducer.userSpace.own_space;
      if (
        userOwnSpace.own_space_total_bytes >=
        userOwnSpace.own_space_used_total_bytes
      ) {
        return true;
      } else {
        showUpgradeAlert();
        return false;
      }
    }
  };
  const showUpgradeAlert = () => {
    Alert.alert(
      AppConstants.constant.ONLINE_FAMILY_VAULT,
      AppConstants.constant.UPGRADE_ACCOUNT_ALERT,
      [
        {
          text: AppConstants.constant.REMIND_ME_LATER,
          onPress: () => console.log("ok"),
        },
        {
          text: AppConstants.constant.UPGRADE_NOW,
          onPress: () => moveToSubscriptionScreen(),
        },
      ]
    );
  };

  const moveToSubscriptionScreen = () => {
    props.navigation.navigate("Subscription");
  };

  const selectImage = () => {
    if (checkUserAvailableSpace()) {
      checkSizeBeforeupdate();
    }
  };

  // get unquie timestemp
  const getTimeStemp = (istitle) => {
    var date = moment().utcOffset("+05:30").format("MMDDYYhhmms");
    var splitStr = istitle.toLowerCase();
    var replacedStr = splitStr.split(" ").join("_");
    var finalTitle = replacedStr + "_" + date;
    return finalTitle;
  };

  const moveBack = () => {

   route.params.onReturn("Chandni ");
    props.navigation.goBack();
    console.log("props.navigation.goBack --->", route);
  };

  const onClickUpdate = () => {
    // making empty no media or previous list so alert will not come again
    dispatch(getdMediaListByAlbumSuccess([]));

    if (arrayImages.length > 0) {
      // We are uploading all data which we select from gallery to Azure
      var isNewElementAdded = false;
      callAPItoUploadImage(imageUpload);
      arrayImages.forEach((element, index) => {
        let dateValue = arrayAllDates[index];

        let arrayImgOfDate = element[dateValue];
        // console.log("arrayImgOfDate =>", arrayImgOfDate);
        // arrayImgOfDate.forEach((element1,index) => {
        //   if (element1.status === AppConstants.constant.NEW_ADDED) {
        //     isNewElementAdded = true;
        //   }
        // });
      });
      // if (!isNewElementAdded) {
      //   console.log("isNewElementAdded  ==============>");

      //   moveBack();
      // }
    } else {
      notifyMessage(AppConstants.constant.ALBUM_IMAGE_VALIDATION);
      return;
    }
  };

  const renderFooter = () => {
    return (
      <Pressable style={styles.footerAddAlbum} onPress={selectImage}>
        <Image
          resizeMode="contain"
          style={stylesHome.addView}
          source={require("../../assets/icons/plus.png")}
        />
        <Text style={stylesAlbum.textSelectPhoto}>
          {"Select Photos/Videos"}
        </Text>
      </Pressable>
    );
  };

  const renderDates = ({ item, index }) => {
    let arrayData = [];
    if (arrayImages.length > index) {
      arrayData = arrayImages[index][item];
    }
    var oneDate = moment(item).format("MMMM DD, YYYY");

    return (
      <View key={index}>
        <Text style={styles.textDate}>{oneDate}</Text>
        {renderList(arrayData)}
      </View>
    );
  };
 

  const renderList = (arrayData) => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {arrayData &&
          arrayData.map((item, index) => {
            let containerName = "";
            if (route.params.albumdetail.isSharedAlbum) {
              containerName = route.params.albumdetail.container;
            } else {
              containerName =
                user && user.user_detail ? user.user_detail.container_name : "";
            }
            let imageUrl =
              AZURE_BASE_URL + containerName + "/" + item.file_name;
            return (
              <View key={item.user_media_id}>
                <MediaCard
                  isSelectAll={isSelectAll}
                  setIsSelectAll={setIsSelectAll}
                  setIsCheck={setIsCheck}
                  isCheck={isCheck}
                  isLongPress={isaccess === 0 ? null : isLongPress}
                  setIsLongPress={setIsLongPress}
                  item={item}
                  itemZoom={item}
                  setItemZoom={setItemZoom}
                  imageUrl={imageUrl}
                  index={index}
                  setIsImageFullScreen={setIsImageFullScreen}
                  setUrlZoom={setUrlZoom}
                  setIsVideoFullScreen={setIsVideoFullScreen}
                  setArrayCheckMarks={setArrayCheckMarks}
                  arrayCheckMarks={arrayCheckMarks}
                  isImageFullScreen={isImageFullScreen}
                  isVideoFullScreen={isVideoFullScreen}
                  // totalData={arrayLength}
                />
              </View>
            );
          })}
      </View>
    );
  };

  const handleLoadMore = (dataToSet) => {
    if (
      data.HomeReducer &&
      data.HomeReducer.data &&
      data.HomeReducer.data.responseCode &&
      data.HomeReducer.data.responseCode === AppConstants.constant.SUCCESS
    ) {
      if (
        data.HomeReducer.data.data.totalPages >= currentPage &&
        arrayImages.length < data.HomeReducer.data.data.totalMediaCount
      ) {
        callgetmedialistbyalbumApi(
          route.params.albumdetail.album_id,
          dataToSet
        );
      }
    }
  };

  const alertLogout = () => {
    Alert.alert(
      AppConstants.constant.ONLINE_FAMILY_VAULT,
      data.HomeReducer.data.message,
      [{ text: "Ok", onPress: () => moveToLoginScreen() }]
    );
    setFormError(data.AuthReducer.data.message);
  };

  const moveToLoginScreen = () => {
    // Making array and user empty in logout
    removeCurrentUser(); // Remove current logged in user from asyn storage
    dispatch(
      logOutUser({
        sessid: user.sessid ? user.sessid : "",
      })
    );
    setUserData(null);
  };

  const setData = () => {
    if (
      data.HomeReducer.albumDetailData.responseCode ===
      AppConstants.constant.SUCCESS
    ) {
      if (isApiCall) {
        setIsApiCall(false);
        setisRefreshing(false);

        if (
          data.HomeReducer.albumDetailData.errorCode ===
          AppConstants.constant.NO_MEDIA
        ) {
          var dict = data.HomeReducer.albumDetailData;
          dict.errorCode = "";

          return;
        }
        // Checking with length 0 to prevent re-rendering

        setIsApiCall(false);
        setisRefreshing(false);
        let dictCompleteData = data.HomeReducer.albumDetailData.data.data;

        let arrayDate = [];
        arrayDate = Object.keys(dictCompleteData);

        let arrayFinal = [];

        for (let index = 0; index < arrayDate.length; index++) {
          const element = arrayDate[index];
          let arrayImageData = dictCompleteData[element];
          arrayFinal.push({ [element]: arrayImageData });
        }

        if (arrayAllDates.length > 0) {
          setArrayAllDates(arrayAllDates.concat(arrayDate));
        } else {
          setArrayAllDates(arrayDate);
        }

        if (arrayImages.length > 0) {
          //paging case need to append data in existing array
          setArrayImages(arrayImages.concat(arrayFinal));
        } else {
          // Initially when array length 0 add objects
          setArrayImages(arrayFinal);
        }
      } else {
      }
    }
  };

  const checkResponseCodeDetail = () => {
    if (
      data.HomeReducer.deleteUserMediaAlbumDetail &&
      data.HomeReducer.deleteUserMediaAlbumDetail.errorCode
    ) {
      if (
        data.HomeReducer.deleteUserMediaAlbumDetail.errorCode ===
        AppConstants.constant.DELETE_SUCCESS
      ) {
        dispatch(deleteUserMediaAlbumDetailSuccess({})); // For making empty delete user media
      } else if (
        data.HomeReducer.deleteUserMediaAlbumDetail.errorCode ===
        AppConstants.constant.DELETE_FAIL
      ) {
        dispatch(deleteUserMediaAlbumDetailFail({})); // For making empty delete album media
        notifyMessage(data.HomeReducer.deleteUserMediaAlbumDetail.message);
      }
    }
    if (
      data.HomeReducer.uploadMedia &&
      data.HomeReducer.uploadMedia.errorCode &&
      data.HomeReducer.uploadMedia.errorCode ===
        AppConstants.constant.INSERT_SUCCESS
    ) {
      var title = data.HomeReducer.uploadMedia.message;

      let dict = data.HomeReducer.uploadMedia;
      // Make empty after showing alert
      dict.responseCode = "";
      dict.errorCode = "";
      data.HomeReducer.uploadmedia = dict;
      moveBack();
      return;
    }

    if (
      data.HomeReducer &&
      data.HomeReducer.albumDetailData &&
      data.HomeReducer.albumDetailData.errorCode
    ) {
      if (
        data.HomeReducer.albumDetailData.errorCode ===
        AppConstants.constant.NOT_AUTHORIZED
      ) {
        alertLogout();
      } else {
        setData();
      }
    }

    if (
      data.HomeReducer &&
      data.HomeReducer.updateAlbumUploadImg &&
      data.HomeReducer.updateAlbumUploadImg.errorCode
    ) {
      if (
        data.HomeReducer.updateAlbumUploadImg.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        setLoading(false);
        setIsApiCall(false);
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.ADD_NEW_ALBUM}
            errorCode={data.HomeReducer.updateAlbumUploadImg.errorCode}
            navigation={props.navigation}
          />
        );
      }

      if (
        data.HomeReducer.updateAlbumUploadImg &&
        data.HomeReducer.updateAlbumUploadImg.errorCode ===
          AppConstants.constant.NOT_AUTHORIZED
      ) {
        setLoading(false);
        setIsApiCall(false);
        alertWithMessage(true, data.HomeReducer.updateAlbumUploadImg.message);
      } else {
        if (
          data.HomeReducer.updateAlbumUploadImg &&
          data.HomeReducer.updateAlbumUploadImg.responseCode &&
          data.HomeReducer.updateAlbumUploadImg.responseCode ===
            AppConstants.constant.SUCCESS &&
          data.HomeReducer.updateAlbumUploadImg.errorCode ===
            AppConstants.constant.INSERT_SUCCESS
        ) {
          setLoading(false);
          setIsApiCall(false);
          // To stop redundant execution
          var alertMessage = data.HomeReducer.updateAlbumUploadImg.message;
          // alert(`After saving -== ${alertMessage}`);
          let dict = data.HomeReducer.updateAlbumUploadImg;
          // Make empty after showing alert
          dict.responseCode = "";
          dict.errorCode = "";
          data.HomeReducer.updateAlbumUploadImg = dict;
          moveBack();
        } else {
        }
        // props.navigation.goBack();
      }
    }
    if (
      data.HomeReducer &&
      data.HomeReducer.uploadMedia &&
      data.HomeReducer.uploadMedia.errorCode
    ) {
      if (
        data.HomeReducer.uploadMedia.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        setLoading(false);
        setIsApiCall(false);
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.ADD_NEW_ALBUM}
            errorCode={data.HomeReducer.uploadMedia.errorCode}
            navigation={props.navigation}
          />
        );
      }

      if (
        data.HomeReducer.uploadMedia &&
        data.HomeReducer.uploadMedia.errorCode ===
          AppConstants.constant.NOT_AUTHORIZED
      ) {
        setLoading(false);
        setIsApiCall(false);
        alertWithMessage(true, data.HomeReducer.uploadMedia.message);
      } else {
        if (
          data.HomeReducer.uploadMedia &&
          data.HomeReducer.uploadMedia.responseCode &&
          data.HomeReducer.uploadMedia.responseCode ===
            AppConstants.constant.SUCCESS &&
          data.HomeReducer.uploadMedia.errorCode ===
            AppConstants.constant.INSERT_SUCCESS
        ) {
          setLoading(false);
          setIsApiCall(false);
          // To stop redundant execution
          var alertMessage = data.HomeReducer.uploadMedia.message;
          // alert(`After saving -== ${alertMessage}`);
          let dict = data.HomeReducer.uploadMedia;
          // Make empty after showing alert
          dict.responseCode = "";
          dict.errorCode = "";
          data.HomeReducer.uploadmedia = dict;
          // dispatch(uploadMediaSuccess([]));
          moveBack();
        } else {
        }
      }
    }
  };
  const removeEditMode = () => {
    setIsLongPress(false);
    arrayCheckMarks.length = 0;
    setArrayCheckMarks([]);
    setIsCheck(false);
  };
  const callToDeleteLocalItems = (arrayDeleteItems) => {
    setArrayCheckMarks([]);
    arrayCheckMarks.length = 0;
    // Now delete these items locally from imagearra
    let newArrayImages = cloneDeep(arrayImages);

    for (let index = 0; index < arrayAllDates.length; index++) {
      const elementDate = arrayAllDates[index];

      let arrayImageOfDate = arrayImages[index][elementDate];

      const updatedItem = arrayImageOfDate.filter(
        (item) => !arrayDeleteItems.includes(item.file_name)
      );

      newArrayImages[index][elementDate] = updatedItem;
    }
    setArrayImages(newArrayImages);

    removeEditMode();
  };

  const onClickDelete = () => {
    var arrayDeleteItems = [];
    var isUserOwnAlbum = false;
    var newAddedElementDeleteCount = 0; // Recently element selected from picker and want to delete that one(It is not on azure server just showing it in the list currently)

    for (let index = 0; index < arrayCheckMarks.length; index++) {
      const element = arrayCheckMarks[index];

      if (element.isCheck) {
        // Checking this item added by owner, if yes then only he can delete the item.
        if (element.owner_id) {
          if (element.owner_id === user.user_detail.user_id) {
            arrayDeleteItems.push(element.file_name);
            if (element.status === AppConstants.constant.NEW_ADDED) {
              newAddedElementDeleteCount = newAddedElementDeleteCount + 1;
            }
            isUserOwnAlbum = true; // Each album item has same owner id so if it match with current user id it means it is the user's own album
          }
        }
      }
    }

    var alertTitle = "";
    if (!isUserOwnAlbum) {
      Alert.alert(
        globals.appName,
        AppConstants.constant.YOU_CAN_DELETE_ONLY_OWN_ALBUMS
      );
      arrayDeleteItems = [];
    } else {
      {
        if (arrayDeleteItems.length === 0) {
          notifyMessage(AppConstants.constant.PLEASE_SELECT_ATLEAST_ONE_ITEM);
          return;
        } else {
          if (arrayDeleteItems.length > 1) {
            alertTitle =
              AppConstants.constant
                .DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_MEDIA;
          } else {
            alertTitle =
              AppConstants.constant.DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA;
          }
        }
      }
      Alert.alert(AppConstants.constant.ALERT, alertTitle, [
        {
          text: AppConstants.constant.YES,
          onPress: () => {
            let countDelete =
              countPickerSelectedImage - newAddedElementDeleteCount;
            setCountPickerSelectedImage(countDelete); // using this counter to know once all images are added on azure then call server api to upload them.
            callApiToDelete(arrayDeleteItems);
          },
        },
        {
          text: AppConstants.constant.NO,
          onPress: () => console.log(""),
        },
      ]);
    }
  };
  // serach album name from search bar
  const onChangeText = (textSearch) => {
    setSearchAlbumName(textSearch);
  };

  // press on search button check validation and search album by name
  const onClickCalendar = () => {
    setIsCalendarShow(!isCalendarShow);
    setSelectedDate("");
    let dataToSet = 1;
    setCurrentPage(dataToSet);
    resetAlbumArray();
    callgetmedialistbyalbumApi(route.params.albumdetail.album_id, dataToSet);
    // filterAlbumBasedOnName(selectedDate);
  };

  const resetAlbumArray = () => {
    setArrayImages([]);
    arrayImages.length = 0;
    setArrayAllDates([]);
    arrayAllDates.length = 0;
  };

  const onClickCalendarDate = async (selectedDay) => {
    let dateString = selectedDay.dateString;
    setIsCalendarShow(false);
    setSelectedDate(dateString);
    //setIsClickForSearch(true);
    let dataToSet = 1;
    setCurrentPage(dataToSet);
    resetAlbumArray();
    callgetmedialistbyalbumApi(
      route.params.albumdetail.album_id,
      dataToSet,
      dateString
    );
  };

  const setApiCallBasedOnSelectedDate = (dateString) => {};

  const distinctDateArray = (arrayInput) => {
    const arrayOutput = [...new Set(arrayInput)];
    return arrayOutput;
  };

  const renderHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Search
            onClickCalendar={onClickCalendar}
            // onClickSearch={onClickSearch}
            isCalendar={false}
            searchTxt={selectedDate}
            viewName={"AlbumDetailScreen"}
          />
        </View>
        <>
          {isCalendarShow ? (
            <View style={{ padding: "2%", height: "40%" }}>
              <CalendarView
                // markedDates={markedDates}
                onDayPress={onClickCalendarDate}
              />
            </View>
          ) : null}
        </>
      </View>
    );
  };

  return (
    <>
      {checkResponseCodeDetail()}
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <View style={{ flex: 1, backgroundColor: "#f0f4f9" }}>
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            setIsLongPress(false);
            setIsCalendarShow(false);
            setSelectedDate("");
            Keyboard.dismiss();
            setIsImageFullScreen(false);
            setIsVideoFullScreen(false);
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          rightBackIcon={require("../../assets/images/Back.png")}
          rightBackIconClick={() => {
            setSearchAlbumName("");
            setIsCalendarShow(false);
            setSelectedDate("");
            setIsLongPress(false), props.navigation.goBack();
          }}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => {
            setSearchAlbumName("");
            setIsImageFullScreen(false);
            setIsVideoFullScreen(false);
            props.navigation.navigate("Notifications");
          }}
        />

        {isImageFullScreen || isVideoFullScreen ? (
          <ZoomView
            itemZoom={itemZoom}
            isaccessible={isaccess} // if isaccess= 0 menas readOnly else full access
            setArrayCheckMarks={setArrayCheckMarks}
            arrayCheckMarks={arrayCheckMarks}
            callApiToDelete={callApiToDelete}
            url={urlZoom}
            isVideo={isVideoFullScreen}
            closeZoomView={() =>
              isImageFullScreen
                ? setIsImageFullScreen(false)
                : setIsVideoFullScreen(false)
            }
            user_id={user.user_detail.user_id}
          />
        ) : (
          <>
            <View
              style={{
                margin: "5%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TitleView title={"Album Details" + " " + istitle} />
              {isLongPress ? (
                isaccess === 0 ? null : (
                  <IconMaterialCommunity
                    onPress={() => onClickDelete()}
                    name="delete-circle"
                    size={35}
                    color={AppColor.colors.RED}
                    style={styles.iconDelete}
                  />
                )
              ) : null}
            </View>

            <View style={{ flex: 1 }}>
              <>
                <FlatList
                  // ref={flatListRef}

                  data={distinctDateArray(arrayAllDates)}
                  onEndReached={({ distanceFromEnd }) => {
                    let dataToSet = currentPage + 1;
                    setCurrentPage(dataToSet);
                    handleLoadMore(dataToSet);
                  }}
                  ListHeaderComponent={renderHeader()}
                  onEndReachedThreshold={0.01}
                  renderItem={renderDates}
                  //  ListFooterComponent={isaccess == 1 ? renderFooter : null}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                  }}
                  //horizontal={true}
                  extraData={arrayImages}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
              {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
              {isaccess === 1 ? (
                <View style={styles.buttonSave}>
                  <Pressable
                    style={[styles.footerAddAlbum, { marginBottom: "5%" }]}
                    onPress={selectImage}
                  >
                    <Image
                      resizeMode="contain"
                      style={stylesHome.addView}
                      source={require("../../assets/icons/plus.png")}
                    />
                    <Text style={stylesAlbum.textSelectPhoto}>
                      {"Select Photos/Videos"}
                    </Text>
                  </Pressable>

                  <Button color={AppColor.colors.RED} onPress={onClickUpdate}>
                    Update
                  </Button>
                </View>
              ) : null}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default AlbumDetailScreen;
