import React, { useEffect, useState, useRef, useCallback } from "react";
import { Keyboard } from "react-native";
import { AZURE_BASE_URL } from "../../Redux-api/endPoints";
import { launchImageLibrary } from "react-native-image-picker";
import Spinner from "../../Component/auth/Spinner";
import AppConstants from "../../Theme/AppConstant";
import AuthContext from "../../context/AuthContext";
import {
  azureblobfetch,
  initAzureBlob,
} from "react-native-azure-blob-storage-manager/azurblobstorage";
import Upload from "react-native-background-upload";
import {
  uploadMedia,
  checkAlbumName,
  uploadImg,
} from "../../Redux-api/actions/Home";
import * as globals from "../../Utils/globals";
import ZoomView from "../../Component/ZoomView";
import {
  CurrentDate,
  decryptKey,
  checkStringContainsSpecialChar,
} from "../../common";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-crop-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SubscriptionError from "../../Component/SubscriptionError";

import {
  Pressable,
  Alert,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
  Platform,
  ToastAndroid,
  BackHandler,
} from "react-native";
import styles from "./style";
import stylesHome from "../HomeScreen/style";
import stylesRegister from "../Register/style";
import stylesAlbum from "../Album/style";

import TextInputView from "../../Component/TextInputView";

import { Header } from "../../Component/Header";
import TitleView from "../../Component/TitleView";
import Search from "../../Component/Search";
import { Avatar, Headline, Text, useTheme } from "react-native-paper";
import Button from "../../Component/auth/Button";
import { useSelector, useDispatch } from "react-redux";
import VideoCard from "../../Component/VideoCard";
import { useRoute, useNavigation } from "@react-navigation/core";
import { removeCurrentUser } from "../../database/localDB";
import { MediaCard } from "../../Component/MediaCard";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import { notifyMessage } from "../../Component/AlertView";
import { AppColor } from "../../Theme";

