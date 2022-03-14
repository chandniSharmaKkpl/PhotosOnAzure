import PushNotification from "react-native-push-notification";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppConstants from "../Theme/AppConstant";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AuthContext from "../context/AuthContext";
import DeviceInfo from "react-native-device-info";
//import { getUniqueId, getManufacturer } from "react-native-device-info";

function PushController(props) {
  const [permissions, setPermissions] = useState({});
  const { user } = React.useContext(AuthContext);
  const { setUserData } = React.useContext(AuthContext); // for updating user data of authcontext

  // Use effect for android notifications
  useEffect(() => {
    PushNotification.configure({

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
     },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {

      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
      },

      // Android only
      senderID: '57143668188',//AppConstants.constant.SENDER_ID,
      popInitialNotification: true,
      requestPermissions: true,
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
     
    });
    return () => {};
  }, []);

  // For iOS notifications

  useEffect(() => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", onRegistered);

      PushNotificationIOS.addEventListener(
        "registrationError",
        onRegistrationError
      );
      PushNotificationIOS.addEventListener(
        "notification",
        onRemoteNotification
      );

      PushNotificationIOS.requestPermissions().then(
        (data) => {
        },
        (data) => {
        }
      );

      return () => {
        PushNotificationIOS.removeEventListener("register");
        PushNotificationIOS.removeEventListener("registrationError");
        PushNotificationIOS.removeEventListener("notification");
        PushNotificationIOS.removeEventListener("localNotification");
      };
    }
  }, []);

  const sendNotification = () => {
    DeviceEventEmitter.emit("remoteNotificationReceived", {
      remote: true,
      aps: {
        alert: { title: "title", subtitle: "subtitle", body: "body" },
        badge: 1,
        sound: "default",
        category: "REACT_NATIVE",
        "content-available": 1,
        "mutable-content": 1,
      },
    });
  };

  const onRegistered = (deviceToken) => {
    
  };

  const onRegistrationError = (error) => {
   
  };

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
    Title:  ${notification.getTitle()};\n
    Subtitle:  ${notification.getSubtitle()};\n
    Message: ${notification.getMessage()};\n
    badge: ${notification.getBadgeCount()};\n
    sound: ${notification.getSound()};\n
    category: ${notification.getCategory()};\n
    content-available: ${notification.getContentAvailable()};\n
    Notification is clicked: ${String(isClicked)}.`;

  };

  const showPermissions = () => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.checkPermissions((permissions) => {
        setPermissions({ permissions });
      });
    }
  };
  return null;
}

export default PushController;
