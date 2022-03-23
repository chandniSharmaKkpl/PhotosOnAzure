import React, { useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AZURE_BASE_URL } from "../../Redux-api/endPoints";
import axios from "axios";
import {
  StatusBar,
  FlatList,
  View,
  Dimensions,
  Image,
  Pressable,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import BottomBar from "../../Component/BottomBar";
import styles from "./style";
import { Header } from "../../Component/Header";
import Search from "../../Component/Search";
import { Avatar, Headline, Text, useTheme } from "react-native-paper";
import Spinner from "../../Component/auth/Spinner";
import TabSwitch from "../../Component/auth/TabSwitch";
import ZoomView from "../../Component/ZoomView";
import AppConstants from "../../Theme/AppConstant";
import AuthContext from "../../context/AuthContext";
import {
  azureblobfetch,
  initAzureBlob,
} from "react-native-azure-blob-storage-manager/azurblobstorage";
import Upload from "react-native-background-upload";
import StorageQuota from "../../fragment/dashboard/StorageQuota";
import {
  uploadMedia,
  listAllMedia,
  listAllMediaSuccess,
  listsOwnAlbum,
  listsSharedAlbum,
  getUserSpace,
  deleteAlbum,
  deleteUserMediaSuccess,
  deleteUserMediaFail,
  deleteUserMedia,
  deleteAlbumSuccess,
  deleteAlbumFail,
  listOwnAlbumSuccess,
  listSharedAlbumSuccess,
  albumIdInDetailToGet,
  uploadImg,
} from "../../Redux-api/actions/Home";
import {
  CurrentDate,
  decryptKey,
  checkStringContainsSpecialChar,
} from "../../common";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-crop-picker";
import CalendarView from "../../Component/Calendar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AppColor, AppConstant } from "../../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
const { height, width } = Dimensions.get("screen");
import { removeCurrentUser } from "../../database/localDB";
import { MediaCard } from "../../Component/MediaCard";
import { AlbumCard } from "../../Component/AlbumCard";
import { IApContext } from "../../Component/InAppPurchase/IAPController";
import SubscriptionError from "../../Component/SubscriptionError";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from "@react-navigation/native";
import { notifyMessage } from "../../Component/AlertView";

export function HomeScreen(props) {
  var countPickerSelectedImage = 0; // How many images selected by image picker in 1 time open picker
  var countImgUploadAzure = 0; // Image uploaded or failed increase count so that call server api after azure operations.
  var countImgFailedToUpload = 0; // Only count failed images so that we can show fail images counting to user.
  var arrayLibraryLocalData = []; // Local data which need to be save on server
  var countBack = 0;

  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { showUpgrade } = React.useContext(IApContext); // Upgrade button show or not (If user purchased then no need to show)
  const [arrayLibrary, setArrayLibrary] = React.useState([]); // For library data get from api
  const [arrayAlbum, setArrayAlbum] = React.useState([]); // Album data get from api
  const { setUserData } = React.useContext(AuthContext); // for updating user data of authcontext
  const [loading, setLoading] = React.useState(false);
  const [isLibrary, setIsLibrary] = React.useState(true); // Manage either library or album // Temp
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false); //On click make video on fullscreen.
  const [isImageFullScreen, setIsImageFullScreen] = useState(false); //On click make video on fullscreen.
  const [urlZoom, setUrlZoom] = useState(""); // Url of the object which will zoom on the tap
  const [itemZoom, setItemZoom] = useState({}); // Passing complete item to Zoom view
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(""); // Assign calendar selected date
  const [isSharedAlbum, setIsSharedAlbum] = React.useState(false); // Manage either own album or album
  const [arrayAlbumOwn, setArrayAlbumOwn] = React.useState([]); //  own album
  const [arrayAlbumShared, setArrayAlbumShared] = React.useState([]); //Shared album
  const [markedDates, setMarkedDates] = React.useState(null);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [isClickForSearch, setIsClickForSearch] = useState(false); // When clicking on the search updating the pagecount and list, using this flag in render method of ownAlbum
  const [searchAlbumName, setSearchAlbumName] = useState(""); // Search bar text
  const [isAlbumDropDownOpen, setIsAlbumDropDownOpen] = useState(false); // Own / Shared album ddrop down open
  const [isClearSearchText, setIsClearSearchText] = useState(false); // Clear search bar text when selecting library
  const [countFailState, setCountFailState] = useState(0);
  const [isLongPress, setIsLongPress] = React.useState(false); // Media Card LongPress
  const [isCheck, setIsCheck] = React.useState(false); // For managing checks of single card
  const [isSelectAll, setIsSelectAll] = React.useState(false); // For selecting all cards
  const [arrayCheckMarks, setArrayCheckMarks] = React.useState([]); // Selected object array when deleting objects
  const [isaccess, setisaccess] = useState(""); // passing access to album detail so user can update only own albums or full access albums
  const [arrayLibraryDates, setArrayLibraryDates] = useState([]); // Library data uploaded dates are storing in this array to show on calendar
  const [arrayOwnAlbumDates, setArrayOwnAlbumDates] = useState([]); // OwnAlbum data uploaded dates are storing in this array to show on calendar
  const [arraySharedAlbumDates, setArraySharedAlbumDates] = useState([]); // Shared album data uploaded dates are storing in this array to show on calendar
  const [pageCountOwnAlbum, setpageCountOwnAlbum] = React.useState(1); // Pagination own album
  const [ownAlbumResponse, setOwnAlbumResponse] = React.useState({});
  const [sharedAlbumResponse, setSharedAlbumResponse] = React.useState({});
  const [libraryResponse, setLibraryResponse] = React.useState({});
  const [pageCountLibrary, setPageCountLibrary] = React.useState(1); // Pagination library
  const [pageCountSharedAlbum, setPageCountSharedAlbum] = React.useState(1); // Pagination shared album
  const [isFetching, setIsFetching] = useState(false);

  const route = useRoute();
  const routes = useNavigationState((state) => state.routes);

  const data = useSelector((state) => state); // Getting api response
  const dispatch = useDispatch(); // Calling api

  const flatListRef = useRef(); // Create ref to scroll flatlist top once new data added from picker

  React.useEffect(() => {
    if (user && user.conf_key) {
      let azureKey = decryptKey(user.conf_key);
      initAzureBlob({
        storageKey: azureKey, //'Cyf89/I5iOMAt3R296QBjoxWOggSZhmHyqi7FZg7IlQ=',
        // storageKey: "kMBL+bp+hb8awxTU2E7D1UiF/tbjjnBlVUx3ROlGKRjQ1APQDP69KEh2dYf7BM1Xrje9NJEn1XBG9BeGB9pobw==",
        account: AppConstants.constant.CONTAINER_ACCOUNT,
        version: "2020-04-08",
      });
    } else {
      removeCurrentUser();
      alertShow(true, { message: AppConstants.constant.PLEASE_LOGIN });
      return;
    }
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      removeEditMode();
      setSearchAlbumName("");
      setIsAlbumDropDownOpen(false);
      //setIsLibrary(true);
      if (isLibrary) {
        // Calling api to get library data.
        setPageCountLibrary(1);
        arrayLibrary.length = 0;
        callApiToGetLibraryData();
      } else {
        setpageCountOwnAlbum(1);
        arrayAlbumOwn.length = 0; // Make empty so show new data
        callApiToGetOwnAlbumData("", "", 1);
      }
      //  setIsLibrary(true);
    });
    // flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // After adding any new object scroll flatlist to the index
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, [props.navigation, props.route]);

  React.useEffect(() => {
    {
      if (isLibrary && searchAlbumName.length > 0) {
        onChangeText("");
        setIsClearSearchText(true);
        setSearchAlbumName("");
        notifyMessage(AppConstants.constant.ONLY_ALBUM_CAN_SEARCH_BY_NAME);
        setIsLibrary(false);
        return;
      }
      // Album name doesn't contain any special character.

      if (searchAlbumName && searchAlbumName.length !== 0) {
        if (checkStringContainsSpecialChar(searchAlbumName)) {
          notifyMessage(
            AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION
          );
          return;
        }
      }
      setIsClickForSearch(true);
      // Setting page count 1 and clear array so that only searched data will show in the list.
      if (isSharedAlbum) {
        setPageCountSharedAlbum(1);
        if (arrayAlbumShared && arrayAlbumShared.length > 0) {
          arrayAlbumShared.length = 0;
          setArrayAlbumShared([]);
        }
        callApiToGetSharedAlbum("", "", 1, searchAlbumName);
      } else {
        setpageCountOwnAlbum(1);
        if (arrayAlbumOwn && arrayAlbumOwn.length > 0) {
          arrayAlbumOwn.length = 0;
          setArrayAlbumOwn([]);
        }
        callApiToGetOwnAlbumData("", "", 1, searchAlbumName);
      }
    }
  }, [searchAlbumName]);

  // Callback function for back action
  const handleBackButtonClick = () => {
    countBack = countBack + 1;
    setIsImageFullScreen(false);
    setIsVideoFullScreen(false);
    if (countBack > 1) {
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
      // let place = routes[routes.length - 1];
      props.navigation.goBack();
    }
    return true;
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
  // For albumcounter
  React.useEffect(() => {
    callApiToGetOwnAlbumData();
  }, [pageCountOwnAlbum]);

  const refreshAlbumList = () => {
    setpageCountOwnAlbum(1);
  };
  // React.useEffect(() => {
  //   callApiToGetLibraryData();
  // }, [arrayLibrary]);

  const uploadAzure = async (assest) => {
    let assetObject = {};

    if (Platform.OS === "ios") {
      assetObject = {
        filename: assest.filename,
        fileSize: assest.size,
        height: assest.height,
        type: assest.mime,
        uri: assest.sourceURL,
      };
    } else {
      assetObject = {
        filename: generateRandomFileName(),
        fileSize: assest.size,
        height: assest.height,
        type: assest.mime,
        uri: assest.path,
      };
    }
    const res = await azureblobfetch({
      assest: assetObject,
      container: user.user_detail.container_name
        ? user.user_detail.container_name
        : "", //your countainer name,
      filenameprefix: "", //add before the autogenrated file name,
      type: "Upload",
    });
    setLoading(true);
    Upload.addListener("progress", res.uploadId, (data) => {});
    Upload.addListener("cancelled", res.uploadId, (data) => {
      countImgUploadAzure = countImgUploadAzure + 1;
    });
    Upload.addListener("completed", res.uploadId, (data) => {
      // data includes responseCode: number and responseBody: Object
      // We are passing uri to show images locally with the url
      countImgUploadAzure = countImgUploadAzure + 1;
      let dictImageToShow = {};

      if (Platform.OS === "ios") {
        dictImageToShow = {
          file_name: assest.filename,
          file_type: assest.mime.includes("image") ? "image" : assest.mime,
          is_success: true,
          size: assest.size,
          album_id: 0,
          uri: res.url,
          user_media_id: Math.random(), // We are distincting array elements based on user_media id so we generate it unique
        };
      } else {
        dictImageToShow = {
          file_name: generateRandomFileName(),
          file_type: assest.mime.includes("image") ? "image" : assest.mime,
          is_success: true,
          size: assest.size,
          album_id: 0,
          uri: res.url,
          user_media_id: Math.random(), // We are distincting array elements based on user_media id so we generate it unique
        };
      }
      if (arrayLibrary) {
        if (arrayLibrary.length > 0) {
          arrayLibrary.splice(0, 0, dictImageToShow);
        } else {
          arrayLibrary.push(dictImageToShow);
        }
      }

      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // After adding any new object scroll flatlist to the index

      // In api we don't need to pass uri in the image object.
      let created_date = CurrentDate();
      let dictImageToSend = {
        file_name: res.filename,
        file_type: assest.mime.includes("image")
          ? "image"
          : assest.mime.includes("video")
          ? "video"
          : assest.mime,
        is_success: true,
        size: assest.size,
        created_date: created_date,
        album_id: 0,
      };
      arrayLibraryLocalData.push(dictImageToSend);

      // all picker selected images are uploaded on azure so we are calling server api to upload all uploaded images on server.
      if (countImgUploadAzure === countPickerSelectedImage) {
        let param = {
          sessid: user.sessid ? user.sessid : "",
          name: "",
          data: arrayLibraryLocalData,
        };
        dispatch(uploadMedia(param));
        if (countImgFailedToUpload > 1) {
          notifyMessage(
            AppConstants.constant.AZURE_CANT_UPLOAD_MULTIPLE_IMAGES_LIBRARY
          );
        } else if (countImgFailedToUpload === 1) {
          notifyMessage(
            AppConstants.constant.AZURE_CANT_UPLOAD_SINGLE_IMAGE_LIBRARY
          );
        }
      }
      setLoading(false);
    });
    Upload.addListener("error", res.uploadId, (err) => {
      // Increase count in fail situation because only uploading those images on server who are successfully uploaded on azure.
      countImgUploadAzure = countImgUploadAzure + 1;
      countImgFailedToUpload = countImgFailedToUpload + 1;
      setCountFailState(countImgFailedToUpload);

      if (countImgFailedToUpload === countPickerSelectedImage) {
        setIsApiCall(false);
        setLoading(false);

        if (countImgFailedToUpload > 1) {
          notifyMessage(
            AppConstants.constant.AZURE_CANT_UPLOAD_MULTIPLE_IMAGES_LIBRARY
          );
        } else if (countImgFailedToUpload === 1) {
          notifyMessage(
            AppConstants.constant.AZURE_CANT_UPLOAD_SINGLE_IMAGE_LIBRARY
          );
        }
      }

      setLoading(false);
      // Alert.alert('Image upload failed!')
      // uploadAzure(assest);
    });
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

  // This will show when user space will be full
  const showUpgradeAlert = () => {
    Alert.alert(
      AppConstants.constant.ONLINE_FAMILY_VAULT,
      AppConstants.constant.UPGRADE_ACCOUNT_ALERT,
      [
        {
          text: AppConstants.constant.REMIND_ME_LATER,
          onPress: () => console.log(""),
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

  const removeEditMode = () => {
    setIsLongPress(false);
    arrayCheckMarks.length = 0;
    setArrayCheckMarks([]);
    setIsCheck(false);
  };

  const moveToAddAlbum = () => {
    if (!checkUserAvailableSpace()) {
      return;
    }
    {
      removeEditMode();
      // your own space is >= to yout total space'
      props.navigation.navigate("AddNewAlbum", {
        totalOwnAlbumspace:
          data.HomeReducer && data.HomeReducer.userSpace
            ? data.HomeReducer.userSpace.own_space
            : 0,

        onReturn: callbackFunction,
      });
    }
  };

  const selectImage = () => {
    if (!checkUserAvailableSpace()) {
      return;
    }
    {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
      })

        .then((response) => {
          var uploadMediaVar = true;

          let tempMediaspce = 0;
          if (response && response.length) {
            // User can select only 5 media in a single time in iOS it is managed by property in android we are checking by counting
            if (
              response &&
              response.length > AppConstants.constant.MAX_SELECTION_QTY
            ) {
              notifyMessage(
                AppConstants.constant.YOU_CAN_SELECT_MAX_FIVE_MEDIA
              );
              selectImage();
              return;
            }
            countPickerSelectedImage = response.length;
          }
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
              // uploadAzure(data1);
            } else {
              uploadMediaVar = false;
            }
          });
          // Upload Staging api and integration
          gotoUploadImage(tempIMG);
          if (uploadMediaVar) {
          } else {
            showUpgradeAlert();
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  // Upload Staging api and integration
  const gotoUploadImage = (data) => {
    callAPItoUploadImage(data);
  };
  const onClickOwnAlbum = () => {
    setIsSharedAlbum(false), callApiToGetOwnAlbumData();
  };
  const onClickSharedAlbum = () => {
    setIsSharedAlbum(true), getSharedAlbumData();
  };

  const getTimeMessage = () => {
    var d = new Date();
    var hour = d.getHours();
    var amPm = "";
    let stringToRead = "";
    if (hour < 12) {
      amPm = "am";
      stringToRead = "Good morning!";
    } else {
      amPm = "pm";
      if (hour >= 12 && hour <= 17) {
        stringToRead = "Good Afternoon!";
      } else {
        if (hour > 17 && hour <= 24) {
          stringToRead = "Good Evening!";
        }
      }
    }
    return stringToRead;
  };

  const onKeyEventPress = (event) => {};

  const renderHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerViewUser}>
          {/* <Text style={styles.greetingText}>{getTimeMessage()}</Text> */}

          <Pressable
            style={[styles.userHeaderView, { alignSelf: "flex-start" }]}
            onPress={() => props.navigation.navigate("EditDetails")}
          >
            {user && user.user_detail && user.user_detail.profile_image ? (
              <FastImage
                style={{
                  height: width * 0.12,
                  width: width * 0.12,
                  borderRadius: (width * 0.12) / 2,
                  marginRight: "2%",
                }}
                source={{ uri: user.user_detail.profile_image }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Avatar.Icon
                icon="account"
                size={50}
                style={{ marginRight: "2%" }}
              />
            )}
            <Text style={styles.hiText}>Hi</Text>
            <Text style={styles.hiText}>
              {" "}
              {user && user.user_detail ? user.user_detail.full_name : ""}
            </Text>
          </Pressable>
        </View>

        <Search
          onClickCalendar={onClickCalendar} //temp
          // onClickCalendar={() => {}}
          onClickSearch={onClickSearch}
          isCalendar={true}
          onChangeText={onChangeText}
          onEndEditing={onKeyEventPress}
          placeholder={"Search Album Name"}
          searchTxt={searchAlbumName}
          onClickRedBtnFromView={onClickRedButtonSearch}
        />

        {isCalendarShow ? (
          <View style={{ padding: "2%" }}>
            <CalendarView
              markedDates={markedDates}
              onDayPress={onClickCalendarDate}
            />
          </View>
        ) : (
          <>
            <StorageQuota
              showUpgrade={showUpgrade}
              upgradeNow={moveToSubscriptionScreen}
              data={data}
            />
            <View style={styles.viewLineAndDropDown}>
              <View style={styles.viewTitleAndDelete}>
                <Headline style={styles.allPhotosTitle}>Library</Headline>

                {isLibrary ? (
                  isLongPress && arrayLibrary.length > 0 ? (
                    <IconMaterialCommunity
                      onPress={() => onClickDelete()}
                      name="delete-circle"
                      size={35}
                      color={AppColor.colors.RED}
                      style={styles.iconDelete}
                    />
                  ) : null
                ) : (isLongPress && arrayAlbumOwn.length > 0) ||
                  (isLongPress && arrayAlbumShared.length > 0) ? (
                  <IconMaterialCommunity
                    onPress={() => onClickDelete()}
                    name="delete-circle"
                    size={35}
                    color={AppColor.colors.RED}
                    style={styles.iconDelete}
                  />
                ) : null}
              </View>

              <View
                style={{
                  width: wp("18%"),
                  height: hp("10%"),
                  justifyContent: "center",
                }}
              >
                <View style={styles.viewAlbum}>
                  <TouchableOpacity
                    onPress={() => setIsAlbumDropDownOpen(!isAlbumDropDownOpen)}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.textAlbum}>
                        {isSharedAlbum ? "Share" : "Own"}
                      </Text>
                      {!isAlbumDropDownOpen ? (
                        <IconAntDesign
                          name="caretdown"
                          color={AppColor.colors.WHITE}
                          size={14}
                        />
                      ) : (
                        <IconAntDesign
                          color={AppColor.colors.WHITE}
                          name="caretup"
                          size={14}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                {isAlbumDropDownOpen ? (
                  <View style={styles.viewFlatListDropDown}>
                    <FlatList
                      data={["Own", "Share"]}
                      renderItem={(item) => {
                        return (
                          <View style={styles.viewDropDownCell}>
                            <TouchableOpacity
                              onPress={() => {
                                setIsAlbumDropDownOpen(false),
                                  setIsLibrary(false),
                                  isClearSearchText
                                    ? setIsClearSearchText(false)
                                    : null;

                                item.item === "Own"
                                  ? onClickOwnAlbum()
                                  : onClickSharedAlbum();
                              }}
                            >
                              <Text style={styles.textDropDownCell}>
                                {item.item}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : null}
                <View></View>
              </View>
            </View>

            <TabSwitch
              tabs={["All Photos", "Albums"]}
              onPressFirstTab={() => {
                setIsLibrary(true);
                setIsSharedAlbum(false);

                if (libraryResponse && libraryResponse.data)
                  if (
                    libraryResponse.data.totalPages >= pageCountLibrary &&
                    arrayLibrary.length < libraryResponse.data.totalMediaCount
                  ) {
                    // getLibraryData(false);
                    callApiToGetLibraryData();
                  }
              }}
              onPressSecondTab={() => {
                if (isClearSearchText) {
                  setIsClearSearchText(false);
                }
                setIsLibrary(false);
                setIsSharedAlbum(false);
                //   getOwnAlbumData(false);
                callApiToGetOwnAlbumData();
              }}
              isFirstTab={isLibrary}
            />
          </>
        )}
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.viewLoader}>
        <Pressable
          onPress={isLibrary ? selectImage : moveToAddAlbum}
          style={styles.footerContainerView}
        >
          <Image
            resizeMode="contain"
            style={styles.addView}
            source={require("../../assets/icons/plus.png")}
          />
          <Text style={{ color: "#fff" }}>
            {isLibrary ? "Select Photos/Videos" : "New Album"}
          </Text>
        </Pressable>
      </View>
    );
  };

  const callApiToDelete = (arrayDeleteItems) => {
    setArrayCheckMarks([]);
    arrayCheckMarks.length = 0;

    console.log(" arrayDeleteItems", arrayDeleteItems); 

    if (isLibrary) {
      let param = {
        sessid: user.sessid ? user.sessid : "",
        data: arrayDeleteItems,
      };
      dispatch(deleteUserMedia(param));
    } else {
      let param = {
        sessid: user.sessid ? user.sessid : "",
        album_ids: arrayDeleteItems,
      };
      dispatch(deleteAlbum(param));
    }
  };

  const onClickDelete = () => {
    var arrayDeleteItems = [];

    for (let index = 0; index < arrayCheckMarks.length; index++) {
      const element = arrayCheckMarks[index];
    //  console.log(" element is --", element); 

      if (element.isCheck) {
        if (isLibrary) {
          arrayDeleteItems.push(element.file_name);
        } else {
          arrayDeleteItems.push(element.album_id);
        }
      }
    }
    var alertTitle = "";
    if (isLibrary) {
      if (arrayDeleteItems.length == 0) {
        notifyMessage(AppConstants.constant.PLEASE_SELECT_ATLEAST_ONE_ITEM);
        return;
      } else {
        if (arrayDeleteItems.length > 1) {
          if (arrayDeleteItems.length === arrayLibrary.length) {
            alertTitle = AppConstants.constant.DO_YOU_WANT_TO_DELETE_ALL_ITEMS;
          } else {
            alertTitle =
              AppConstants.constant
                .DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_MEDIA;
          }
        } else {
          alertTitle =
            AppConstants.constant.DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA;
        }
      }
    } else {
      if (arrayDeleteItems.length == 0) {
        notifyMessage(AppConstants.constant.PLEASE_SELECT_ATLEAST_ONE_ALBUM);
        return;
      } else {
        if (arrayDeleteItems.length > 1) {
          if (arrayDeleteItems.length === arrayAlbumOwn.length) {
            alertTitle = AppConstants.constant.DO_YOU_WANT_TO_DELETE_ALL_ALBUMS;
          } else {
            alertTitle =
              AppConstants.constant
                .DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_ALBUMS;
          }
        } else {
          alertTitle =
            AppConstants.constant.DO_YOU_WANT_TO_DELETE_ONE_SELECTED_ALBUM;
        }
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
      },
    ]);
  };

  const renderLibraryList = ({ item, index }) => {
    if (item.file_name) {
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
    } else {
      return (
        <Pressable
          onPress={isLibrary ? selectImage : moveToAddAlbum}
          style={styles.footerContainerView}
        >
          <Image
            resizeMode="contain"
            style={styles.addView}
            source={require("../../assets/icons/plus.png")}
          />
          <Text style={styles.textBottom}>{"Select Photos/Videos"}</Text>
        </Pressable>
      );
    }
  };

  const moveToAlbumDetail = (item) => {
    var itemAccess = "";
    dispatch(albumIdInDetailToGet(item.album_id));
    dispatch(albumIdInDetailToGet(item.album_id));
    if (isSharedAlbum) {
      itemAccess = item.access;
    } else {
      itemAccess = 1;
    }
    item.isSharedAlbum = isSharedAlbum;
    setIsLongPress(false);
    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: 'MainActivity' })],
    // });
    props.navigation.navigate("AlbumDetailScreen", {
      albumdetail: item,
      access: itemAccess,
      onReturn: () => {
        refreshAlbumList(data);
      },
    });
  };

  const renderAlbumList = ({ item, index }) => {
    if (item.name) {
      let containerName = "";
      if (isSharedAlbum) {
        containerName = item.container;
      } else {
        containerName =
          user && user.user_detail ? user.user_detail.container_name : "";
      }
      let imageUrl = AZURE_BASE_URL + containerName + "/" + item.file_name;

      return (
        <AlbumCard
          isSharedAlbum={isSharedAlbum}
          isSelectAll={isSelectAll}
          setIsSelectAll={setIsSelectAll}
          setIsCheck={setIsCheck}
          isCheck={isCheck}
          isLongPress={isLongPress}
          setIsLongPress={setIsLongPress}
          item={item}
          imageUrl={imageUrl}
          index={index}
          setArrayCheckMarks={setArrayCheckMarks}
          arrayCheckMarks={arrayCheckMarks}
          moveToAlbumDetail={() => moveToAlbumDetail(item)}
        />
      );
    } else {
      return (
        <Pressable onPress={moveToAddAlbum} style={styles.footerContainerView}>
          <Image
            resizeMode="contain"
            style={styles.addView}
            source={require("../../assets/icons/plus.png")}
          />
          <Text style={styles.textBottom}>{"New Album"}</Text>
        </Pressable>
      );
    }
  };

  const alertShow = (isLogout, response) => {
    var alertTitle = response.message;

    if (isLogout) {
      alertTitle = response.message;
    } else {
      if (countFailState > 1) {
        alertTitle =
          response.message +
          " " +
          AppConstants.constant.AZURE_CANT_UPLOAD_MULTIPLE_IMAGES;
      } else if (countFailState === 1) {
        alertTitle =
          response.message +
          " " +
          AppConstants.constant.AZURE_CANT_UPLOAD_SINGLE_IMAGE;
      }
    }
    Alert.alert(AppConstants.constant.ONLINE_FAMILY_VAULT, response.message, [
      {
        text: "Ok",
        onPress: () => (isLogout ? moveToLoginScreen() : console.log(" ")),
      },
    ]);
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
    // dispatch(listAllMediaSuccess({}));
  };

  const createMarkedDateObject = (arrayDates) => {
    var newDaysObject = {};
    if (arrayDates && arrayDates.length > 0) {
      arrayDates.forEach((day) => {
        newDaysObject[day] = {
          selected: true,
          marked: true,
          dotColor: AppColor.colors.RED,
        };
      });
    }

    setMarkedDates(newDaysObject);
  };

  const onClickCalendar = () => {
    if (isLibrary) {
      createMarkedDateObject(arrayLibraryDates);
    } else {
      if (isSharedAlbum) {
        createMarkedDateObject(arraySharedAlbumDates);
      } else {
        createMarkedDateObject(arrayOwnAlbumDates);
      }
    }
    setIsCalendarShow(!isCalendarShow);
    setApiCallBasedOnSelectedDate("");
  };

  const setApiCallBasedOnSelectedDate = (dateString) => {
    if (isLibrary) {
      setPageCountLibrary(1);
      if (arrayLibrary && arrayLibrary.length > 0) {
        arrayLibrary.length = 0;
        setArrayLibrary([]);
      }
      callApiToGetLibraryData(dateString, "selectedDate");
    } else if (isSharedAlbum) {
      setPageCountSharedAlbum(1);
      if (arrayAlbumShared && arrayAlbumShared.length > 0) {
        arrayAlbumShared.length = 0;
        setArrayAlbumShared([]);
      }
      callApiToGetSharedAlbum(dateString, "selectedDate", 1);
    } else {
      if (arrayAlbumOwn && arrayAlbumOwn.length > 0) {
        arrayAlbumOwn.length = 0;
        setArrayAlbumOwn([]);
      }
      setpageCountOwnAlbum(1);

      callApiToGetOwnAlbumData(dateString, "selectedDate", 1);
    }
  };

  const onClickCalendarDate = async (selectedDay) => {
    let dateString = selectedDay.dateString;
    // Pass parameter in api
    // return;
    await setSelectedDate(dateString);
    setIsClickForSearch(true);
    setApiCallBasedOnSelectedDate(dateString);
  };

  const callbackFunction = (childData) => {
    refreshAlbumList(data);
  };

  const onClickRedButtonSearch = () => {
    if (isLibrary) {
      notifyMessage(AppConstants.constant.ONLY_ALBUM_CAN_SEARCH_BY_NAME);
      return;
    }
    onClickSearch();
  };
  const onClickSearch = () => {
    if (isLibrary) {
      onChangeText("");
      setIsClearSearchText(true);
      setSearchAlbumName("");
      notifyMessage(AppConstants.constant.ONLY_ALBUM_CAN_SEARCH_BY_NAME);
      return;
    }
    // Album name doesn't contain any special character.

    if (searchAlbumName && searchAlbumName.length !== 0) {
      if (checkStringContainsSpecialChar(searchAlbumName)) {
        notifyMessage(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
        return;
      }
    }
    setIsClickForSearch(true);
    // Setting page count 1 and clear array so that only searched data will show in the list.
    if (isSharedAlbum) {
      setPageCountSharedAlbum(1);
      if (arrayAlbumShared && arrayAlbumShared.length > 0) {
        arrayAlbumShared.length = 0;
        setArrayAlbumShared([]);
      }
      callApiToGetSharedAlbum("", "", 1);
    } else {
      setpageCountOwnAlbum(1);
      if (arrayAlbumOwn && arrayAlbumOwn.length > 0) {
        arrayAlbumOwn.length = 0;
        setArrayAlbumOwn([]);
      }
      callApiToGetOwnAlbumData("", "", 1);
    }
  };

  //** Show data of own albums   *//
  const resetPageCountOnSearch = () => {
    // action on update of movies

    setIsClickForSearch(false);
    if (isLibrary) {
      getLibraryData(false);
    } else if (isSharedAlbum) {
      callApiToGetSharedAlbum(false);
    } else {
      getOwnAlbumData(false);
    }
  };

  const onChangeText = (textSearch) => {
    setSearchAlbumName(textSearch);
  };

  //** Call api  **//

  const callApiToGetUserSpace = () => {
    setIsApiCall(true);
    dispatch(
      getUserSpace({
        sessid: user.sessid ? user.sessid : "",
      })
    );
  };

  const getSharedAlbumData = (isLoadMore) => {
    {
      // This is the first time when own album is empty and we need to call api
      callApiToGetSharedAlbum();
    }
  };

  const callApiToGetSharedAlbum = (
    selectedDate,
    from,
    pageCount,
    textToSearch
  ) => {
    setIsApiCall(true);
    if (selectedDate && selectedDate.length > 0) {
      dispatch(
        listsSharedAlbum({
          sessid: user.sessid ? user.sessid : "",
          date: selectedDate,
          page: pageCount,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    } else if (pageCount) {
      dispatch(
        listsSharedAlbum({
          sessid: user.sessid ? user.sessid : "",
          page: pageCount,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    } else {
      dispatch(
        listsSharedAlbum({
          sessid: user.sessid ? user.sessid : "",
          page: pageCountSharedAlbum,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    }
  };

  const callApiToGetOwnAlbumData = (
    selectedDate,
    from,
    pageCount,
    textToSearch
  ) => {
    setIsApiCall(true);
    if (selectedDate && selectedDate.length > 0) {
      dispatch(
        listsOwnAlbum({
          sessid: user.sessid ? user.sessid : "",
          date: selectedDate,
          page: pageCount,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    } else if (pageCount) {
      dispatch(
        listsOwnAlbum({
          sessid: user.sessid ? user.sessid : "",
          page: pageCount,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    } else {
      dispatch(
        listsOwnAlbum({
          sessid: user.sessid ? user.sessid : "",
          page: pageCountOwnAlbum,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    }
  };

  // Upload Staging api and integration
  const callAPItoUploadImage = (item) => {
    const params = new FormData();
    params.append("sessid", user.sessid);
    // params.append("name", "name");
    item.map((data1, index) => {
      console.log(" data1 in lib", data1); 
      params.append("album_media[" + index + "]", data1);
    });
     setIsApiCall(true);
     dispatch(uploadImg(params));
    
  };
  
  const getOwnAlbumData = (isLoadMore) => {
    {
      // This is the first time when own album is empty and we need to call api
      callApiToGetOwnAlbumData();
    }
  };

  const listAllMediaSuccessApiCall = () => {
    
    let dict = data.HomeReducer;
    dict.library = {};
    dispatch(listAllMediaSuccess(dict));
  };

  const listOwnAlbumSuccessApiCall = () => {
    let dict = data.HomeReducer;
    dict.ownAlbums = {};
    dispatch(listOwnAlbumSuccess(dict));
  };

  const listSharedAlbumSuccessApiCall = () => {
    let dict = data.HomeReducer;
    dict.sharedAlbums = {};
    dispatch(listSharedAlbumSuccess(dict));
  };

  const callApiToGetLibraryData = useCallback(
    (selectedDate, from) => {
      setIsApiCall(true);

      if (from === "selectedDate" && selectedDate && selectedDate.length > 0) {
        dispatch(
          listAllMedia({
            sessid: user.sessid ? user.sessid : "",
            date: selectedDate,
            page: pageCountLibrary,
            order_by_colum: "created_date",
            direction: "DESC",
          })
        );
      } else if (from === "loadMore" || from === "responseCode") {
        dispatch(
          listAllMedia({
            sessid: user.sessid ? user.sessid : "",
            page: selectedDate, // here selected date is the pagecount which is passing from the calling function
            order_by_colum: "created_date",
            direction: "DESC",
          })
        );
      } else {
        dispatch(
          listAllMedia({
            sessid: user.sessid ? user.sessid : "",
            page: pageCountLibrary,
            order_by_colum: "created_date",
            direction: "DESC",
          })
        );
      }
    },
    [arrayLibrary, pageCountLibrary]
  );

  // For pagination
  const loadMoreData = () => {
    if (isLibrary) {
      let dataToset = pageCountLibrary + 1;
      setPageCountLibrary(dataToset);
      if (libraryResponse && libraryResponse.data) {
        if (
          libraryResponse.data.totalPages >= pageCountLibrary &&
          arrayLibrary &&
          arrayLibrary.length < libraryResponse.data.totalMediaCount
        ) {
          // getLibraryData(true);
          callApiToGetLibraryData(dataToset, "loadMore");
        }
      }
    } else {
      if (isSharedAlbum) {
        if (sharedAlbumResponse && sharedAlbumResponse.data)
          if (
            sharedAlbumResponse.data.totalPages >= pageCountSharedAlbum &&
            arrayAlbumShared &&
            arrayAlbumShared.length < sharedAlbumResponse.data.totalAlbumCount
          ) {
            setPageCountSharedAlbum(pageCountSharedAlbum + 1);
            let dataToSet = pageCountSharedAlbum + 1;
            callApiToGetSharedAlbum("", "loadMore", dataToSet);
          }
      } else {
        let dataToSet = pageCountOwnAlbum + 1;
        setpageCountOwnAlbum(dataToSet);

        if (ownAlbumResponse && ownAlbumResponse.data)
          if (
            ownAlbumResponse.data.totalPages >= pageCountOwnAlbum &&
            arrayAlbumOwn &&
            arrayAlbumOwn.length < ownAlbumResponse.data.totalAlbumCount
          ) {
            callApiToGetOwnAlbumData("", "loadMore", dataToSet);
          }
      }
    }
  };

  //* Update array according to api response  *//

  const setData = () => {
    if (isLibrary) {

      if (
        data.HomeReducer.library &&
        data.HomeReducer.library.responseCode &&
        data.HomeReducer.library.responseCode ===
          AppConstants.constant.SUCCESS &&
        data.HomeReducer.library.data &&
        data.HomeReducer.library.data.data
      ) {
        if (isApiCall) {
          setIsApiCall(false);

          if (arrayLibrary) {

            if (arrayLibrary.length > 0) {
              //paging case need to append data in existing array
              setArrayLibrary(
                arrayLibrary.concat(data.HomeReducer.library.data.data)
              );
            } else {
              // Initially when array length 0 add objects
              setArrayLibrary(data.HomeReducer.library.data.data);
            }
          }
          setArrayLibraryDates(data.HomeReducer.library.data.dates);
          setLibraryResponse(data.HomeReducer.library);
        }
        // After setting library data we are making empty
        listAllMediaSuccessApiCall();
      }
    } else {

      if (isSharedAlbum) {
        if (
          data.HomeReducer.sharedAlbums &&
          data.HomeReducer.sharedAlbums.responseCode &&
          data.HomeReducer.sharedAlbums.responseCode ===
            AppConstants.constant.SUCCESS
        ) {
          if (isApiCall) {
            setIsApiCall(false);
            if (arrayAlbumShared) {
              if (arrayAlbumShared.length > 0) {
                //paging case need to append data in existing array
                setArrayAlbumShared(
                  arrayAlbumShared.concat(
                    data.HomeReducer.sharedAlbums.data.data
                  )
                );
              } else {
                if (data.HomeReducer.sharedAlbums.data.totalAlbumCount === 0) {
                  setArrayAlbumShared([]);
                  if (arrayAlbumShared && arrayAlbumShared.length > 0) {
                    arrayAlbumShared.length = 0;
                  }
                } else {
                  // When api call first time

                  setArrayAlbumShared(data.HomeReducer.sharedAlbums.data.data);
                }
              }
            }
            setArraySharedAlbumDates(data.HomeReducer.sharedAlbums.data.dates);
            setSharedAlbumResponse(data.HomeReducer.sharedAlbums);
          }
          listSharedAlbumSuccessApiCall();
        }
      } else {
        if (
          data.HomeReducer.ownAlbums &&
          data.HomeReducer.ownAlbums.responseCode &&
          data.HomeReducer.ownAlbums.responseCode ===
            AppConstants.constant.SUCCESS
        ) {
          if (isApiCall) {
            setIsApiCall(false);
            if (
              data.HomeReducer.ownAlbums &&
              data.HomeReducer.ownAlbums.data &&
              data.HomeReducer.ownAlbums.data.data
            ) {
              if (arrayAlbumOwn) {
                if (arrayAlbumOwn.length > 0) {
                  setArrayAlbumOwn(
                    arrayAlbumOwn.concat(data.HomeReducer.ownAlbums.data.data)
                  );
                } else {
                  if (
                    data.HomeReducer.ownAlbums.data &&
                    data.HomeReducer.ownAlbums.data.data.length > 0
                  ) {
                    setArrayAlbumOwn(data.HomeReducer.ownAlbums.data.data);
                  } else {
                    arrayAlbumOwn.length = 0;
                    setArrayAlbumOwn([]);
                  }
                }
              }
              setArrayOwnAlbumDates(data.HomeReducer.ownAlbums.data.dates);
              setOwnAlbumResponse(data.HomeReducer.ownAlbums);
            }
          }
          listOwnAlbumSuccessApiCall();
        }
      }
    }
  };
  // Manage failure response and error condition to show alert and do action accordingly

  const showNoMediaAlert = (dataResponse) => {
    if (dataResponse && isApiCall) {
      if (dataResponse.errorCode === AppConstants.constant.DELETE_SUCCESS) {
        setIsApiCall(false);
        alertShow(false, dataResponse);
        return;
      }

      if (dataResponse.errorCode === AppConstants.constant.NOT_AUTHORIZED) {
        setIsApiCall(false);
        alertShow(true, dataResponse);
      }
      if (dataResponse.errorCode === AppConstants.constant.NO_MEDIA) {
        setIsApiCall(false);
        //alertShow(false, dataResponse);
      } else {
        setData();
      }
    }
  };
  const checkResponseCode = () => {
    var response = {};

    if (props.route.params) {
      if (props.route.params.from === "addNewAlbum") {
        refreshAlbumList();
        props.route.params.from = "Home";
      }
    }

    if (data.HomeReducer.library && data.HomeReducer.library.errorCode) {
      if (
        data.HomeReducer.library.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        return (
          <SubscriptionError
            comeFrom={"Home"}
            errorCode={data.HomeReducer.library.errorCode}
            navigation={props.navigation}
          />
        );
      }
    }

    if (
      data.HomeReducer.library &&
      data.HomeReducer.library.errorCode &&
      isApiCall
    ) {
      if (
        data.HomeReducer.library.errorCode ===
          AppConstants.constant.SUBSCRIPTION_EXPIRED ||
        data.HomeReducer.library.errorCode ===
          AppConstants.constant.SUBSCRIPTION_INVALID
      ) {
        setIsApiCall(false);
        showUpgradeAlert();
      }
    }

   // console.log(" delete album check ", data.HomeReducer.deleteAlbum)
    // Delete Album
    if (
      data.HomeReducer.deleteAlbum &&
      data.HomeReducer.deleteAlbum.errorCode
    ) {
      if (
        data.HomeReducer.deleteAlbum.errorCode ===
        AppConstants.constant.DELETE_SUCCESS
      ) {
        dispatch(deleteAlbumSuccess({})); // For making empty delete album media
        {
          removeEditMode();
          arrayAlbumOwn.length = 0; // Make empty so show new data
          let dataToSet = 1;
          setpageCountOwnAlbum(dataToSet);
          callApiToGetOwnAlbumData("", "loadMore", dataToSet);
        }
        // notifyMessage(data.HomeReducer.deleteAlbum.message)
      } else if (
        data.HomeReducer.deleteAlbum.errorCode ===
        AppConstants.constant.DELETE_FAIL
      ) {
        dispatch(deleteAlbumFail({})); // For making empty delete album media
        notifyMessage(data.HomeReducer.deleteAlbum.message);
      }
    }

    // delete user media
    if (
      data.HomeReducer.deleteUserMedia &&
      data.HomeReducer.deleteUserMedia.errorCode
    ) {
      if (
        data.HomeReducer.deleteUserMedia.errorCode ===
        AppConstants.constant.DELETE_SUCCESS
      ) {
        dispatch(deleteUserMediaSuccess({})); // For making empty delete user media
        {
          removeEditMode();
          // Calling api to get library data.

          let dataToset = 1;
          setPageCountLibrary(dataToset);
          arrayLibrary.length = 0;
          callApiToGetLibraryData(dataToset, "responseCode");
        }
        //  notifyMessage( data.HomeReducer.deleteUserMedia.message);
      } else if (
        data.HomeReducer.deleteUserMedia.errorCode ===
        AppConstants.constant.DELETE_FAIL
      ) {
        dispatch(deleteUserMediaFail({})); // For making empty delete album media
        notifyMessage(data.HomeReducer.deleteUserMedia.message);
      }
    }
    // Get user space
    if (data.HomeReducer.userSpace) {
      response = data.HomeReducer.userSpace;
      showNoMediaAlert(response);
    }

    // For library, Own Album and shared album
    if (isLibrary) {
      response = data.HomeReducer.library;
      //if (response.errorCode)
      {

        if (
          response &&
          response.errorCode &&
          response.errorCode === AppConstants.constant.NOT_AUTHORIZED
        ) {
          setIsApiCall(false);
          let dict = data.HomeReducer.library;
          dict.errorCode = "";
          data.HomeReducer.library = dict;
          alertShow(true, response);
          return;
        }

        if (
          response &&
          response.errorCode &&
          response.errorCode === AppConstants.constant.NO_MEDIA
        ) {
          setIsApiCall(false);
          // After setting library data we are making empty
          listAllMediaSuccessApiCall();
        } else {
          setData();
        }
        if (
          data.HomeReducer.uploadImages &&
          data.HomeReducer.uploadImages.errorCode ===
            AppConstants.constant.NOT_AUTHORIZED
        ) {
         
          setIsApiCall(false);
          showNoMediaAlert(data.HomeReducer.uploadImages);
         
        } else {
          if (
            
            data.HomeReducer.uploadImages && data.HomeReducer.uploadImages.errorCode &&
            data.HomeReducer.uploadImages.errorCode ===
              AppConstants.constant.INSERT_SUCCESS
          ){

            setArrayLibrary(
              arrayLibrary.concat(data.HomeReducer.uploadImages.data.userMedia)
            );
            let dict = data.HomeReducer.uploadImages;
            dict.errorCode = "";
            data.HomeReducer.uploadImages = dict;
      
          } else {
          }
        }

      }
    } else {
      if (isSharedAlbum) {
        response = data.HomeReducer.sharedAlbums;
        if (
          response &&
          response.errorCode &&
          response.errorCode === AppConstants.constant.NOT_AUTHORIZED
        ) {
          setIsApiCall(false);
          let dict = data.HomeReducer.sharedAlbums;
          dict.errorCode = "";
          data.HomeReducer.sharedAlbums = dict;
          alertShow(true, response);
          return;
        }
      } else {
        response = data.HomeReducer.ownAlbums;
        if (
          response &&
          response.errorCode &&
          response.errorCode === AppConstants.constant.NOT_AUTHORIZED
        ) {
          setIsApiCall(false);
          let dict = data.HomeReducer.ownAlbums;
          dict.errorCode = "";
          data.HomeReducer.ownAlbums = dict;
          alertShow(true, response);
          return;
        }
      }
      if (
        response &&
        response.errorCode &&
        response.errorCode === AppConstants.constant.NO_MEDIA
      ) {
        setIsApiCall(false);
        if (isSharedAlbum) {
          dispatch(listSharedAlbumSuccess);
        } else {
          dispatch(listOwnAlbumSuccess);
        }
      } else {
        setData();
      }
    }
  };

  const distictLibraryArray = (data) => {
   
    const distinctArray = [
      ...new Map(data.map((x) => [x?.user_media_id, x])).values(),
    ];

   // ** Pushing an empty item so i can show add button in the place of it.  */
   distinctArray.push({})
    return distinctArray;
  };

  const distictOwnAlbumArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["album_id"], x])).values(),
    ];
    distinctArray.push({});
    return distinctArray;
  };

  const distictShareAlbumArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["album_id"], x])).values(),
    ];
    distinctArray.push({});
    return distinctArray;
  };

  return (
    <>
      {checkResponseCode()}

      {/* {isClickForSearch ? resetPageCountOnSearch() : null} */}

      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#f0f4f9",
          alignItems: "center",
          paddingBottom: "3%",
        }}
      >
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            // setPageCountLibrary(1);
            // arrayLibrary.length = 0;
            // Keyboard.dismiss();
            // setIsImageFullScreen(false);
            // setIsVideoFullScreen(false);
            props.navigation.toggleDrawer();
          }}
          isNotificationShow={true}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          // rightBackIcon={require("../../assets/images/Back.png")}
          // rightBackIconClick={() => props.navigation.goBack()}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => {
            setPageCountLibrary(1);
            arrayLibrary.length = 0;
            setIsImageFullScreen(false);
            setIsVideoFullScreen(false);
            removeEditMode();
            props.navigation.navigate("Notifications");
          }}
        />

        {isImageFullScreen || isVideoFullScreen ? (
          <ZoomView
            isaccessible={isaccess}
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
            <FlatList
              ref={flatListRef}
              data={
                isLibrary
                  ? distictLibraryArray(arrayLibrary)
                  : isSharedAlbum
                  ? distictShareAlbumArray(arrayAlbumShared)
                  : distictOwnAlbumArray(arrayAlbumOwn)
              }
              numColumns={2}
              renderItem={isLibrary ? renderLibraryList : renderAlbumList}
              ListHeaderComponent={renderHeader()}
              // ListFooterComponent={renderFooter()}
              extraData={
                isLibrary
                  ? distictLibraryArray(arrayLibrary)
                  : isSharedAlbum
                  ? distictShareAlbumArray(arrayAlbumShared)
                  : distictOwnAlbumArray(arrayAlbumOwn)
              }
              style={{ width: "100%" }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
              onEndReachedThreshold={0.01}
              onEndReached={({ distanceFromEnd }) => {
                loadMoreData();
              }}
              keyExtractor={(item, index) =>
                isLibrary
                  ? item.user_media_id
                  : isSharedAlbum
                  ? index
                  : item.album_id
              }
            />

            {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
          </>
        )}
      </View>
      <BottomBar {...props} />
    </>
  );
}