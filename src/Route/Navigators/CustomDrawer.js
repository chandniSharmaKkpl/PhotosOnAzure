import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SubscriptionError from "../../Component/SubscriptionError";
import AppConstants from "../../Theme/AppConstant";
import { logOutUser } from "../../Redux-api/actions/LoginActions";

import {
  Button,
  Caption,
  IconButton,
  Drawer,
  Text,
  useTheme,
} from "react-native-paper";
import AuthContext from "../../context/AuthContext";
import { removeCurrentUser } from "../../database/localDB";
import {
  notificationStatusApiCall,
  notificationSettingSuccess,
} from "../../Redux-api/actions/Home";

export default CustomDrawer = () => {
  const navigation = useNavigation();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { setUserData } = React.useContext(AuthContext);
  const [notif, setNotif] = React.useState(false);
  const data = useSelector((state) => state); // Getting api response
  const dispatch = useDispatch(); // Calling api
  var notificationStatus = false;

  const onClickNotificationSwitch = () => {
    if (user && user.user_detail) {
      let userDetailTemp = user.user_detail;
      userDetailTemp.notification_status = !userDetailTemp.notification_status;
      user.user_detail = userDetailTemp;
      setUserData(user);
      //  setNotif(!notif);

      let param = {
        sessid: user.sessid ? user.sessid : "",
        notification_status:
          !userDetailTemp.notification_status === false ? 0 : 1,
      };
      dispatch(notificationStatusApiCall(param));
    }
  };
  const checkResponseCode = () => {
    var response = {};

    if (
      data.HomeReducer.notificationSetting &&
      data.HomeReducer.notificationSetting.errorCode
    ) {
      if (
        data.HomeReducer.notificationSetting.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.NOTIFICATION_DRAWER}
            errorCode={data.HomeReducer.notificationSetting.errorCode}
            navigation={props.navigation}
          />
        );
      }
      dispatch(notificationSettingSuccess([]));
      // notifyMessage(data.HomeReducer.notificationSetting.message); Client removed alert messages
    }
  };

  return (
    <View style={styles.appDrawer}>
      {checkResponseCode()}

      <Drawer.Section style={styles.drawer}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.drawerLogo}
          fadeDuration={0}
        />
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("Notifications")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/drawer/notification.png")}
          />
          <Text style={styles.drawerItem}>Notifications</Text>

          <Pressable onPress={() => onClickNotificationSwitch()}>
            {user &&
            user.user_detail &&
            user.user_detail.notification_status &&
            user.user_detail.notification_status ? (
              <Image
                source={require("../../assets/icons/drawer/btn-on.png")}
                style={styles.switch}
                fadeDuration={0}
              />
            ) : (
              <Image
                source={require("../../assets/icons/drawer/btn-off.png")}
                style={styles.switch}
                fadeDuration={0}
              />
            )}
          </Pressable>
        </Pressable>

        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("PrivacySecurity")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/drawer/privacy.png")}
          />
          <Text style={styles.drawerItem}>Privacy & Security</Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("About")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/drawer/about.png")}
          />
          <Text style={styles.drawerItem}>About</Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("Subscription")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/drawer/subscription.png")}
          />
          <Text style={styles.drawerItem}>Subscription Status</Text>
        </Pressable>

        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("EditDetails")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/drawer/edit.png")}
          />
          <Text style={styles.drawerItem}>Edit Details</Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("UpdateEmail")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/Email2.png")}
          />
          <Text style={styles.drawerItem}> Update Email</Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("InviteCode")}
        >
          <IconButton
            size={16}
            color="#FFF"
            icon={require("../../assets/icons/invite_code.png")}
          />
          <Text style={styles.drawerItem}> Invite Code </Text>
        </Pressable>
      </Drawer.Section>
      <Button
        mode="contained"
        style={styles.btn}
        uppercase={false}
        color={theme.colors.accent}
        onPress={() => {
          removeCurrentUser(); // Remove current logged in user from asyn storage
          dispatch(
            logOutUser({
              sessid: user.sessid ? user.sessid : "",
            })
          );
          setUserData(null);
          navigation.navigate("Home", { isLogout: true });
        }}
      >
        Logout
      </Button>
      <Caption style={styles.appVersion}>App version 1.3</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  appDrawer: {
    flex: 1,

    backgroundColor: "#3389df",
  },
  drawer: {
    flex: 1,
    marginVertical: 20,
  },
  drawerLogo: {
    width: "90%",
    height: 80,
    resizeMode: "contain",
    marginVertical: 10,
    alignSelf: "center",
    tintColor: "#FFF",
  },
  drawerItem: {
    color: "#FFF",
    paddingVertical: 16,
    flex: 1,
    fontFamily: "MuseoSlab-700",
  },
  drawerItemUpdateEmail: {
    color: "#FFF",
    paddingVertical: 19,
    flex: 1,
  },
  btn: {
    width: 140,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  appVersion: {
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
  },
  switch: {
    width: 60,
    height: 30,
    resizeMode: "contain",
    marginRight: 20,
  },
});
