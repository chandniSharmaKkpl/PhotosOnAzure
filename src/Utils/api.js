import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { Alert, DeviceEventEmitter } from 'react-native';

export const BASE_URL = 'https://staging.2excel.com.au/onlinephoto/api/v2.0/'
export const AZURE_BASE_URL = 'https://onlinephotos26feb.blob.core.windows.net/'

function makeHeaders() {
  let headerObj = {};
  const token = `Bearer`;
  headerObj = {
    'Authorization': token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return headerObj;
}

function makeFileUploadHeaders() {
  let headerObj = {};
  const token = `Bearer`;
  headerObj = {
    'Authorization': token,
    'Content-Type': 'multipart/form-data',
    "mimeType": "multipart/form-data",
  };
  return headerObj;
}

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

axiosApi.interceptors.request.use((request) => {
  request.headers = request.url == 'updateProfile' ? makeFileUploadHeaders() : makeHeaders();
  // }
  return request;
});

// request::->{"url":"supportRequest","method":"post","data":{"path":"/","id":"6","device_uuid":"ACE41230-49D2-480C-AF1E-D1E8C2641576","first_name":"punita","last_name":"pandya","email":"punita@2excel.com.au","phone":"7383181898","subject":"testing support form - please ignoure","message":"testing app"},"headers":{"Authorization":"Bearer"},"baseURL":"http://crm.2excel.com.au/fof/api/v1.4//","transformRequest":[null],"transformResponse":[null],"timeout":0,"withCredentials":true,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1}
// [Mon Apr 27 2020 19:59:34.236]  LOG      JSON data: {"responseCode":0,"errorCode":"support_request_required","message":"Required mendetory field(s)","data":false}
const checkRespAndRedirect = (response) => {
  const { data } = response;
  // const FCM = new FireBase();
  // if (data.errorCode === 'login_fail') {

  //   Alert.alert("OnlinePhotos",data.message)
  // } else if (data.errorCode === 'init_success') {
  //   // Save user details
  //   setUser(data.data);

  //   // showToast('warning', data.message);
  // }
  // // else if (data.errorCode === 'success') {
  // //   showToast('success', data.message);
  // // }
  // else if (data.errorCode === 'verification_pending') {
  //   showToast('danger', data.message, 'ok');
  // }
  // else if (data.errorCode === 'invalid_email') {
  //   showToast('danger', data.message, 'ok');
  // }
  // else if (data.errorCode === 'invalid_token') {
  //   showToast('danger', data.message, 'ok');
  //   clearUserData()
  // }
  // // else if (data.errorCode === 'true') {
  // //   showToast('success', data.message);
  // // }
  // else if (data.errorCode === 'register_success') {
  //   showToast('success', data.message);
  // }
  // else if (data.errorCode === 'register_failed') {
  //   showToast('success', data.message);
  // }
  // else if (data.errorCode === 'user_logout' || data.errorCode === 'already_logout') {
  //   showToast('success', data.message);
  //   clearUserData();
  // } else if (data.errorCode === 'invalid_username') {
  //   showToast('danger', data.message, 'ok');
  // } else if (data.errorCode === 'reset_success') {
  //   showToast('success', data.message, 'ok');
  // } else if (data.errorCode === 'not_authorized') {
  //   clearUserData();
  //   showToast('danger', data.message, 'ok');
  // } else if (data.errorCode === 'register_fail') {
  //   showToast('danger', data.message, 'ok');
  // } else {
  // }
};
const clearUserData = async () => {
  await AsyncStorage.clear();
  // AsyncStorage.removeItem('selected_participant');
  // NavigationService.reset("Login");

}
removeOldUserData = async () => {
  await AsyncStorage.removeItem('fofUser');
}

// res:{"responseCode":1,"errorCode":"redeem_bonus_success","message":"Redemption successful. You have received a AUD $50 bonus entitlement.","data":{"redeems":1,"bonus":50,"bonus_timer":{"d":"276","h":"9","i":"3","s":"2"},"bonus_expired_on":"2021-01-31 18:59:59"}}
showAlert = (message) => {
  Alert.alert(
    "",
    message,
    [
      {
        text: 'OK',
        onPress: (() => {
          NavigationService.reset("Login", {
            isFeedbackShow: true
          });
        })
      },
    ],
    { cancelable: false },
  );
  // FEEDBACK - Rnd #Pending
}

const setUser = (data) => {

  AsyncStorage.setItem('user', JSON.stringify(data))
    .catch(error => {
    })
};

saveApIResponse = async (apiRes) => {
  await AsyncStorage.setItem('apiResponse', JSON.stringify(apiRes));
}

axiosApi.interceptors.response.use(response => {
  checkRespAndRedirect(response);
  return response;
}, (err) => {
  Alert.alert(
    "Warning!",
    "This Application Require Network Connection!"
  );

  if (err.response && err.response.status === 401) {

    // if you don't return here, then an error will be thrown and you will see a loader infinitely
    return true;
  }
  if (err.response && err.response.status === 403) {

  }
  if (err.response && err.response.status === 500) {

  }
  return Promise.reject(err);
});

export default axiosApi;
