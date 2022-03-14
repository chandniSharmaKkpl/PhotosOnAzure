import React, { useEffect, useState, useRef } from "react";

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
  Alert,
  Share,
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
import { isinviteCodeValid } from "../../helpers/validations";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../Theme";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";

import { useRoute, useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import TextInputView from "../../Component/auth/TextInputView";
import { useSelector, useDispatch } from "react-redux";
import { updateInviteCodeApiCall } from "../../Redux-api/actions/Home";

import AuthContext from "../../context/AuthContext";
import { AppConstant } from "../../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import {notifyMessage} from '../../Component/AlertView';

export default InviteCode = (props) => {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { setUserData } = React.useContext(AuthContext);
  const [formErr, setFormError] = React.useState("");
  const [inviteCode, setinviteCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [isApiCall, setIsApiCall] = React.useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const data = useSelector((state) => state); // Getting api response
  const dispatch = useDispatch(); // Calling api

  const [error, setError] = React.useState({
    inviteCodeErr: "",
  });

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

      setinviteCode("");
      setError({
        inviteCodeErr: "",
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
    let inviteCodeErr = "";

    if (inviteCode && inviteCode.length > 0) {
      if (inviteCode.trim() === "") {
        inviteCodeErr = AppConstant.constant.INVITE_CODE_EMPTY;
      }else{
        if(user && user.user_detail && user.user_detail.invite_code){
          if (user.user_detail.invite_code === inviteCode) {
            inviteCodeErr = AppConstant.constant.ENTER_SHARED_INVITATION_CODE;
          }
        }
      }
    } else {
      inviteCodeErr = AppConstant.constant.INVITE_CODE_EMPTY;
    }

    if (inviteCodeErr === "") {
      return "ok";
    } else {
      return {
        inviteCodeErr,
      };
    }
  }

  const submitForm = () => {
    const validate = Validate();
    setError(
      validate !== "ok"
        ? validate
        : {
            inviteCodeErr: "",
          }
    );
    if (validate === "ok") {
      if (globals.isInternetConnected == true) {
        setIsApiCall(true);
        setLoading(true);
        // call api
        let param = {
          sessid: user.sessid ? user.sessid : "",
          invite_code: inviteCode,
        };
        dispatch(updateInviteCodeApiCall(param));
      }
    }
  };

  const alertLogout = () => {
    Alert.alert("Alert",data.HomeReducer.updateInviteCodeData.message, [
      { text: "Ok", onPress: () => moveToLoginScreen() },
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
  };

  const checkResponseCode = () => {
    if (isApiCall) {
      if (
        data.HomeReducer.updateInviteCodeData &&
        data.HomeReducer.updateInviteCodeData.errorCode
      ) {
        setIsApiCall(false);
        
        setLoading(false);
        if (
          data.HomeReducer.updateInviteCodeData.errorCode &&
          data.HomeReducer.updateInviteCodeData.errorCode ===
            AppConstant.constant.NOT_AUTHORIZED
        ) {
          alertLogout();
          return;
        } 
       
        Alert.alert("Alert", data.HomeReducer.updateInviteCodeData.message, [
          {
            text: "Ok",
            onPress: () =>
              data.HomeReducer.updateInviteCodeData.errorCode ===
              AppConstant.constant.UPDATE_SUCCESS
                ? navigation.goBack()
                : null, // If we get success then only move back
          },
        ]);
      }
    }
  };

  // call when you want to share on social media via link
  const onshareApp = async () => {
  const  messageToShow = AppConstant.constant.INVITE_CODE_SHARE+ " "+user.user_detail.invite_code
    try {
      const result = await Share.share({
        message:
          messageToShow,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      notifyMessage(error.message);
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
            <Headline style={styles.titleStyle}>Invitation Code</Headline>

            <Subheading style={styles.subheadingFirst}>
              You can share your invitation code
            </Subheading>
            <View style={styles.viewCode}>
              {user && user.user_detail && user.user_detail.invite_code ? (
                <Text style={styles.textCode}>
                  {user.user_detail.invite_code}
                </Text>
              ) : (
                <Subheading style={styles.textToShareCode}>
                  Your invitation code will show here
                </Subheading>
              )}
              {user && user.user_detail && user.user_detail.invite_code ? (
                <TouchableOpacity onPress={() => onshareApp()}>
                  <IconIonicons
                    name="share-social-sharp"
                    style={styles.iconShare}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <Subheading style={styles.forgotPassDescription}>
              Enter invited code which you received from your friend.
            </Subheading>
          </View>
          <View style={styles.inputView}>
            <TextInputView
            //  error={error.inviteCodeErr}
              icon={require("../../assets/icons/invite_code.png")}
              placeholder="Invite Code"
              value={inviteCode}
              onChangeText={(e) => {
                //  setUserData(user)
                setinviteCode(e);
              }}
            />
{error.inviteCodeErr ? (
  <Text style={styles.error}>
                {error.inviteCodeErr}
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
  iconShare: {
    fontSize: 30,
    color: AppColor.colors.WHITE,
    paddingLeft: "3%",
  },
  subheadingFirst: {
    color: "#FFF",
    textAlign: "center",
    paddingTop: hp("1%"),
    fontFamily: "MuseoSlab-500",
    alignSelf: "center",
  },
  textToShareCode: {
    color: AppColor.colors.RED,
    fontFamily: "MuseoSlab-700",
    textAlign: "center",
  },
  textCode: {
    color: AppColor.colors.RED,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "MuseoSlab-700",
    textAlign: "center",
  },
  viewCode: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: hp("1%"),
  },
  forgotPassDescription: {
    color: "#FFF",
    textAlign: "center",
    paddingTop: hp("1%"),
    fontFamily: "MuseoSlab-500",
    alignSelf: "center",
  },
  error: {
    color:AppColor.colors.RED,
  // paddingTop: hp(-10),
    textAlign: "center",
    fontFamily: "MuseoSlab-500",
   
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
    // flex: 1,
    paddingHorizontal: 30,
    // backgroundColor:'pink',
    //paddingTop: hp("5%"),
  },
  inputViewImage: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    //backgroundColor:'green'
  },
  titleView: {
    margin: 20,
  },
  titleStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "MuseoSlab-700",
  },
  confirmMobileno: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "MuseoSlab-500",
  },
  mobileNo: {
    marginVertical: 15,
    textAlign: "center",
    fontFamily: "MuseoSlab-500",
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
