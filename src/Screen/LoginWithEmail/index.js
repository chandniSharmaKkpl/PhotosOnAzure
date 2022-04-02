import * as React from "react";
import { useState, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  BackHandler,
  Keyboard,
  TextInput,
} from "react-native";
import * as globals from "../../Utils/globals";
import { Headline, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import AuthContext from "../../context/AuthContext";
import { Axios } from "../../helpers/Axios";
import PushControllerTemp from "../../Component/PushControllerTemp";
import AppConstants from "../../Theme/AppConstant";
import IconFontiso from "react-native-vector-icons/Fontisto";
import IconEntypo from "react-native-vector-icons/Entypo";
import { getCurrentUser, setCurrentUser } from "../../database/localDB";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Redux-api/actions/LoginActions";
import { isEmailValid, isMobileNumberValid } from "../../helpers/validations";
import { notifyMessage } from "../../Component/AlertView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const LoginWithEmail = (props) => {
  //var isClickEye = false;
  const [isClickEye, setIsClickEye] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.

  const responseData = useSelector((state) => state.LoginReducer);

  const { user } = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const { setUserData } = React.useContext(AuthContext);

  const [userTemp, setUserTemp] = React.useState({
    // email: "pratik@mailinator.com",
    // password: "Test@1234",

    email: "winofv1@mailinator.com",
    password: "Test@1234 ",

    // email: "poojakumari.aelius@mailnator.com",
    // password: "Pooja@2021 ",

    email: "test2@yopmail.com",
      password: "Test@123",

      // email: "",
      // password: "",
  });

  const [error, setError] = React.useState({
    emailErr: "",
    passwordErr: "",
  });

  const [formErr, setFormError] = React.useState("");

  const [checked, setChecked] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isUserAvailable = false;
    // Check if user is available in local db then redirect him to the drawer view
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const userPromise = getCurrentUser();
    if (userPromise) {
      Promise.resolve(userPromise).then((currentUser) => {
        if (currentUser) {
          isUserAvailable = true;
          setUserData(currentUser);
          navigation.navigate("DrawerStack");
        }
      });
    }
    // Whenever coming on this view need to clean complete data of this view.
    const unsubscribe = props.navigation.addListener("focus", () => {
      setError({ emailErr: "", passwordErr: "" });
      if (!isUserAvailable) {
        setUserTemp({ email: "", password: "" });
      }
      setFormError("");
    });

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);

  const handleBackButtonClick = () => {
    {
      Alert.alert(
        "Exit App",
        "Do you want to exit the application?",
        [
          {
            text: "Cancel",
            onPress: () => (countBack = 0),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
    return true;
  };
  const submitForm = () => {
    const validate = Validate(userTemp);
    setError(
      validate !== "ok"
        ? validate
        : {
            emailErr: "",
            passwordErr: "",
          }
    );

    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setLoading(true);
        let dict = {
          email: userTemp.email,
          password: userTemp.password,
          device_uuid: deviceInfo.device_uuid ? deviceInfo.device_uuid : "",
          device_token: deviceInfo.device_token ? deviceInfo.device_token : "",
          device_type: deviceInfo.device_type ? deviceInfo.device_type : "",
          device_name: deviceInfo.device_name ? deviceInfo.device_name : "",
        };
        console.log("param", dict);
        dispatch(loginUser(dict));
      } else {
        notifyMessage(globals.noInternet);
      }
    }
  };
  // Getting device info from push controller
  const getDeviceInfo = (value) => {
    setDeviceInfo(value);
  };

  const checkRememberMe = async () => {
    setChecked(!checked);
  };

  const setLoggedInUserInLocalDB = (data) => {
    if (checked) {
      if (data) {
        if (setCurrentUser(data)) {
        }
      }
    }
  };
  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const checkResponseCode = (responseData) => {
    if (responseData.loginResponse && responseData.loginResponse.errorCode) {
      let response = responseData.loginResponse;
      if (response.responseCode) {
        if (
          response.errorCode === AppConstants.constant.VERIFY_EMAIL_BEFORE_LOGIN
        ) {
          responseData.loginResponse.errorCode = "";
          setLoading(false);
          notifyMessage(
            response.message
              ? response.message
              : AppConstants.constant.YOUR_VERIFICATION_IS_REMAINING
          );
          return;
        }
 
        if (response.errorCode === "verify_before_login") {
          setLoading(false);
          navigation.navigate("VerificationNew", {
            sessionId: response.data.sessid,
            phoneNumber: response.data.phone ? response.data.phone:'', // response.data.user_detail.phone,
            userData: response.data.user_detail? response.data.user_detail:'',
            isRememberMe: checked,
          });

          responseData.loginResponse.errorCode = "";
        } else if (responseData.loginResponse.errorCode === "init_success") {
          // set loggedin user data
          setUserData(response.data);
          setLoggedInUserInLocalDB(response.data); // For remember me functionality.
          responseData.loginResponse.errorCode = "";
          navigation.navigate("DrawerStack");
        }
      } else {
        if (
          responseData.loginResponse &&
          responseData.loginResponse.errorCode &&
          responseData.loginResponse.errorCode === "login_fail"
        ) {
          let temp = responseData.loginResponse;
          temp.errorCode = "";
          responseData.loginResponse = temp;
          setLoading(false);
          notifyMessage(responseData.loginResponse.message);
        }

        //setFormError(response.message);
      }
    }
  };

  return (
    <>
      {checkResponseCode(responseData)}
      <View style={styles.logoContainer}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <Image
            style={styles.imageIcon}
            resizeMode="cover"
            source={require("../../assets/img/bgLight.png")}
          />
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/img/logo.png")}
          />
        </Pressable>
      </View>

      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        source={require("../../assets/img/bgDark.png")}
      >
        <KeyboardAwareScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Pressable onPress={() => Keyboard.dismiss()}>
            <View style={styles.titleView}>
              <Headline style={styles.titleStyle}>Welcome</Headline>
            </View>

            <View style={styles.inputView}>
              <TextInputView
                keyboardType="email-address"
                placeholder="Enter Email Address"
                value={userTemp.email}
                error={error.emailErr}
                onChangeText={(e) => setUserTemp({ ...userTemp, email: e })}
                icon={require("../../assets/Email2.png")}
              />

              {isClickEye ? (
                <TextInputView
                  secureTextEntry={false}
                  placeholder="Enter Password"
                  value={userTemp.password}
                  error={error.passwordErr}
                  onChangeText={(e) =>
                    setUserTemp({ ...userTemp, password: e })
                  }
                  icon={require("../../assets/icons/password.png")}
                  isClickEye={isClickEye}
                  onPressRight={onPressRight}
                  right={true}
                />
              ) : (
                <TextInputView
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  value={userTemp.password}
                  error={error.passwordErr}
                  onChangeText={(e) =>
                    setUserTemp({ ...userTemp, password: e })
                  }
                  icon={require("../../assets/icons/password.png")}
                  isClickEye={isClickEye}
                  onPressRight={onPressRight}
                  right={true}
                />
              )}

              {formErr ? (
                <Text style={[styles.error, { color: theme.colors.accent }]}>
                  {formErr}
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 40,
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={styles.rememberMe}
                  onPress={() => checkRememberMe()}
                >
                  <Image
                    style={styles.rememberIcon}
                    resizeMode="contain"
                    source={
                      checked
                        ? require("../../assets/img/rememberChecked.png")
                        : require("../../assets/img/rememberUnChecked.png")
                    }
                  />
                  <Text style={styles.rememberMeText}>Remember Me</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.dontHaveAccount}>Forgot Password?</Text>
                </Pressable>
              </View>

              <Button onPress={submitForm} color="#FFF">
                Login
              </Button>
            </View>

            <View style={styles.loginButtonView}>
              <Text style={styles.dontHaveAccount}>
                Don&apos;t Have an Account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text
                  style={[
                    styles.createNewAccountText,
                    { color: theme.colors.accent },
                  ]}
                >
                  Create New Account
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {loading ? <Spinner /> : null}

      <PushControllerTemp getDeviceInfo={getDeviceInfo} />
    </>
  );
};
function Validate({ email, password }) {
  let emailErr = "";
  let passwordErr = "";

  if (email.trim() === "") {
    emailErr = "Email cannot be empty";
  } else if (!isEmailValid(email)) {
    emailErr = "Email is not correct";
  }

  if (password.trim() === "") {
    passwordErr = "Password cannot be empty";
  }

  if (emailErr === "" && passwordErr === "") {
    return "ok";
  } else {
    return {
      emailErr,
      passwordErr,
    };
  }
}

const styles = StyleSheet.create({
  tokenStyle: {
    backgroundColor: "rgba(254, 182,8,0.7)",
    textAlign: "center",
    marginTop: "15%",
    marginBottom: "2%",
    padding: "5%",
    // fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    height: 90,
    width: "100%",
    marginVertical: 20,
  },
  imageIcon: {
    height: 200,
    width: "100%",
    position: "absolute",
  },
  inputViewImage: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    paddingTop: 20,
  },
  titleView: {
    margin: 20,
  },
  titleStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 30,
  },
  inputView: {
    flex: 1,
    paddingHorizontal: 20,
   // backgroundColor:'orange'
  },
  resetPasswordView: {
    marginTop: 10,
    justifyContent: "flex-end",
  },
  rememberIcon: {
    height: 16,
    width: 16,
    alignSelf: "center",
  },
  loginButtonView: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loginBtnStyles: {
    height: 50,
    justifyContent: "center",
    marginTop: 50,
    width: "80%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  rememberMe: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  rememberMeText: {
    color: "#FFF",
    paddingLeft: 10,
  },
  dontHaveAccount: {
    color: "#FFF",
    fontSize: 14,
  },
  createNewAccountText: {
    fontSize: 18,
    marginTop: 10,
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
});
