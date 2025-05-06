import * as React from "react";

import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  BackHandler,
  Keyboard,
} from "react-native";
import * as globals from "../../Utils/globals";

import { isEmailValid } from "../../helpers/validations";

import { Headline, Subheading, Text, useTheme } from "react-native-paper";

import { useNavigation } from "@react-navigation/core";

import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import { notifyMessage } from "../../Component/AlertView";

import { Axios } from "../../helpers/Axios";

export const ForgotPassword = (props) => {
  const navigation = useNavigation();

  const theme = useTheme();

  const [user, setUser] = React.useState({
    email: "",
  });

  const [error, setError] = React.useState({
    emailErr: "",
  });

  const [formErr, setFormError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  const submitForm = () => {
    const validate = Validate(user);

    setError(
      validate !== "ok"
        ? validate
        : {
            emailErr: "",
          }
    );

    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setLoading(true);
        Axios(
          "POST",
          "forgotpass",
          {
            email: user.email,
          },
          (res) => {
            if (res && res.data && res.data.responseCode) {
              Alert.alert(
                "Email Successfully Sent",
                "An email was sent successfully to reset your password!",
                [
                  {
                    text: "Ok",
                    style: "default",
                    onPress: () => navigation.navigate("LoginWithEmail"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
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

  return (
    <>
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
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Image
            style={
              Platform.OS === "android"
                ? { height: 26, width: 26 }
                : { height: 25, width: 25, }
            }
            resizeMode="cover"
            source={require("../../assets/icons/back.png")}
            onPress={()=>navigation.goBack()}
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
        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Pressable onPress={() => Keyboard.dismiss()}>
            <View style={styles.titleView}>
              <Headline style={styles.titleStyle}>Forgot Password</Headline>

              <Subheading style={styles.forgotPassDescription}>
                Enter the email address associated with your account
              </Subheading>
            </View>

            <View style={styles.inputView}>
              <TextInputView
                keyboardType="email-address"
                placeholder="Enter Email Address"
                value={user.email}
                error={error.emailErr}
                onChangeText={(e) => setUser({ ...user, email: e })}
                icon={require("../../assets/Email2.png")}
              />

              {formErr ? (
                <Text style={[styles.error, { color: theme.colors.accent }]}>
                  {formErr}
                </Text>
              ) : null}

              <Button
                color="#FFF"
                onPress={submitForm}
                style={{ marginTop: 60 }}
              >
                Send Email
              </Button>
            </View>
          </Pressable>
        </ScrollView>
      </ImageBackground>
      {loading ? <Spinner /> : null}
    </>
  );
};

function Validate({ email }) {
  let emailErr = "";

  if (email.trim() === "") {
    emailErr = "Email cannot be empty";
  } else if (!isEmailValid(email)) {
    emailErr = "Email is not correct";
  }

  if (emailErr === "") {
    return "ok";
  } else {
    return {
      emailErr,
    };
  }
}

const styles = StyleSheet.create({
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
    width: '100%',
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
    paddingHorizontal: 30,
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  back: {
    display: "flex",

    position: "absolute",
    top: 50,
    right: 9,
    // width: 50,
    height: 30,

    // backgroundColor: "red",
  },
  forgotPassDescription: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 40,
  },
});
