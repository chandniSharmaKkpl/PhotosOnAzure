import * as React from "react";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as globals from "../../Utils/globals";
import { isEmailValid, isMobileNumberValid } from "../../helpers/validations";

import { Headline, Subheading, Text, useTheme } from "react-native-paper";
import DeviceInfo, {getDeviceId} from 'react-native-device-info';

import { useNavigation } from "@react-navigation/core";

import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushController from "../../Component/PushController";
import * as RNLocalize from "react-native-localize";

import { Axios } from "../../helpers/Axios";

import format from "date-fns/format";
import { AppConstant } from "../../Theme";
import { notifyMessage } from "../../Component/AlertView";

export const Register = (props) => {
  const navigation = useNavigation();
  const [deviceInfo, setDeviceInfo] = useState({});
  const [isClickPwd, setIsClickPwd] = useState(false);
  const [isClickConfirmPwd, setIsClickConfirmPwd] = useState(false);

  const theme = useTheme();

  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    secondary_email: "",
    phoneNumber: "",
    password: "",
    confPassword: "",
    date_of_birth: "",
    address: "",
    invite_code: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const [error, setError] = React.useState({
    fullNameErr: "",
    emailErr: "",
    secondaryEmailErr: "",
    phoneNumberErr: "",
    passwordErr: "",
    confPasswordErr: "",
    dateOfBirthErr: "",
    addressErr: "",
  });

  const [formErr, setFormError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setUser({ ...user, date_of_birth: format(date, "dd-MM-yyyy") });
    hideDatePicker();
  };
  const getDeviceInfo = (value) => {
    setDeviceInfo(value);
  };

  const submitForm = () => {
    const validate = Validate(user);
    let currentCountry = RNLocalize.getCountry();

    setError(
      validate !== "ok"
        ? validate
        : {
            fullNameErr: "",
            emailErr: "",
            secondaryEmailErr: "",
            phoneNumberErr: "",
            passwordErr: "",
            confPasswordErr: "",
            dateOfBirthErr: "",
            addressErr: "",
          }
    );

    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setLoading(true);
        Axios(
          "POST",
          "register",
          {
            full_name: user.fullName,
            email: user.email,
            phone:
              currentCountry === AppConstant.constant.INDIA
                ? user.phoneNumber
                : user.phoneNumber.length === 10
                ? user.phoneNumber.replace(user.phoneNumber.charAt(0), "61")
                : user.phoneNumber,
            password: user.password,
            confirm: user.confPassword,
            gender: 1,
            secondary_email: user.secondary_email,
            date_of_birth: user.date_of_birth,
            address: user.address,
            invite_code: user.invite_code,
            device_uuid: deviceInfo.device_uuid ? deviceInfo.device_uuid : "",
            device_token: deviceInfo.device_token
              ? deviceInfo.device_token
              : "",
            device_type: deviceInfo.device_type ? deviceInfo.device_type : "",
            device_name: deviceInfo.device_name ? deviceInfo.device_name : "",
          },
          (res) => {
            if (res.data.responseCode) {
              navigation.navigate("VerificationNew", {
                sessionId: res.data.data.sessid,
                phoneNumber: res.data.data.phone,
                userData: res.data.data,
              });
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

  const onPressPwd = () => {
    setIsClickPwd(!isClickPwd);
  };

  const onPressConfirmPwd = () => {
    setIsClickConfirmPwd(!isClickConfirmPwd);
  };

  const handleChange = (e) => {
    var len = e.length;
    if (
      (len === 2 && len > user.date_of_birth.length) ||
      (len === 5 && len > user.date_of_birth.length)
    ) {
      e = e + "-";
    }
    setUser({ ...user, date_of_birth: e });
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
            <Headline style={styles.titleStyle}>Create New Account</Headline>
          </View>

          <View style={styles.inputView}>
            <TextInputView
              icon={require("../../assets/icons/fullName.png")}
              placeholder="Full Name"
              value={user.fullName}
              error={error.fullNameErr}
              onChangeText={(e) => setUser({ ...user, fullName: e })}
            />

            <TextInputView
              icon={require("../../assets/Email2.png")}
              placeholder="Email Address"
              value={user.email}
              error={error.emailErr}
              keyboardType="email-address"
              onChangeText={(e) => setUser({ ...user, email: e })}
            />

            <TextInputView
              icon={require("../../assets/Email2.png")}
              placeholder=" Secondary Email Address"
              value={user.secondary_email}
              error={error.secondaryEmailErr}
              keyboardType="email-address"
              onChangeText={(e) => setUser({ ...user, secondary_email: e })}
            />

            <TextInputView
              icon={require("../../assets/icons/phone.png")}
              placeholder="Mobile Number"
              value={user.phoneNumber}
              error={error.phoneNumberErr}
              keyboardType="number-pad"
              maxLength={11}
              onChangeText={(e) => setUser({ ...user, phoneNumber: e })}
            />

            {isClickPwd ? (
              <TextInputView
                secureTextEntry={false}
                placeholder="Enter Password"
                value={user.password}
                error={error.passwordErr}
                onChangeText={(e) => setUser({ ...user, password: e })}
                icon={require("../../assets/icons/password.png")}
                isClickEye={isClickPwd}
                onPressRight={onPressPwd}
                right={true}
              />
            ) : (
              <TextInputView
                secureTextEntry={true}
                placeholder="Enter Password"
                value={user.password}
                error={error.passwordErr}
                onChangeText={(e) => setUser({ ...user, password: e })}
                icon={require("../../assets/icons/password.png")}
                isClickEye={isClickPwd}
                onPressRight={onPressPwd}
                right={true}
              />
            )}

            {isClickConfirmPwd ? (
              <TextInputView
                secureTextEntry={false}
                placeholder="Enter Password"
                value={user.confPassword}
                error={error.confPasswordErr}
                onChangeText={(e) => setUser({ ...user, confPassword: e })}
                icon={require("../../assets/icons/password.png")}
                isClickEye={isClickConfirmPwd}
                onPressRight={onPressConfirmPwd}
                right={true}
              />
            ) : (
              <TextInputView
                secureTextEntry={true}
                placeholder="Enter Password"
                value={user.confPassword}
                error={error.confPasswordErr}
                onChangeText={(e) => setUser({ ...user, confPassword: e })}
                icon={require("../../assets/icons/password.png")}
                isClickEye={isClickConfirmPwd}
                onPressRight={onPressConfirmPwd}
                right={true}
              />
            )}

            <TextInputView
              keyboardType="number-pad"
              icon={require("../../assets/icons/date.png")}
              placeholder="Date Of Birth in dd-mm-yyyy"
              value={user.date_of_birth}
              error={error.dateOfBirthErr}
              onChangeText={(e) => handleChange(e)}
            />

            <TextInputView
              icon={require("../../assets/icons/address.png")}
              placeholder="Address"
              value={user.address}
              error={error.addressErr}
              onChangeText={(e) => setUser({ ...user, address: e })}
            />

            <TextInputView
              icon={require("../../assets/icons/invite_code.png")}
              placeholder="Invite Code"
              value={user.invite_code}
              onChangeText={(e) => setUser({ ...user, invite_code: e })}
            />

            {formErr ? (
              <Text style={[styles.error, { color: theme.colors.accent }]}>
                {formErr}
              </Text>
            ) : null}

            <Button color="#FFF" onPress={submitForm}>
              Create Account
            </Button>
          </View>

          <View style={styles.loginButtonView}>
            <Text style={styles.alreadyHaveAccount}>
              Already Have an Account?
            </Text>
            <Pressable onPress={() => navigation.navigate("LoginWithEmail")}>
              <Subheading
                style={[styles.loginText, { color: theme.colors.accent }]}
              >
                Login
              </Subheading>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {loading ? <Spinner /> : null}

      <PushController getDeviceInfo={getDeviceInfo} />
    </View>
  );
};

function Validate({
  fullName,
  email,
  secondary_email,
  phoneNumber,
  password,
  confPassword,
  date_of_birth,
  address,
}) {
  let fullNameErr = "";
  let emailErr = "";
  let phoneNumberErr = "";
  let passwordErr = "";
  let confPasswordErr = "";
  let secondaryEmailErr = "";
  let dateOfBirthErr = "";
  let addressErr = "";

  let currentCountry = RNLocalize.getCountry();

  if (fullName.trim() === "") {
    fullNameErr = "Full name cannot be empty";
  }

  if (email.trim() === "") {
    emailErr = "Email cannot be empty";
  } else if (!isEmailValid(email)) {
    emailErr = "Email is not correct";
  }

  if (secondary_email.trim() === "") {
    secondaryEmailErr = "Secondary Email cannot be empty";
  } else {
    if (!isEmailValid(secondary_email)) {
      secondaryEmailErr = "Secondary email is not correct";
    }
  }

  if (phoneNumber.trim() === "") {
    phoneNumberErr = "Phone number cannot be empty";
  } else {
    if (currentCountry === AppConstant.constant.INDIA) {
      if (phoneNumber.trim().length < 10) {
        phoneNumberErr = "Invalid phone number";
      }
    } else {
      if (!isMobileNumberValid(phoneNumber)) {
        phoneNumberErr = "Invalid phone number";
      }
    }
  }

  if (password.trim() === "") {
    passwordErr = "Password cannot be empty";
  }

  if (confPassword.trim() === "") {
    confPasswordErr = "Confirm Password cannot be empty";
  } else {
    if (password.trim() !== confPassword.trim()) {
      confPasswordErr = "Password did not match";
    }
  }

  if (date_of_birth.trim() === "") {
    dateOfBirthErr = "Date of birth cannot be empty";
  }

  if (address.trim() === "") {
    addressErr = "Address cannot be empty";
  } else if (address.trim().length < 10) {
    addressErr = "Address is too short";
  }

  if (
    fullNameErr === "" &&
    emailErr === "" &&
    secondaryEmailErr === "" &&
    phoneNumberErr === "" &&
    passwordErr === "" &&
    confPasswordErr === "" &&
    dateOfBirthErr === "" &&
    addressErr === ""
  ) {
    return "ok";
  } else {
    return {
      fullNameErr,
      emailErr,
      secondaryEmailErr,
      phoneNumberErr,
      passwordErr,
      confPasswordErr,
      dateOfBirthErr,
      addressErr,
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
  scrollViewStyle: {
    flex: 1,
  },
  titleView: {
    margin: 20,
  },
  titleStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: DeviceInfo.isTablet() ? 45 : 30,
    paddingTop: DeviceInfo.isTablet() ? 20 : 0,
  },
  inputView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputViewImage: {
    flex: 1,
  },
  imageIcon: {
    height: 200,
    width: "100%",
    position: "absolute",
  },
  loginButtonView: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loginText: {
    fontSize: DeviceInfo.isTablet() ? 24 : 18,
    marginTop: 10,
  },
  alreadyHaveAccount: {
    color: "#FFF",
    fontSize: DeviceInfo.isTablet() ? 22 : 14,
    fontWeight: "300",
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  containerDate: {
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "rgba(211,211,211,0.3)",
    borderRadius: 50,
  },
  textinputContainer: {
    marginBottom: 40,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    height: 20,
    width: 20,
    position: "absolute",
    left: 16,
  },
  backgroundIcon: {
    width: 60,
    position: "absolute",
    left: 0,
  },
  textInputStyle: {
    width: "100%",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    fontFamily: "MuseoSlab-500Italic",
    height: 30,
  },
  errorDate: {
    paddingLeft: 10,
    position: "absolute",
    bottom: -30,
  },
});
