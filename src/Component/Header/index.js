import React, { useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Pressable
} from "react-native";
import styles from "./style";
import { useNavigation, useRoute, useNavigationState } from "@react-navigation/native";
import AppConstants from "../../Theme/AppConstant";

export const Header = (props) => {
  var countBack = 0;
  const {
    leftIcon,
    titleIcon,
    rightBackIcon,
    rightViewLeftIcon,
    leftClick,
    rightBackIconClick,
    notificationsClick,
  } = props;

  const navigation = useNavigation();
  const route = useRoute();
const routes = useNavigationState(state=> state.routes);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackInHeader);
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackInHeader()
      );
      
    };
  }, []);

  const handleBackInHeader = () => {
      // let place = routes[routes.length-1];

    if (route.name === "Home" || route.name === 'CameraIcon' || route.name === 'AlredyInviteContact') {
        if(countBack>1){
            Alert.alert(
                AppConstants.constant.EXIT_APP,
                AppConstants.constant.WANT_TO_EXIT_APP,
                [
                  {
                    text: AppConstants.constant.CANCEL,
                    onPress: () => countBack = 0,
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
        }else{
            countBack++;
        }
      
    } 
    return true;
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />
      <View style={
              props.isNotificationShow ? styles.containerHome : styles.container
            }>
        <View style={styles.viewInside}>
          <TouchableOpacity style={styles.leftView} onPress={leftClick}>
            <View style={styles.leftButton}>
              <Image
                source={leftIcon}
                resizeMode={"contain"}
                style={styles.leftIcon}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.centerView}>
            <Image
              source={titleIcon}
              resizeMode={"contain"}
              style={styles.titleIcon}
            />
          </View>

          <View
            style={
              props.isNotificationShow ? styles.onlyRighIcon : styles.rightView
            }
          >
            <TouchableHighlight
              onPress={notificationsClick}
              style={styles.righticonleftView}
            >
               <View style={styles.backIconAreaNotification} >
              <Image
                source={rightViewLeftIcon}
                resizeMode={"contain"}
                style={styles.rightIconNotification}
              />
              </View>
            </TouchableHighlight>

           { !props.isNotificationShow ?  <TouchableOpacity
              onPress={rightBackIconClick}
              style={[styles.righticonleftView]}
            >
              <View style={styles.backIconArea}>
              <Image
                source={rightBackIcon}
                resizeMode={"contain"}
                style={styles.rightIcon}
              />
              </View>
            </TouchableOpacity>: null }
          </View>
        </View>
      </View>
    </>
  );
};