const AddNewAlbum = (props) => {
  const { user } = React.useContext(AuthContext);
  // var arrayLibraryLocalData = []; // Local data which need to be save on server
  var countImgUploadAzure = 0; // Image uploaded or failed increase count so that call server api after azure operations.
  var countImgFailedToUpload = 0; // Only count failed images so that we can show fail images counting to user.
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const route = useRoute();
  const { setUserData } = React.useContext(AuthContext); // for updating user data of authcontext

  const [arrayLibraryLocalData, setArrayLibraryLocalData] = useState([]);
  const [title, setTitle] = React.useState("");
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [arrayLibrary, setArrayLibrary] = React.useState([]);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [countFailState, setCountFailState] = useState(0);
  const flatListRef = useRef();
  const [isLongPress, setIsLongPress] = React.useState(false); // Media Card LongPress
  const [isCheck, setIsCheck] = React.useState(false);
  const [isSelectAll, setIsSelectAll] = React.useState(false);
  const [arrayCheckMarks, setArrayCheckMarks] = React.useState([]);
  const [itemZoom, setItemZoom] = useState({}); // Passing complete item to Zoom view
  const [isImageFullScreen, setIsImageFullScreen] = useState(false); //On click make video on fullscreen.
  const [urlZoom, setUrlZoom] = useState(""); // Url of the object which will zoom on the tap
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false); //On click make video on fullscreen.
  const [titleError, setTitleError] = React.useState("");
  const [emptyMediaError, setEmptyMediaError] = React.useState("");
  const [imageUpload, setImageUpload] = React.useState([]);
  const inputAlbumNameRef = useRef(null);

  var countBack = 0;
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    if (route.params.uploadMediadatas) {
      setArrayLibrary(route.params.uploadMediadatas);
    }
    if (user && user.conf_key) {
      let azureKey = decryptKey(user.conf_key);
      initAzureBlob({
        storageKey: azureKey, //'Cyf89/I5iOMAt3R296QBjoxWOggSZhmHyqi7FZg7IlQ=',
        account: AppConstants.constant.CONTAINER_ACCOUNT,
        version: "2020-04-08",
      });
    } else {
      removeCurrentUser();
      Alert.alert("Alert", AppConstants.constant.PLEASE_LOGIN, [
        {
          text: "Ok",
          onPress: () => moveToLoginScreen(),
        },
      ]);
    }

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [props.navigation, route.params]);

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;
    // if (!isImageFullScreen || !isVideoFullScreen)

    setIsImageFullScreen(false);
    setIsVideoFullScreen(false);

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
      props.navigation.goBack();
    }
    return true;
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

  // get unquie timestemp
  const getTimeStemp = (title) => {
    var date = moment().utcOffset("+05:30").format("MMDDYYhhmms");
    var splitStr = title.toLowerCase();
    var replacedStr = splitStr.split(" ").join("_");
    var finalTitle = replacedStr + "_" + date;
    return finalTitle;
  };

  const removeEditMode = () => {
    setIsLongPress(false);
    arrayCheckMarks.length = 0;
    setArrayCheckMarks([]);
    setIsCheck(false);
  };

  const uploadAzure = async (assest) => {
    let getfinalTitle = getTimeStemp(title);
    console.log("uploadAzure assets uri ", assest);

    // alert(` upload azure imgpicker object ---> ${JSON.stringify(assest)}`);

    let assetObject = {
      filename: assest.file_name,
      fileSize: assest.size,
      height: assest.height ? assest.height : 200,
      type: assest.file_type,
      uri: assest.sourceURL ? assest.sourceURL : assest.uri,
    };

    console.log(" Assest object 207 ", assetObject);

    //  alert(`uploadAzure asset objectpassing to library- ${JSON.stringify(assetObject)}`);

    const res = await azureblobfetch({
      assest: assetObject,
      container: user.user_detail.container_name
        ? user.user_detail.container_name
        : "", //your countainer name,
      // filenameprefix: title + "/", //add before the autogenrated file name,
      filenameprefix: getfinalTitle + "/", //add before the autogenrated file name,

      type: "Upload",
    });
    setLoading(true);
    Upload.addListener("progress", res.uploadId, (data) => {
      console.log("218  progress === ", data);
      // alert(`uploading progress ${JSON.stringify(data)}`)
    });
    Upload.addListener("cancelled", res.uploadId, (data) => {
      // alert(`uploading cancelled ${JSON.stringify(data)}`)

      countImgUploadAzure = countImgUploadAzure + 1;
    });
    Upload.addListener("completed", res.uploadId, (data) => {
      console.warn("i am in Upload completed in Add New Album =>", data);

      // alert(`uploading completed ${JSON.stringify(data)}`)

      countImgUploadAzure = countImgUploadAzure + 1;
      // console.log("225 completed ===>","dictImageToSend",countImgUploadAzure, data);

      // In api we don't need to pass uri in the image object.
      let created_date = CurrentDate();
      let dictImageToSend = {
        file_name: res.filename,
        file_type: assest.file_type.includes("image")
          ? "image"
          : assest.file_type.includes("video")
          ? "video"
          : assest.file_type,
        is_success: true,
        size: assest.size,
        created_date: created_date,
        album_id: 0,
      };

      console.log(
        "242 completed === ",
        "dictImageToSend",
        countImgUploadAzure,
        dictImageToSend
      );

      arrayLibraryLocalData.push(dictImageToSend);

      // all picker selected images are uploaded on azure so we are calling server api to upload all uploaded images on server.
      if (countImgUploadAzure === arrayLibrary.length) {
        let param = {
          sessid: user.sessid ? user.sessid : "",
          name: title,
          code_name: getfinalTitle,
          data: arrayLibraryLocalData,
        };

        console.log(
          "completed === ",
          "countImgUploadAzure",
          countImgUploadAzure,
          data
        );

        setIsApiCall(true);
        dispatch(uploadMedia(param));
      }

      //setLoading(false);
    });
    Upload.addListener("error", res.uploadId, (err) => {
      countImgUploadAzure = countImgUploadAzure + 1;
      countImgFailedToUpload = countImgFailedToUpload + 1;
      setCountFailState(countImgFailedToUpload);

      if (countImgFailedToUpload === arrayLibrary.length) {
        setIsApiCall(false);
        setLoading(false);
        Alert.alert("Alert", AppConstants.constant.WE_CANT_CREATE_ALBUM, [
          {
            text: "Ok",
            onPress: () => moveBack(),
          },
        ]);
      }
    });
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

  const checkSizeBeforeupdate = () => {
    {
      // your own space is >= to yout total space
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
        forceJpg: true, // For ios only will remove in android
      })
        .then((response) => {
          if (
            response &&
            response.length > AppConstants.constant.MAX_SELECTION_QTY
          ) {
            notifyMessage(AppConstants.constant.YOU_CAN_SELECT_MAX_FIVE_MEDIA);
            checkSizeBeforeupdate();
            return;
          }

          var tempMediaspce = 0;
          var temData = [];
          var uploadMediaVar = true;

          // Upload Staging api and integration
          const tempIMG = [];
          response.map((data1) => {
            const source = {
              uri: Platform.OS === "android" ? data1.path : data1.path,
              name: data1.filename ? data1.filename : "front.jpg",
              size: data1.size,
              type: data1.mime,
            };
            tempIMG.push(source);
            let dictImageToShow = {};
            let fileNameTemp = "";
            if (Platform.OS === "ios") {
              fileNameTemp = data1.filename;
            } else {
              fileNameTemp = generateRandomFileName(); // Since picker is not providing name in android so we generate it
            }
            dictImageToShow = {
              file_name: fileNameTemp,
              file_type: data1.mime.includes("image") ? "image" : data1.mime,
              is_success: true,
              size: data1.size,
              album_id: 0,
              sourceURL:
                Platform.OS === "android" ? data1.path : data1.sourceURL,
              uri: data1.path,
              user_media_id: Math.random(), // We are distincting array elements based on user_media id so we generate it unique
              pathString: Platform.OS === "android" ? data1.path : "",
            };
            tempMediaspce = tempMediaspce + data1.size;
            let userOwnSpace = {};
            // adding selected image size in the already used space of the user and find out actual used space \\

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
              userOwnSpace.own_space.own_space_used_total_bytes + tempMediaspce;
            if (
              currentTotalUsedBytes <
              userOwnSpace.own_space.own_space_total_bytes
            ) {
              uploadMediaVar = true;
              temData.push(dictImageToShow);
            } else {
              uploadMediaVar = false;
            }
          });
          // Upload Staging api and integration
          // gotoUploadImage(tempIMG)
          setImageUpload(tempIMG);
          if (uploadMediaVar === true) {
            setEmptyMediaError("");
            if (arrayLibrary.length > 0) {
              let newArray = arrayLibrary.concat(temData);
              setArrayLibrary(distinctLibraryArray(newArray));
            } else {
              setArrayLibrary(temData);
            }
          } else {
            showUpgradeAlert();
          }
        })
        .catch((e) => {});
    }
  };

  // Upload Staging api and integration
  const callAPItoUploadImage = (data) => {
    const params = new FormData();
    let getfinalTitle = getTimeStemp(title);
    params.append("sessid", user.sessid);
    params.append("name", title);
    params.append("code_name", getfinalTitle);

 
    data.map((data1, index) => {
      console.log(" data1 ", data1); 
      const source = {
        uri: data1.uri,
        name: data1.file_name,
        size: data1.size,
        type: data1.file_type
      };
      params.append("album_media[" + index + "]", source);
    });

    console.log("i am in api param==>", params);
    dispatch(uploadImg(params));
  };

  // Initialy check
  const checkUserAvailableSpace = () => {
    let userOwnSpace = {};
    if (
      data.HomeReducer &&
      data.HomeReducer.userSpace &&
      data.HomeReducer.userSpace.own_space
    ) {
      userOwnSpace = data.HomeReducer.userSpace.own_space;
      if (
        userOwnSpace.own_space_total_bytes &&
        userOwnSpace.own_space_total_bytes >=
          userOwnSpace.own_space_used_total_bytes
      ) {
        return true;
      } else {
        showUpgradeAlert();
        return false;
      }
    } else {
      if (
        data.HomeReducer &&
        data.HomeReducer.library &&
        (data.HomeReducer.library.errorCode ===
          AppConstants.constant.SUBSCRIPTION_EXPIRED ||
          data.HomeReducer.library.errorCode ===
            AppConstants.constant.SUBSCRIPTION_INVALID)
      ) {
        showUpgradeAlert();
        return false;
      } else {
        if (
          data.HomeReducer &&
          data.HomeReducer.library &&
          data.HomeReducer.library.data &&
          data.HomeReducer.library.data.userSpace &&
          data.HomeReducer.library.data.userSpace.own_space
        ) {
          userOwnSpace = data.HomeReducer.library.data.userSpace.own_space;
          if (
            userOwnSpace.own_space_total_bytes &&
            userOwnSpace.own_space_total_bytes >=
              userOwnSpace.own_space_used_total_bytes
          ) {
            return true;
          } else {
            showUpgradeAlert();
            return false;
          }
        }
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

  const renderFooter = () => {
    return (
      <Pressable style={styles.footerAddAlbum} onPress={selectImage}>
        <Image
          resizeMode="contain"
          style={styles.addAlbumView}
          source={require("../../assets/icons/plus.png")}
        />
        <Text style={stylesAlbum.textSelectPhoto}>
          {"Select Photos/Videos"}
        </Text>
      </Pressable>
    );
  };

  const renderLibraryList = ({ item, index }) => {
    let containerName =
      user && user.user_detail ? user.user_detail.container_name : "";
    let imageUrl = AZURE_BASE_URL + containerName + "/" + item.file_name;

    return (
      <MediaCard
        isSelectAll={isSelectAll}
        setIsSelectAll={setIsSelectAll}
        setIsCheck={setIsCheck}
        isCheck={isCheck}
        isLongPress={isLongPress}
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
      />
    );
  };

  const distinctLibraryArray = (data) => {
    if (Platform.OS === "android") {
      const distinctArray = [
        ...new Map(data.map((x) => [x["pathString"], x])).values(),
      ];
      return distinctArray;
    } else {
      // const distinctArray = [
      //   ...new Map(data.map((x) => [x["fileName"], x])).values(),
      // ];
      // return distinctArray;

      const distinctArray = [
        ...new Map(data.map((x) => [x["file_name"], x])).values(),
      ];
      return distinctArray;
    }
  };

  const callbackFunction = (childData) => {};

  const moveBack = () => {
    //route.params.onReturn("Chandni ");
    //props.navigation.navigate('Home');
    // return;

    setTitle("");
    if (route.params.itisfrom == "Album") {
      props.navigation.goBack();
      setArrayLibrary([]);
      setArrayLibraryLocalData([]);
      return;
    }
    {
      if (route.params.itisfrom == "camera") {
        //props.navigation.goBack();
        props.navigation.navigate("HomeStack", { from: "addNewAlbum" });
      } else {
        props.navigation.navigate("Home", { from: "addNewAlbum" });
      }
    }
  };

  const alertWithMessage = (isLogout, message) => {
    var alertTitle = message;

    if (isLogout) {
      alertTitle = message;
    } else {
      if (countFailState > 1) {
        alertTitle =
          message +
          " " +
          AppConstants.constant.AZURE_CANT_UPLOAD_MULTIPLE_IMAGES;
      } else if (countFailState === 1) {
        alertTitle =
          message + " " + AppConstants.constant.AZURE_CANT_UPLOAD_SINGLE_IMAGE;
      }
    }

    Alert.alert(globals.appName, alertTitle, [
      {
        text: "Ok",
        onPress: () => (isLogout ? moveToLoginScreen() : moveBack()),
      },
    ]);
  };

  const checkResponseCode = () => {
    if (isApiCall) {
      if (
        data.HomeReducer &&
        data.HomeReducer.checkAlbumNameData &&
        data.HomeReducer.checkAlbumNameData.errorCode
      ) {
        setLoading(false);
        setIsApiCall(false);

        if (
          data.HomeReducer.checkAlbumNameData.errorCode ===
          AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
        ) {
          setLoading(false);
          setIsApiCall(false);
          return (
            <SubscriptionError
              comeFrom={AppConstants.constant.ADD_NEW_ALBUM}
              errorCode={data.HomeReducer.checkAlbumNameData.errorCode}
              navigation={props.navigation}
            />
          );
        }
        if (
          data.HomeReducer.checkAlbumNameData &&
          data.HomeReducer.checkAlbumNameData.errorCode ===
            AppConstants.constant.NOT_AUTHORIZED
        ) {
          setLoading(false);
          setIsApiCall(false);
          alertWithMessage(true, data.HomeReducer.checkAlbumNameData.message);
          return;
        } else {
          if (
            data.HomeReducer.checkAlbumNameData &&
            data.HomeReducer.checkAlbumNameData.errorCode ===
              AppConstants.constant.ALBUM_NOT_EXIST
          ) {
            setLoading(false);
            setIsApiCall(false);
            data.HomeReducer.checkAlbumNameData.errorCode = "";
            successApi();
            saveAlbumData();
          } else {
            Alert.alert(
              AppConstants.constant.ALERT,
              data.HomeReducer.checkAlbumNameData.message,
              [
                {
                  text: AppConstants.constant.CHANGE_NAME,
                  onPress: () => {
                    data.HomeReducer.checkAlbumNameData.errorCode = "";
                    inputAlbumNameRef.current.focus();
                    successApi();
                  },
                },
                {
                  text: AppConstants.constant.ADD_TO_EXISTING,
                  onPress: () => {
                    data.HomeReducer.checkAlbumNameData.errorCode = "";
                    successApi();
                    saveAlbumData();
                  },
                },
              ]
            );
          }
        }
      }
      
      if (
        data.HomeReducer &&
        data.HomeReducer.uploadImages &&
        data.HomeReducer.uploadImages.errorCode
      ) {
        if (
          data.HomeReducer.uploadImages.errorCode ===
          AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
        ) {
          setLoading(false);
          setIsApiCall(false);
          return (
            <SubscriptionError
              comeFrom={AppConstants.constant.ADD_NEW_ALBUM}
              errorCode={data.HomeReducer.uploadImages.errorCode}
              navigation={props.navigation}
            />
          );
        }

        if (
          data.HomeReducer.uploadImages &&
          data.HomeReducer.uploadImages.errorCode ===
            AppConstants.constant.NOT_AUTHORIZED
        ) {
          setLoading(false);
          setIsApiCall(false);
          alertWithMessage(true, data.HomeReducer.uploadImages.message);
        } else {
          if (
            data.HomeReducer.uploadImages &&
            data.HomeReducer.uploadImages.responseCode &&
            data.HomeReducer.uploadImages.responseCode ===
              AppConstants.constant.SUCCESS &&
            data.HomeReducer.uploadImages.errorCode ===
              AppConstants.constant.INSERT_SUCCESS
          ) {
            setLoading(false);
            setIsApiCall(false);
            // To stop redundant execution
            var alertMessage = data.HomeReducer.uploadImages.message;
            // alert(`After saving -== ${alertMessage}`);
            let dict = data.HomeReducer.uploadImages;
            // Make empty after showing alert
            dict.responseCode = "";
            dict.errorCode = "";
            data.HomeReducer.uploadImages = dict;
            // dispatch(uploadImagesSuccess([]));
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
          // props.navigation.goBack();
        }
      }
    }
  };

  const successApi = () => {
    let dict = data.HomeReducer;
    dict.checkAlbumNameData = {};
    data.HomeReducer = dict;
  };

  const saveAlbumData = () => {
    if (arrayLibrary.length > 0) {
      //** */ We are uploading all data which we select from gallery to Azure **/
      setIsApiCall(true);
      //callAPItoUploadImage(imageUpload)
      console.log("saveAlbumData ", arrayLibrary);
      callAPItoUploadImage(arrayLibrary);
    } else {
      //** create the empty album  */
      // dispatch(uploadMedia(param));
      //
    }
  };
  const onClickSave = () => {
    let flagError = false;
    if (title.length !== 0) {
      if (checkStringContainsSpecialChar(title)) {
        flagError = true;
        setTitleError(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
      }
    } else {
      flagError = true;
      setTitleError(AppConstants.constant.ALBUM_NAME_EMPTY_VALIDATION);
    }

    // if (!arrayLibrary.length > 0) {
    //   flagError = true;
    //   setEmptyMediaError(AppConstants.constant.ALBUM_IMAGE_VALIDATION);
    // }

    if (!flagError) {
      setIsApiCall(true);
      let param1 = { name: title, sessid: user.sessid ? user.sessid : "" };
      dispatch(checkAlbumName(param1));
    }
  };
  const callApiToDelete = useCallback(
    (arrayDeleteItems) => {
      setArrayCheckMarks([]);
      arrayCheckMarks.length = 0;

      for (let index = 0; index < arrayDeleteItems.length; index++) {
        const file_name = arrayDeleteItems[index]; // Only contains file_name

        let deleteIndex = arrayLibrary.findIndex(
          (x) => x.file_name === file_name
        );

        if (deleteIndex > -1) {
          arrayLibrary.splice(deleteIndex, 1);
        }
      }
      if (arrayLibrary.length === 0) {
        // Explicitly setting empty because for the last object flatlist is not refreshing so set it empty.
        setArrayLibrary([]);
        setIsLongPress(false);
      } else {
        setArrayLibrary(arrayLibrary);
      }
      removeEditMode();
    },
    [arrayLibrary]
  );

  const onClickDelete = () => {
    var arrayDeleteItems = [];
    for (let index = 0; index < arrayCheckMarks.length; index++) {
      const element = arrayCheckMarks[index];

      if (element.isCheck) {
        arrayDeleteItems.push(element.file_name);
      }
    }
    var alertTitle = "";

    if (arrayDeleteItems.length == 0) {
      notifyMessage(AppConstants.constant.PLEASE_SELECT_ATLEAST_ONE_ITEM);
      return;
    } else {
      if (arrayDeleteItems.length > 1) {
        alertTitle =
          AppConstants.constant.DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_MEDIA;
      } else {
        alertTitle =
          AppConstants.constant.DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA;
      }
    }

    Alert.alert(AppConstants.constant.ALERT, alertTitle, [
      {
        text: AppConstants.constant.YES,
        onPress: () => callApiToDelete(arrayDeleteItems),
      },
      {
        text: AppConstants.constant.NO,
        onPress: () => console.log(""),
        // onPress: () => {
        //   (arrayCheckMarks.length = 0), setArrayCheckMarks([]);
        // },
      },
    ]);
  };

  return (
    <>
      {checkResponseCode()}
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />
      <Pressable
        style={{ flex: 0.95, backgroundColor: "#f0f4f9" }}
        onPress={() => Keyboard.dismiss()}
      >
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            Keyboard.dismiss();
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          rightBackIcon={require("../../assets/images/Back.png")}
          rightBackIconClick={() => {
            setTitleError("");
            setTitle("");
            setEmptyMediaError("");
            props.navigation.goBack();
          }}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => {
            removeEditMode();
            props.navigation.navigate("Notifications");
          }}
        />

        {isImageFullScreen || isVideoFullScreen ? (
          <ZoomView
            itemZoom={itemZoom}
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
          />
        ) : (
          <>
            <View style={styles.HeadingTitle}>
              <TitleView title="Create New Album" />
              {isLongPress ? (
                <IconMaterialCommunity
                  onPress={() => onClickDelete()}
                  name="delete-circle"
                  size={35}
                  color={AppColor.colors.RED}
                  style={styles.iconDelete}
                />
              ) : null}
            </View>
            <Text style={styles.detailText}>Enter a name for this album</Text>

            <View style={styles.textInputView}>
              <TextInput
                ref={inputAlbumNameRef}
                style={styles.textInput}
                placeholder="Enter Album Title Here"
                value={title}
                onChangeText={(e) => {
                  setTitle(e);
                  setTitleError("");
                }}
              />
            </View>
            {titleError ? (
              <Text
                style={[
                  stylesRegister.error,
                  { color: theme.colors.accent, paddingLeft: wp("7%") },
                ]}
              >
                {titleError}
              </Text>
            ) : null}

            <View style={styles.albumAddNew}>
              <Text style={styles.subTitle}>Add Photos to Album</Text>
              <Text style={styles.detailText2}>
                Select Photos or Videos from Library
              </Text>
            </View>
            {emptyMediaError ? (
              <Text
                style={[
                  stylesRegister.error,
                  { color: theme.colors.accent, paddingLeft: wp("7%") },
                ]}
              >
                {emptyMediaError}
              </Text>
            ) : null}

            {/* <View style={{ height: arrayLibrary.length > 0 ? arrayLibrary.length * (height * 0.15) : (height * 0.18) }}>  */}
            <FlatList
              ref={flatListRef}
              data={distinctLibraryArray(arrayLibrary)}
              // data={arrayLibrary}
              numColumns={2}
              extraData={arrayLibrary}
              renderItem={renderLibraryList}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
              keyExtractor={(item, index) => item.file_name}
            />
            {loading ? <Spinner /> : null}
            {/* </View> */}
            <View style={styles.buttonSave}>
              <Button color={AppColor.colors.RED} onPress={onClickSave}>
                Save
              </Button>
            </View>
          </>
        )}
      </Pressable>
    </>
  );
};

export default AddNewAlbum;
