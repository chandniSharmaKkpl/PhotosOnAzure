import React from "react";

import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  BackHandler,
} from "react-native";
import * as globals from "../../Utils/globals";

import { Headline, Subheading, Text, useTheme } from "react-native-paper";
import { isEmailValid } from "../../helpers/validations";
import AppConstants from "../../Theme/AppConstant";

import { useNavigation } from "@react-navigation/core";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../Redux-api/actions/Auth";

import AuthContext from "../../context/AuthContext";
import { AppConstant } from "../../Theme";
import SubscriptionError from "../../Component/SubscriptionError";
import { notifyMessage } from "../../Component/AlertView";

export default UpdateEmail = (props) => {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { setUserData } = React.useContext(AuthContext);
  const [formErr, setFormError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [isApiCall, setIsApiCall] = React.useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const data = useSelector((state) => state); // Getting api response
  const dispatch = useDispatch(); // Calling api

  const [error, setError] = React.useState({
    emailErr: "",
  });

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      setEmail("");
      setError({
        emailErr: "",
      });
    });
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, [props.navigation]);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  function Validate() {
    let emailErr = "";

    if (email && email.length > 0) {
      if (email.trim() === "") {
        emailErr = "Email cannot be empty";
      } else if (!isEmailValid(email)) {
        emailErr = "Email is not correct";
      }
    } else {
      emailErr = "Email cannot be empty";
    }

    if (emailErr === "") {
      return "ok";
    } else {
      return {
        emailErr,
      };
    }
  }

  const submitForm = () => {
    if (
      user.user_detail &&
      user.user_detail.email &&
      user.user_detail.email === email
    ) {
      notifyMessage(AppConstants.constant.THIS_IS_YOUR_CURRENT_EMAIL);
      return;
    }
    const validate = Validate();
    setError(
      validate !== "ok"
        ? validate
        : {
            emailErr: "",
          }
    );

    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setIsApiCall(true);
        setLoading(true);
        // call api
        let param = {
          sessid: user.sessid ? user.sessid : "",
          new_email: email,
        };
        dispatch(updateEmail(param));
      }
    }
  };

  const checkResponseCode = () => {
    if (isApiCall) {
      if (
        data.AuthReducer.data &&
        data.AuthReducer.data.message &&
        data.AuthReducer.data.responseCode
      ) {
        setIsApiCall(false);
        setLoading(false);

        if (data.AuthReducer.data && data.AuthReducer.data.errorCode) {
          if (
            data.AuthReducer.data.errorCode ===
            AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
          ) {
            return (
              <SubscriptionError
                comeFrom={AppConstants.constant.UPDATE_EMAIL}
                errorCode={data.AuthReducer.data.errorCode}
                navigation={props.navigation}
              />
            );
          }
        }

        Alert.alert("Alert", data.AuthReducer.data.message, [
          {
            text: "Ok",
            onPress: () =>
              data.AuthReducer.data.responseCode ===
              AppConstant.constant.SUCCESS
                ? navigation.goBack()
                : null, // If we get success then only move back
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      {checkResponseCode()}
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
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.titleView}>
            <Headline style={styles.titleStyle}>Change Email Address</Headline>

            <Subheading style={styles.forgotPassDescription}>
              Enter the new email address
            </Subheading>
          </View>
          <View style={styles.inputView}>
            <TextInputView
              keyboardType="email-address"
              placeholder="Email Address"
              value={email}
              error={error.emailErr}
              onChangeText={(val) => setEmail(val)}
              icon={require("../../assets/Email.png")}
            />

            {formErr ? (
              <Text style={[styles.error, { color: theme.colors.accent }]}>
                {formErr}
              </Text>
            ) : null}

            <View style={styles.confirmButton}>
              <Button color="#FFF" onPress={submitForm}>
                Confirm
              </Button>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      {loading || data.AuthReducer.isRequesting ? <Spinner /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassDescription: {
    color: "#FFF",
    textAlign: "center",
    paddingTop: hp("1%"),
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  confirmButton: {
    paddingTop: hp("1%"),
  },
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
    paddingHorizontal: 30,
    paddingTop: hp("5%"),
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
