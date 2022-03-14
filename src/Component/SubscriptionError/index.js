import React from "react";
import { Alert, View } from "react-native";
import AppConstants from "../../Theme/AppConstant";
import { useSelector, useDispatch } from "react-redux";
import { listAllMediaSuccess } from "../../Redux-api/actions/Home";
import {removeCurrentUser} from '../../database/localDB'
import AuthContext from '../../context/AuthContext'

const SubscriptionError = (props) => {
  const dispatch = useDispatch(); // Calling api
	const { setUserData } = React.useContext(AuthContext)

  // Success method alert show only one time we are making success object empty 

switch (props.comeFrom) {
  case AppConstants.constant.HOME:
    dispatch(listAllMediaSuccess({}));
    break;

    case AppConstants.constant.NOTIFICATION_DRAWER:
			dispatch(notificationSettingSuccess([]))
    break;

  default:
    break;
}

  

  return (
    <View>
      {Alert.alert(
        AppConstants.constant.ONLINE_FAMILY_VAULT,
        AppConstants.constant.UPGRADE_ACCOUNT_ALERT,
        [
          {
            text: AppConstants.constant.ENTER_INVITE_CODE,
            onPress: () => {
              props.navigation.navigate("InviteCode");
            },
          },
          {
            text: AppConstants.constant.UPGRADE_NOW,
            onPress: () => {
              props.navigation.navigate("Subscription");
            },
          },
          {
            text: AppConstants.constant.LOGOUT,
            onPress: () => {
              removeCurrentUser() // Remove current logged in user from asyn storage
              setUserData(null)
            },
          },
        ]
      )}
    </View>
  );
};

export default SubscriptionError;
