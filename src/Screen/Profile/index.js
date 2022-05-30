import * as React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
  Alert,
  BackHandler,
  Keyboard,
} from "react-native";
import { Headline, Avatar, Text, useTheme } from "react-native-paper";
import styles from "./style";
import { isValidDate } from "../../helpers/validations";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/core";
import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AuthContext from "../../context/AuthContext";
import ReactModal from "react-native-modal";
import Entypo from "react-native-vector-icons/Entypo";
import format from "date-fns/format";
import AppConstants from "../../Theme/AppConstant";
import { PermissionsAndroid } from "react-native";
import { updateProfile } from "../../Redux-api/actions/Auth";
const { height, width } = Dimensions.get("screen");
import { useSelector, useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default EditProfile = (props) => {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { setUserData } = React.useContext(AuthContext);
  var countBack = 0;

  const [userdetail, setUser] = React.useState({
    fullName:
      user && user.user_detail && user.user_detail.full_name
        ? user.user_detail.full_name
        : "",
    address:
      user && user.user_detail && user.user_detail.address
        ? user.user_detail.address
        : "",
    date_of_birth:
      user && user.user_detail && user.user_detail.date_of_birth
        ? user.user_detail.date_of_birth
        : "",
  });
  const [error, setError] = React.useState({
    fullNameErr: "",
    addressErr: "",
    dateOfBirthErr: "",
  });
  const [profile_imagePath, setProfile_imagePath] = React.useState(
    user && user.user_detail && user.user_detail.profile_image
      ? user.user_detail.profile_image
      : ""
  );
  const [options, setoptions] = React.useState([
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
  ]);
  const [formErr, setFormError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [meadiaUploadList, setMeadiaUploadList] = React.useState({
    filePath: "",
    fileDisplay: "",
    fileName: "",
    type: "",
    mediaType: "",
  });
  const [onopenmediaPicker, setonopenmediaPicker] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isApiCall, setIsApiCall] = React.useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    const unsubscribe = props.navigation.addListener("focus", () => {
      // Need to set profile image from user because once user select any image from phone gallery it will take default gallery path and in the update condition we are checking old and new value from the user value update
      setProfile_imagePath(
        user && user.user_detail && user.user_detail.profile_image
          ? user.user_detail.profile_image
          : ""
      );
    });
    requestReadStoragePermission();
    requestWriteStoragePermission();
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;

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

  const handleChange = (e) => {
    var len = e.length;
    if (
      (len === 2 && len > userdetail.date_of_birth.length) ||
      (len === 5 && len > userdetail.date_of_birth.length)
    ) {
      e = e + "-";
    }
    setUser({ ...userdetail, date_of_birth: e });
  };

  const submitForm = () => {
    // First check user update any information if not then redirect him back
    let isUpdateApiCall = false;
    let prevFullName =
      user && user.user_detail && user.user_detail.full_name
        ? user.user_detail.full_name
        : "";
    let prevAddress =
      user && user.user_detail && user.user_detail.address
        ? user.user_detail.address
        : "";
    let prevDob =
      user && user.user_detail && user.user_detail.date_of_birth
        ? user.user_detail.date_of_birth
        : "";
    let prevProfileImage =
      user && user.user_detail && user.user_detail.profile_image
        ? user.user_detail.profile_image
        : "";

    if (prevProfileImage !== profile_imagePath) {
      isUpdateApiCall = true;
    }
    if (!isUpdateApiCall && prevFullName !== userdetail.fullName) {
      isUpdateApiCall = true;
    }
    if (!isUpdateApiCall && prevAddress !== userdetail.address) {
      isUpdateApiCall = true;
    }
    if (!isUpdateApiCall && prevDob !== userdetail.date_of_birth) {
      isUpdateApiCall = true;
    }

    if (!isUpdateApiCall) {
      navigation.goBack();
      return;
    }
    // User updated any previous information then call api
    const validate = Validate(userdetail);

    setError(
      validate !== "ok"
        ? validate
        : {
            fullNameErr: "",
            addressErr: "",
            dateOfBirthErr: "",
          }
    );

    if (validate === "ok") {
      const params = new FormData();
      params.append("full_name", userdetail.fullName);
      params.append("sessid", user.sessid);
      params.append("address", userdetail.address);
      params.append("date_of_birth", userdetail.date_of_birth);

      params.append("profile_image", {
        name: Math.floor(new Date().getTime() / 1000) + ".png",
        type: "image/jpeg",
        uri: profile_imagePath
          ? profile_imagePath
          : "https://via.placeholder.com/150",
      });
      data.AuthReducer.isRequesting ? setLoading(false) : setLoading(false);
      setIsApiCall(true);
      dispatch(updateProfile(params));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setUser({ ...userdetail, date_of_birth: format(date, "dd-MM-yyyy") });
    hideDatePicker();
  };

  const closemediaPicker = () => {
    setonopenmediaPicker(false);
  };

  const openmediaPicker = () => {
    setonopenmediaPicker(true);
  };

  const ONopenmediaPicker = () => {
    return onopenmediaPicker == true ? (
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
            <Text style={[styles.choosefilestyle, { fontWeight: "bold" }]}>
              {AppConstants.constant.CHOOSE_FILE_TO_UPLOAD}
            </Text>
            <View style={styles.lineStyle}></View>
            <View
              style={{
                height: width * 0.25,
              }}
            >
              <FlatList
                style={[styles.renderMimetypeImagemainView]}
                data={options}
                renderItem={({ item, index }) => renderOptionsview(item, index)}
                bounces={false}
                showsVerticalScrollIndicator={false}
                listKey={(item, index) => "D" + index.toString()}
                keyExtractor={(item, index) => "D" + index.toString()}
              />
            </View>
          </View>
        </View>
      </ReactModal>
    ) : null;
  };

  const renderOptionsview = (item, index) => {
    return (
      <View style={{ marginTop: height * 0.002 }}>
        <TouchableWithoutFeedback onPress={() => onselectOptions(item)}>
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
        {index < 1 ? <View style={styles.lineStyle1}></View> : null}
      </View>
    );
  };

  const onselectOptions = (item) => {
    closemediaPicker(false);
    setTimeout(() => {
      if (item.title == AppConstants.constant.CAPTURE_IMAGE) {
        captureImage();
      } else if (
        item.title == AppConstants.constant.SELECT_PHOTO_FROM_LIBRARY
      ) {
        chooseMedia();
      }
    }, 1000);
  };

  const chooseMedia = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: "photo",
      width: 500,
      height: 500,
      forceJpg: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
      .then((response) => {
        setMeadiaUploadList({
          ...meadiaUploadList,
          filePath:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileDisplay:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileName: Math.floor(new Date().getTime() / 1000) + ".png",
          type: response.mime,
          mediaType: "image",
        });
        setProfile_imagePath(
          Platform.OS == "ios"
            ? response.path.replace("file://", "")
            : response.path
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const captureImage = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: "photo",
      width: 500,
      height: 500,
      forceJpg: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
      .then((response) => {
        setMeadiaUploadList({
          ...meadiaUploadList,
          filePath:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileDisplay:
            Platform.OS == "ios"
              ? response.path.replace("file://", "")
              : response.path,
          fileName: Math.floor(new Date().getTime() / 1000) + ".png",
          type: response.mime,
          mediaType: "image",
        });
        setProfile_imagePath(
          Platform.OS == "ios"
            ? response.path.replace("file://", "")
            : response.path
        );
        closemediaPicker(false);
      })
      .catch((e) => {
        if (e.message !== "User cancelled image selection") {
          if (Platform.OS === "ios") {
            Alert.alert(AppConstants.constant.ONLINE_FAMILY_VAULT, e.message, [
              { text: "OK", onPress: () => Linking.openSettings() },
              { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            ]);
          } else {
            console.log(e.message ? "ERROR" + e.message : "ERROR" + e);
          }
        } else {
          console.log(e.message);
        }
      });
  };

  const alertLogout = () => {
    Alert.alert("Alert", data.AuthReducer.data.message, [
      { text: "Ok", onPress: () => moveToLoginScreen() },
    ]);
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

  const setSuccsessmsg = (msg) => {
    navigation.goBack();
  };

  const setData = () => {
    if (
      data &&
      data.AuthReducer &&
      data.AuthReducer.data &&
      data.AuthReducer.data.responseCode
    ) {
      if (
        data.AuthReducer.data.responseCode === AppConstants.constant.SUCCESS
      ) {
        if (isApiCall) {
          setIsApiCall(false);
          let tempUser = user.user_detail;
          tempUser.profile_image = data.AuthReducer.data.data.user_detail
            .profile_image
            ? data.AuthReducer.data.data.user_detail.profile_image
            : "";
          tempUser.full_name = data.AuthReducer.data.data.user_detail.full_name
            ? data.AuthReducer.data.data.user_detail.full_name
            : "";
          tempUser.date_of_birth = data.AuthReducer.data.data.user_detail
            .date_of_birth
            ? data.AuthReducer.data.data.user_detail.date_of_birth
            : "";
          tempUser.address = data.AuthReducer.data.data.user_detail.address
            ? data.AuthReducer.data.data.user_detail.address
            : "";

          user.user_detail = tempUser;
          setUserData(user);
          if (data.AuthReducer.data.errorCode) {
            setSuccsessmsg(data.AuthReducer.data.message);
            data.AuthReducer.data.errorCode = ""; // repeated message will not show
          }
        } else {
        }
      }
    }
    if (
      data.HomeReducer &&
      data.HomeReducer.data &&
      data.HomeReducer.data.errorCode
    ) {
      if (
        data.HomeReducer.data.errorCode === AppConstants.constant.NOT_AUTHORIZED
      ) {
        alertLogout();
      }
    }
  };

  const checkResponseCode = () => {
    if (data.HomeReducer.data && data.HomeReducer.data.errorCode) {
      if (
        data.HomeReducer.data.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.PROFILE}
            errorCode={data.HomeReducer.data.errorCode}
            navigation={props.navigation}
          />
        );
      }
    }
    setData();
  };

  return (
    <>
      {checkResponseCode()}

      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          resizeMode="cover"
          source={require("../../assets/img/bgDark.png")}
        >
          <KeyboardAwareScrollView
            style={styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <Pressable onPress={() => Keyboard.dismiss()}>
              {ONopenmediaPicker()}
              <View style={styles.logoContainer}>
                <Image
                  style={styles.imageIcon}
                  resizeMode="cover"
                  source={require("../../assets/img/bgLight.png")}
                />
                <View style={styles.logo}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                    source={require("../../assets/img/logo.png")}
                  />
                </View>

                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.back}
                >
                  <Image
                    style={
                      Platform.OS === "android"
                        ? { height: 26, width: 26 }
                        : { height: 28, width: 28, marginTop: 22 }
                    }
                    resizeMode="cover"
                    source={require("../../assets/icons/back.png")}
                  />
                </Pressable>
              </View>

              <ImageBackground
                style={styles.inputViewImage}
                resizeMode="cover"
                imageStyle={{
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}
                source={require("../../assets/img/bgDark.png")}
              >
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    height: width * 0.28,
                    width: width * 0.28,
                    borderRadius: (width * 0.28) / 2,
                    marginTop: -height * 0.055,
                  }}
                >
                  {profile_imagePath ? (
                    <FastImage
                      style={{
                        height: width * 0.28,
                        width: width * 0.28,
                        borderRadius: (width * 0.28) / 2,
                      }}
                      source={{ uri: profile_imagePath }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <Avatar.Icon icon="account" size={100} />
                  )}
                  <TouchableOpacity
                    style={{
                      height: width * 0.075,
                      width: width * 0.075,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: (width * 0.1) / 2,
                      left: 33,
                      marginTop: -height * 0.038,
                      backgroundColor: "white",
                    }}
                    onPress={() => openmediaPicker()}
                  >
                    <Entypo
                      name="edit"
                      size={width * 0.04}
                      color={"red"}
                      style={{ alignSelf: "center" }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.titleView}>
                  <Headline style={styles.titleStyle}>
                    Hi,
                    {" " + userdetail && userdetail.fullName
                      ? userdetail.full_name
                      : ""}
                  </Headline>
                </View>

                <View style={styles.inputView}>
                  <TextInputView
                    icon={require("../../assets/icons/fullName.png")}
                    placeholder="Full Name"
                    value={userdetail.fullName}
                    error={error.fullNameErr}
                    onChangeText={(e) =>
                      setUser({ ...userdetail, fullName: e })
                    }
                  />
                  <TextInputView
                    keyboardType="number-pad"
                    icon={require("../../assets/icons/date.png")}
                    placeholder="Date Of Birth in dd-mm-yyyy"
                    value={userdetail.date_of_birth}
                    error={error.dateOfBirthErr}
                    maxLength={10}
                    onChangeText={(e) => handleChange(e)}
                    isright={require("../../assets/icons/date.png")}
                    onRightPress={showDatePicker}
                  />

                  <TextInputView
                    icon={require("../../assets/icons/address.png")}
                    placeholder="Address"
                    value={userdetail.address}
                    error={error.addressErr}
                    onChangeText={(e) => setUser({ ...userdetail, address: e })}
                  />

                  {formErr ? (
                    <Text
                      style={[styles.error, { color: theme.colors.accent }]}
                    >
                      {formErr}
                    </Text>
                  ) : null}

                  <Button color="#FFF" onPress={submitForm}>
                    Update
                  </Button>
                </View>
              </ImageBackground>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={
                  userdetail.date_of_birth != ""
                    ? moment(userdetail.date_of_birth, "DD-MM-YYYY").toDate()
                    : new Date()
                }
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              {loading || data.AuthReducer.isRequesting ? <Spinner /> : null}
            </Pressable>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

function Validate({ fullName, address, date_of_birth, password }) {
  let fullNameErr = "";
  let addressErr = "";
  let dateOfBirthErr = "";

  if (fullName.trim() === "") {
    fullNameErr = "Full name cannot be empty";
  }

  if (address.trim() === "") {
    addressErr = "Address cannot be empty";
  }

  if (date_of_birth.trim() === "") {
    dateOfBirthErr = "Date of birth cannot be empty";
  } else if (date_of_birth.trim().length < 10) {
    dateOfBirthErr = "Invalid Date of birth";
  } else if (!isValidDate(date_of_birth)) {
    dateOfBirthErr = "Invalid Date of birth";
  }

  if (fullNameErr === "" && addressErr === "" && dateOfBirthErr === "") {
    return "ok";
  } else {
    return {
      fullNameErr,
      addressErr,
      dateOfBirthErr,
    };
  }
}
