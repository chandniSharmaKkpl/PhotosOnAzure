import * as React from "react";

import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  BackHandler,
} from "react-native";
import * as globals from "../../Utils/globals";

import {
  Headline,
  IconButton,
  Subheading,
  Text,
  Title,
  useTheme,
} from "react-native-paper";

import { useRoute, useNavigation } from "@react-navigation/core";

import OtpBox from "../../Component/auth/OtpBox";
import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import * as RNLocalize from "react-native-localize";

import AuthContext from "../../context/AuthContext";

import { Axios } from "../../helpers/Axios";
import { AppConstant } from "../../Theme";
import { notifyMessage } from "../../Component/AlertView";

export const Verification = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { setUserData } = React.useContext(AuthContext);

  const [otpVal, setOtpVal] = React.useState("");

  const [formErr, setFormError] = React.useState("");

  const [phoneNo, setPhoneNo] = React.useState(route.params.phoneNumber);
  const [editMode, setEditMode] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let currentCountry = RNLocalize.getCountry();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    if (!editMode && phoneNo !== route.params.phoneNumber) {
      const validate = Validate({ phoneNumber: phoneNo });

      setFormError(validate !== "ok" ? validate.phoneNumberErr : "");

      if (validate === "ok") {
        if (globals.isInternetConnected == true) {
          Axios(
            "POST",
            "updatemobile",
            {
              sessid: route.params.sessionId,
              phone:
                currentCountry === AppConstant.constant.INDIA
                  ? phoneNo
                  : phoneNo.length === 10
                  ? phoneNo.replace(phoneNo.charAt(0), "61")
                  : phoneNo,
            },
            () => {}
          );
        } else {
          notifyMessage(globals.noInternet);
        }
      }
    }
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [editMode, route.params.sessionId]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const submitForm = () => {
    setEditMode(false);

    const validate = Validate({ phoneNumber: phoneNo });

    setFormError(validate !== "ok" ? validate.phoneNumberErr : "");

    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setLoading(true);
        Axios(
          "POST",
          "verifyOTP",
          {
            sessid: route.params.sessionId,
            verification_code: otpVal,
          },
          (res) => {
            if (res && res.data && res.data.responseCode) {
              if (res.data.data) {
                res.data.data.conf_key = route.params.userData.conf_key;
                // Getting container name also in response and pass it to the next view,
                setUserData(res.data.data);
                if (route.params.isRememberMe) {
                  setLoggedInUserInLocalDB(res.data.data); // For remember me functionality.
                }
              } else {
                // If not getting user info means user needs to change his registration information.
                navigation.goBack();
              }

              navigation.navigate("DrawerStack");
            } else {
              setFormError(res.data.message);
            }
          }
        )
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      } else {
        notifyMessage(globals.noInternet);
      }
    }
  };
  const setLoggedInUserInLocalDB = (data) => {
    if (data) {
      if (setCurrentUser(data)) {
      } else {
      }
    }
  };

  const resendOtp = () => {
    {
      const validate = Validate({ phoneNumber: phoneNo });

      setFormError(validate !== "ok" ? validate.phoneNumberErr : "");

      let currentCountry = RNLocalize.getCountry();

      if (validate === "ok") {
        if (globals.isInternetConnected == true) {
          setLoading(true);
          Axios(
            "POST",
            "updatemobile",
            {
              sessid: route.params.sessionId,
              phone:
                currentCountry === AppConstant.constant.INDIA
                  ? phoneNo
                  : phoneNo.length === 10
                  ? phoneNo.replace(phoneNo.charAt(0), "61")
                  : phoneNo,
            },
            (res) => {
              if (res && res.data && res.data.responseCode) {
                setFormError("OTP resent successful");
              } else {
                setFormError(res.data.message);
              }
            }
          )
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
        } else {
          notifyMessage(globals.noInternet);
        }
      }
    }
  };

  const resendOtp_VerifyEmail = () => {
    if (globals.isInternetConnected == true) {
      setEditMode(false);
      Axios(
        "POST",
        "sendemailverification",
        {
          sessid: route.params.sessionId,
        },
        (res) => {
          if (res.data.responseCode) {
            setFormError("OTP resent successful");
          } else {
            setFormError(res.data.message);
          }
        }
      ).catch((e) => console.log(e));
    } else {
      notifyMessage(globals.noInternet);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
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
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
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
        <ScrollView
          bounces={false}
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleView}>
            <Headline style={styles.titleStyle}>Verify Mobile Number</Headline>
          </View>

          <Subheading style={styles.confirmMobileno}>
            Please confirm your mobile number or your account will be disabled
          </Subheading>

          <View style={styles.inputView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!editMode ? (
                <Title
                  style={[styles.mobileNo, { color: theme.colors.accent }]}
                >
                  {phoneNo}
                </Title>
              ) : (
                <TextInput
                  maxLength={11}
                  value={phoneNo}
                  autoFocus={true}
                  keyboardType="number-pad"
                  onChangeText={(e) => setPhoneNo(e)}
                  style={[styles.input, { color: theme.colors.accent }]}
                />
              )}
              <IconButton
                icon="pencil"
                color="#FFF"
                onPress={() => setEditMode(!editMode)}
              />
            </View>

            <OtpBox setOtpVal={(e) => setOtpVal(e)} />

            {formErr ? (
              <Text style={[styles.error, { color: theme.colors.accent }]}>
                {formErr}
              </Text>
            ) : null}

            <Button color="#FFF" onPress={submitForm} style={{ marginTop: 20 }}>
              Verify
            </Button>

            <Button
              color={theme.colors.accent}
              style={{ marginVertical: 20 }}
              onPress={resendOtp}
            >
              Resend OTP
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
      {loading ? <Spinner /> : null}
    </View>
  );
};

function Validate({ phoneNumber }) {
  let phoneNumberErr = "";
  let currentCountry = RNLocalize.getCountry();

  if (phoneNumber.trim() === "") {
    phoneNumberErr = "Phone number cannot be empty";
  } else {
    if (currentCountry === AppConstant.constant.INDIA) {
      if (phoneNumber.trim().length < 10) {
        phoneNumberErr = "Invalid phone number";
      }
    } else {
      if (phoneNumber.charAt(0) === "0") {
        if (phoneNumber.length < 10) {
          phoneNumberErr = "Invalid phone number";
        }
      } else {
        if (phoneNumber.length < 11) {
          phoneNumberErr = "Invalid phone number";
        }
      }
    }
  }
  if (phoneNumberErr === "") {
    return "ok";
  } else {
    return {
      phoneNumberErr,
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputView: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputViewImage: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
  },
  titleView: {
    margin: 20,
  },
  titleStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 30,
  },
  confirmMobileno: {
    color: "#FFF",
    textAlign: "center",
  },
  mobileNo: {
    marginVertical: 15,
    textAlign: "center",
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  back: {
    position: "absolute",
    top: 25,
    right: 10,
  },
  input: {
    fontSize: 20,
  },
});
