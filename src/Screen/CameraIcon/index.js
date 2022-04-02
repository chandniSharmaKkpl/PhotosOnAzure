import React, { useState, useRef, useTheme, useCallback } from "react";
import {
  StatusBar,
  Alert,
  ScrollView,
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  BackHandler,
} from "react-native";
import RNFS from "react-native-fs";
import styles from "./style";
import VideoCard from "../../Component/VideoCard";
import { Header } from "../../Component/Header";
import { AppImages, AppColor } from "../../Theme";
import ReactModal from "react-native-modal";
import * as globals from "../../Utils/globals";
import ImagePicker from "react-native-image-crop-picker";
import ImagePickerVideo from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import Spinner from "../../Component/auth/Spinner";
import { uploadMedia } from "../../Redux-api/actions/Home";
import AuthContext from "../../context/AuthContext";
import MediaContext from "../../context/MediaContext";
import AppConstants from "../../Theme/AppConstant";
import CameraRoll from "@react-native-community/cameraroll";
import { useSelector, useDispatch } from "react-redux";
import { notifyMessage } from "../../Component/AlertView";

export const CameraIcon = (props) => {
  var countBack = 0;
  const { user } = React.useContext(AuthContext);
  const { setMediaData } = React.useContext(MediaContext);
  const flatListRef = useRef();
  const dispatch = useDispatch();
  let videosnotallow;
  const data = useSelector((state) => state);
  let [onopenmediaPicker, setonopenmediaPicker] = useState(false);
  const [arrayLibraryLocalData, setArrayLibraryLocalData] = React.useState([]); // Local data which need to be save on server and home screen
  const [addtoAlbum, setaddtoAlbum] = React.useState([]); // data choose & capture from device save in albumdetails screen
  let [meadiaUploadList, setmeadiaUploadList] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [loading, setLoading] = React.useState(false);
  let [mediaoption, setmediaoption] = useState([
    {
      image: require("../../assets/Swipe.png"),
      title: AppConstants.constant.CAPTURE_IMAGE,
      id: 0,
    },
    {
      image: require("../../assets/Swipe.png"),
      title: AppConstants.constant.SELECT_PHOTO_FROM_LIBRARY,
      id: 1,
    },
    {
      image: require("../../assets/Swipe.png"),
      title: AppConstants.constant.CAPTURE_VIDEO,
      id: 2,
    },
  ]);
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const onopen = props.navigation.addListener("focus", () => {
      setonopenmediaPicker(true);
      setmeadiaUploadList([]);
    });
    {
      Platform.OS == "android" ? askPermission() : null;
    }
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      onopen;
    };
  }, [props.navigation]);

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;

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
      props.navigation.navigate("HomeStack");
    }
    return true;
  };

  //ASK RUNTIME ANDROID PERMISSION FOR HIGHER OS
  const askPermission = () => {
    requestReadStoragePermission();
    requestWriteStoragePermission();
  };

  // ANDROID READ STORAGE PERMISSION
  const requestReadStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // ANDROID WRITE STORAGE PERMISSION
  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
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

  // CLOSE MEDIA PICKER WHEN IMG/VID IS CAPTURED OR SELECTED
  const closemediaPicker = () => {
    setonopenmediaPicker(false);
    if (meadiaUploadList.length > 0) {
    } else {
      props.navigation.navigate("HomeStack");
    }
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

  // MEDIA CHOOSE POPUP
  const onselectMedia = (item) => {
    setonopenmediaPicker(false);
    setTimeout(() => {
      if (item.title == AppConstants.constant.CAPTURE_IMAGE) {
        captureImage();
      } else if (
        item.title == AppConstants.constant.SELECT_PHOTO_FROM_LIBRARY
      ) {
        chooseMedia();
      } else if (item.title == AppConstants.constant.CAPTURE_VIDEO) {
        captureVideo();
      }
    }, 1000);
  };

  // CAPTURE IMG FROM DEVICE
  const captureImage = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: "photo",
      //compressImageQuality: 0.3,
      height: 300,
      width: 300,
    })
      .then((response) => {
        console.log("captureImage response => ", response);
        if (
          data.HomeReducer &&
          data.HomeReducer.userSpace &&
          data.HomeReducer.userSpace.own_space
        ) {
          var currentTotalUsedBytes =
            data.HomeReducer.userSpace.own_space.own_space_used_total_bytes +
            response.size;

          if (
            currentTotalUsedBytes >
            data.HomeReducer.userSpace.own_space.own_space_total_bytes
          ) {
            showUpgradeAlert();
            return;
          }
        }

        let selectedCaptureimgs = [];
        let sendselectedCaptureimgs = [];
        let sendcaptureimgdatatoalbumimgs = [];
        let fileNameTemp = "";
        if (Platform.OS === "ios") {
          fileNameTemp = response.filename;
        } else {
          fileNameTemp = generateRandomFileName();
        }

        let captureimgdata = {
          filePath: response.path,
          fileDisplay: response.path,
          fileName: fileNameTemp,
          type: response.mime,
          mediaType: "image",
          pathString:
          Platform.OS === "android" ? response.path : response.sourceURL,
        };
        let sendcaptureimgdatatoalbum = {
          file_name: fileNameTemp,
          file_type: response.mime,
          is_success: true,
          size: response.size,
          album_id: 0,
          uri: Platform.OS === "android" ? response.path : response.sourceURL,
          user_media_id: Math.random(),
        };
        console.log("sendcaptureimgdatatoalbum push =>", sendcaptureimgdatatoalbum);
        let sendcaptureimgdata = response;
        sendcaptureimgdatatoalbumimgs.push(sendcaptureimgdatatoalbum);
        sendselectedCaptureimgs.push(sendcaptureimgdata);
        selectedCaptureimgs.push(captureimgdata);
        setArrayLibraryLocalData(sendselectedCaptureimgs);
        setmeadiaUploadList(selectedCaptureimgs);
        setaddtoAlbum(sendcaptureimgdatatoalbumimgs);
      })
      .catch((e) => {
        if (e.message !== "User cancelled image selection ") {
          if (Platform.OS === "ios") {
            Alert.alert(globals.appName, e.message, [
              { text: "Ok", onPress: () => Linking.openSettings() },
              {
                text: "Cancel",
                onPress: () => {
                  closemediaPicker();
                },
              },
            ]);
          } else {
            closemediaPicker();
            console.log(e.message ? "ERROR" + e.message : "ERROR" + e);
          }
        } else {
          closemediaPicker();
        }
      });
  };

  // CHOSSE IMG/VID FROM GALLRY
  const chooseMedia = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5,
    })
      .then((response) => {
        // User can select only 5 media in a single time in iOS it is managed by property in android we are checking by counting
        if (
          response &&
          response.length > AppConstants.constant.MAX_SELECTION_QTY
        ) {
          notifyMessage(AppConstants.constant.YOU_CAN_SELECT_MAX_FIVE_MEDIA);
          chooseMedia();
          return;
        }
        let tempMediaspce = 0;
        let tempData = [];
        let sendtempData = [];
        let sendtemDatatoAlbum = [];
        response.map((data1) => {
          tempMediaspce = tempMediaspce + data1.size;
          // adding selected image size in the already used space of the user and find out actual used space \\
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
            userOwnSpace.own_space.own_space_used_total_bytes + tempMediaspce;
          if (
            currentTotalUsedBytes > userOwnSpace.own_space.own_space_total_bytes
          ) {
            showUpgradeAlert();
            return;
          }

          let dictImageToShow = {};
          let dictImageToSend = {};
          let dictImageToSendAlbum = {};

          let fileNameTemp = "";
          if (Platform.OS === "ios") {
            fileNameTemp = data1.filename;
          } else {
            fileNameTemp = generateRandomFileName();
          }
          dictImageToSend = data1;
          dictImageToShow = {
            filePath: data1.path,
            fileDisplay: data1.path,
            fileName: fileNameTemp,
            type: data1.mime,
            mediaType: data1.mime.includes("image") ? "image" : "video",
            pathString:
              Platform.OS === "android" ? JSON.stringify(data1.path) : "",
          };
          dictImageToSendAlbum = {
            file_name: fileNameTemp,
            file_type: data1.mime,
            is_success: true,
            size: data1.size,
            album_id: 0,
            uri: Platform.OS === "android" ? data1.path : data1.sourceURL,
            user_media_id: Math.random(),
          };
          tempData.push(dictImageToShow);
          sendtempData.push(dictImageToSend);
          sendtemDatatoAlbum.push(dictImageToSendAlbum);
        });

        setmeadiaUploadList(tempData);

        setArrayLibraryLocalData(sendtempData);
        setaddtoAlbum(sendtemDatatoAlbum);
      })
      .catch((e) => {
        console.log("***********--->", e.message);
        closemediaPicker();
      });
  };

  // CAPTURE VID FROM DEVICE
  const captureVideo = () => {
    const options = {
      mediaType: "video",
      height: 300,
      width: 300,
      videoQuality: Platform.OS == "android" ? "law" : "medium",
    };
    ImagePickerVideo.launchCamera(options, (response) => {
      let capturevideo = [];
      let sendcapturevideo = [];
      let sendcapturevideotoalbum = [];

      let fileNameTemp = "";
      if (!response.didCancel && !response.error) {
        console.log("captureVideo ==> ",JSON.stringify(response,null,4));
        var currentTotalUsedBytes =
          data.HomeReducer.userSpace.own_space.own_space_used_total_bytes +
          response.size;
        if (
          currentTotalUsedBytes >
          data.HomeReducer.userSpace.own_space.own_space_total_bytes
        ) {
          showUpgradeAlert();
          return;
        }

        if (Platform.OS === "ios") {
          fileNameTemp = response.filename;
        } else {
          fileNameTemp = generateRandomFileName();
        }

        let videodata = {
          filePath: response.path,
          fileDisplay: response.path,
          fileName: fileNameTemp,
          type: "video/mp4",
          mediaType: "video",
          pathString:
            Platform.OS === "android" ? response.path : response.sourceURL,
        };
        let sendcaptureviddata = response;
        let sendcaptureviddataAlbum = {
          file_name: fileNameTemp,
          file_type: "video/mp4",
          is_success: true,
          size: response?.size,
          album_id: 0,
          uri: Platform.OS === "android" ? "file://" +response.path : response.sourceURL,
          user_media_id: Math.random(),
        };
        capturevideo.push(videodata);
        sendcapturevideo.push(sendcaptureviddata);
        sendcapturevideotoalbum.push(sendcaptureviddataAlbum);
        setmeadiaUploadList(capturevideo);
        setArrayLibraryLocalData(sendcapturevideo);
        setaddtoAlbum(sendcapturevideotoalbum);
      }
    });
  };

  // RENDER FLATLIST OF MEDIA OPTION'S
  const renderMediaview = (item, index) => {
    return (
      <View style={{ marginTop: globals.screenHeight * 0.002 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!checkUserAvailableSpace()) {
              return;
            }
            onselectMedia(item);
          }}
        >
          <View style={styles.viewPopupStyle}>
            {item.title == AppConstants.constant.CAPTURE_IMAGE ? (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={require("../../assets/camera.png")}
              ></Image>
            ) : (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                source={require("../../assets/gallery.png")}
              ></Image>
            )}
            <Text style={styles.textStylePopup}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        {index < 2 ? <View style={styles.lineStyle1}></View> : null}
      </View>
    );
  };

  // RENDER FLATLIST OF SELECTED / CAPTURED MEDIA
  const renderList = ({ item, index }) => {
    console.log("item.filepath =>", item.filePath);
    return (
      <View style={[styles.cellView, { backgroundColor: "#0E365D" }]}>
        {item.mediaType.includes("video") ? (
          <View style={styles.video}>
            <VideoCard videoUrl={item.filePath} volume={0} />
          </View>
        ) : (
          <View style={styles.imageView}>
            <FastImage
              style={styles.image}
              source={{
                uri: item.filePath,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
      </View>
    );
  };

  // YOU CAN SAVE MEDIA ON YOUR LOCAL DEVICE
  const setmediaonDevice = (meadiaUploadList) => {
    var AttachmentLists = meadiaUploadList;
    let dataSaveFlag = [];
    let isImageSaveToCamera = false;

    var promises = AttachmentLists.map(
      (item, m) =>
        new Promise((resolve, reject) => {
          try {
            var SelectedImg = AttachmentLists[m].filePath;
            var SelectedImgName = AttachmentLists[m].fileName;
            var isitImage = AttachmentLists[m].mediaType;
            let albumName = globals.appName;
            if (isitImage.includes("video")) {
              albumName = albumName + "- video";
            } else {
              albumName = albumName + "- image";
            }
            CameraRoll.save(SelectedImg, {
              type: "auto",
              album: albumName,
            })
              .then(() => {
                isImageSaveToCamera = true;
                setLoading(false);
                dataSaveFlag.push(1);
                resolve(dataSaveFlag);
              })
              .catch((err) => {
                setLoading(false);
                resolve(null);
              });
          } catch (error) {
            console.log(error);
            resolve(null); // so one failure doesn't stop the whole process
          }
        })
    );
    //need to call this function after loop is done
    Promise.all(promises).then(() => {
      if (dataSaveFlag.length === meadiaUploadList.length) {
        Alert.alert(globals.appName, "Media stored successfully.", [
          { text: "Ok", onPress: () => makeAPIcallofLib() },
        ]);
      } else {
        Alert.alert(
          "Something went wrong. Please check your storage permission."
        );
      }
    });
  };

  const setmediaonDevice1 = (meadiaUploadList) => {
    let dataSaveFlag = [];
    var AttachmentLists = meadiaUploadList;

    let isImageSaveToCamera = false;
    for (let m = 0; m < AttachmentLists.length; m++) {
      var SelectedImg = AttachmentLists[m].filePath;
      var SelectedImgName = AttachmentLists[m].fileName;
      var isitImage = AttachmentLists[m].mediaType;

      let albumName = globals.appName;
      if (isitImage.includes("video")) {
        albumName = albumName + "- video";
      } else {
        albumName = albumName + "- image";
      }
      CameraRoll.save(SelectedImg, {
        type: "auto",
        album: albumName,
      })
        .then(() => {
          isImageSaveToCamera = true;
          setLoading(false);
          dataSaveFlag.push(1);
          Alert.alert(globals.appName, "Media stored successfully.", [
            { text: "Ok", onPress: () => makeAPIcallofLib() },
          ]);
        })
        .catch((err) => {
          setLoading(false);

          Alert.alert(
            "Something went wrong. Please check your storage permission."
          );
        });
    }
    //console.log(" data save flag ===", dataSaveFlag);
    // if (dataSaveFlag.length === meadiaUploadList.length) {
    //   Alert.alert(globals.appName, "Media stored successfully.", [
    //     { text: "Ok", onPress: () => makeAPIcallofLib() },
    //   ]);
    // } else {
    //   Alert.alert(
    //     "Something went wrong. Please check your storage permission."
    //   );
    // }
  };

  /// FOR ADD IMAGES TO LIBRARY IN DASHBOARD
  const makeAPIcallofLib = () => {
    setMediaData(arrayLibraryLocalData);
    // props.navigation.goBack();
    props.navigation.navigate("HomeStack");
    setLoading(false);
  };

  // SAVE MEDIA ON DEVICE BEFORE CHECK SELECTED / CAPTURED MEDIA LIST AND ADD LOADER
  const saveMediatoPhone = (meadiaUploadList) => {
    setLoading(true);
    if (arrayLibraryLocalData.length > 0) {
      /// FOR ADD IMAGES TO LOCAL DEVICE
      setmediaonDevice(meadiaUploadList);
    } else {
      notifyMessage(AppConstants.constant.ALBUM_IMAGE_VALIDATION);
      return;
    }
  };

  // SAVE MEDIA TO ALBUM BEFORE CHECK SELECTED / CAPTURED MEDIA LIST AND ADD LOADER
  const saveMediatoAlbum = () => {
    setLoading(true);
    console.log(arrayLibraryLocalData.length);
    if (arrayLibraryLocalData.length > 0) {
      /// FOR ADD IMAGES TO LOCAL DEVICE
      setmediaonAlbum();
    } else {
      notifyMessage(AppConstants.constant.ALBUM_IMAGE_VALIDATION);
      return;
    }
  };

  const setmediaonAlbum = () => {
    props.navigation.navigate("AddNewAlbum", {
      totalOwnAlbumspace: 0,
      uploadMediadatas: addtoAlbum,
      itisfrom: "camera",
      onReturn: () => {
        // refreshAlbumList(data);
        setonopenmediaPicker(false);
      },
    });
    setLoading(false);
  };

  const distictMediaArray = (data) => {
    // if (Platform.OS === 'android') {

    //   const distinctArray = [
    //     ...new Map(data.map((x) => [x["pathString"], x])).values(),
    //   ];
    //   return data;
    // }else
    {
      const distinctArray = [
        ...new Map(data.map((x) => [x["fileName"], x])).values(),
      ];
      return distinctArray;
    }
  };
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <View style={{ flex: 1, backgroundColor: "#f0f4f9" }}>
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          rightBackIcon={require("../../assets/images/Back.png")}
          rightBackIconClick={() => {
            // props.navigation.goBack()
            props.navigation.navigate("HomeStack");
          }}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => props.navigation.navigate("Notifications")}
        />
        <View style={{ flex: 1 }}>
          {meadiaUploadList.length === 0 ? (
            <Text style={styles.textEmpty}>
              Your selected Photo/ Video will display here ...
            </Text>
          ) : null}

          {onopenmediaPicker == true ? (
            <ReactModal
              backdropColor="rgba(52, 52, 52, 0.8)"
              backdropOpacity={1}
              transparent={true}
              animationType="slide"
              transparent={true}
              isVisible={onopenmediaPicker}
              onRequestClose={() => {
                closemediaPicker(false);
              }}
              onBackdropPress={() => {
                closemediaPicker(false);
              }}
            >
              <View style={styles.modalmediaopen}>
                <View style={styles.titleviewstyle}>
                  <Text
                    style={[styles.choosefilestyle, { fontWeight: "bold" }]}
                  >
                    {"Choose File To Upload"}
                  </Text>
                  <View style={styles.lineStyle}></View>
                  <View
                    style={{
                      height: globals.screenWidth * 0.42,
                    }}
                  >
                    <FlatList
                      style={[styles.renderMimetypeImagemainView]}
                      data={mediaoption}
                      renderItem={({ item, index }) =>
                        renderMediaview(item, index)
                      }
                      bounces={false}
                      showsVerticalScrollIndicator={false}
                      listKey={(item, index) => "D" + index.toString()}
                      keyExtractor={(item, index) => "D" + index.toString()}
                    />
                  </View>
                </View>
              </View>
            </ReactModal>
          ) : null}

          {meadiaUploadList.length > 0 ? (
            <>
              <View style={{ flex: 1 }}>
                <FlatList
                  ref={flatListRef}
                  data={distictMediaArray(meadiaUploadList)}
                  numColumns={2}
                  renderItem={renderList}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ padding: 20 }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={styles.album}>
                <TouchableOpacity
                  onPress={() => {
                    if (!checkUserAvailableSpace()) {
                      return;
                    }
                    saveMediatoPhone(meadiaUploadList);
                  }}
                  style={styles.invitecontactbuttonview}
                >
                  <Text style={[styles.invitecontactbuttontext]}>
                    {"Save to phone"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (!checkUserAvailableSpace()) {
                      return;
                    }
                    saveMediatoAlbum();
                  }}
                  style={styles.invitecontactbuttonview}
                >
                  <Text style={[styles.invitecontactbuttontext]}>
                    {"Save to album"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
      {loading ? <Spinner /> : null}
    </>
  );
};
