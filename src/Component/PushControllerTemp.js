import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import AuthContext from "../context/AuthContext";
import DeviceInfo from 'react-native-device-info';
//import { getUniqueId, getManufacturer } from "react-native-device-info";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
///*** Follow this step  */
/*

1. follow the steps from 1 to 4 
https://rnfirebase.io/ 

Add these pods in ios pod file 
 pod 'Firebase/Core'
 pod 'Firebase/Messaging'
 Do android specific changes as shown in the link 
 
*/

function PushController(props) {

  useEffect(() => {

     {
      (async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        const messaging1 = firebase.messaging();
        messaging1.getToken().then(deviceToken => {
          
          let device_info = {};
          if (deviceToken) {
            device_info.device_token = deviceToken ? deviceToken : '';
            }
          DeviceInfo.syncUniqueId().then(uniqueId => {
            device_info.device_uuid = uniqueId;
          });
  
          if (Platform.OS === 'android') {
            device_info.device_type = 'android';
          } else {
            device_info.device_type = 'ios';
          }
          DeviceInfo.getDeviceName().then(deviceName => {
            device_info.device_name = deviceName;
          });

          props.getDeviceInfo(device_info);
        });
      }else{
        alert("Permission not granted for notification"); 
      }
    })(); 
      const unsubscribe = messaging().onMessage(async remoteMessage => {
       // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
        return () => {
         unsubscribe;
       
      };
    }
  }, []);

 
  
  return null;
}

export default PushController;
