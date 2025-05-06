import axios from "axios";
import { Alert, ToastAndroid, Platform } from "react-native";
import {
  ALBUM_DETAIL_SUCCESS_LOCAL_DATA,
  UPLOAD_MEDIA_REQUEST,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_FAILURE,
  LIST_ALL_MEDIA_REQUEST,
  LIST_ALL_MEDIA_SUCCESS,
  LIST_ALL_MEDIA_FAILURE,
  MEDIA_LIST_BY_ITEM_SUCCESS,
  MEDIA_LIST_BY_ITEM_REQUEST,
  MEDIA_LIST_BY_ITEM_FAILURE,
  OWN_ALBUM_REQUEST,
  OWN_ALBUM_FAILURE,
  OWN_ALBUM_SUCCESS,
  SHARED_ALBUM_REQUEST,
  SHARED_ALBUM_SUCCESS,
  SHARED_ALBUM_FAILURE,
  LIST_PLANS_REQUEST,
  INVITED_USER_LIST_REQUEST,
  INVITED_USER_LIST_SUCCESS,
  LIST_PLANS_SUCCESS,
  LIST_PLANS_FAILURE,
  INVITED_USER_LIST_FAILURE,
  SEND_APP_INVITATION_REQUEST,
  SEND_APP_INVITATION_SUCCESS,
  SEND_APP_INVITATION_FAILURE,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_FAILURE,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_SETTING_REQUEST,
  NOTIFICATION_SETTING_FAILURE,
  NOTIFICATION_SETTING_SUCCESS,
  DELETE_USER_MEDIA_REQUEST,
  DELETE_USER_MEDIA_FAILURE,
  DELETE_USER_MEDIA_SUCCESS,
  DELETE_USER_MEDIA_ALBUM_DETAIL_REQUEST,
  DELETE_USER_MEDIA_ALBUM_DETAIL_FAILURE,
  DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS,
  DELETE_ALBUM_REQUEST,
  DELETE_ALBUM_FAILURE,
  DELETE_ALBUM_SUCCESS,
  UPDATE_ALBUM_NAME_REQUEST,
  UPDATE_ALBUM_NAME__SUCCESS,
  UPDATE_ALBUM_NAME_FAILURE,
  UPDATE_INVITE_CODE_REQUEST,
  UPDATE_INVITE_CODE_SUCCESS,
  UPDATE_INVITE_CODE_FAILURE,
  OWN_ALBUM_SHARED_VIEW_REQUEST,
  OWN_ALBUM_SHARED_VIEW_SUCCESS,
  OWN_ALBUM_SHARED_VIEW_FAILURE,
  OWN_ALBUM_ALBUM_VIEW_REQUEST,
  OWN_ALBUM_ALBUM_VIEW_SUCCESS,
  OWN_ALBUM_ALBUM_VIEW_FAILURE,
  SHARED_ALBUM_ALBUM_VIEW_REQUEST,
  SHARED_ALBUM_ALBUM_VIEW_SUCCESS,
  SHARED_ALBUM_ALBUM_VIEW_FAILURE,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  SHARE_ALBUM_TO_USER_REQUEST,
  SHARE_ALBUM_TO_USER_SUCCESS,
  SHARE_ALBUM_TO_USER_FAILURE,
  ALBUM_LIST_OF_USER_REQUEST,
  ALBUM_LIST_OF_USER_SUCCESS,
  ALBUM_LIST_OF_USER_FAILURE,
  REVOKE_SHARE_ALBUM_REQUEST,
  REVOKE_SHARE_ALBUM_SUCCESS,
  REVOKE_SHARE_ALBUM_FAILURE,
  CHECK_ALBUM_NAME_REQUEST,
  CHECK_ALBUM_NAME_SUCCESS,
  CHECK_ALBUM_NAME_FAILURE,
  SAVE_ALBUM_ID,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  ADD_NEW_ALB_UPLOAD_IMAGE_FAILURE,
  ADD_NEW_ALB_UPLOAD_IMAGE_SUCCESS,
  ADD_NEW_ALB_UPLOAD_IMAGE_REQUEST,
  UPDATE_ALB_UPLOAD_IMAGE_FAILURE,
  UPDATE_ALB_UPLOAD_IMAGE_SUCCESS,
  UPDATE_ALB_UPLOAD_IMAGE_REQUEST,
} from "../constant";
import * as globals from "../../Utils/globals";

import {
  UPLOAD_MEDIA,
  NOTIFICATION_LIST,
  LIST_ALBUM,
  LIST_ALL_MEDIA,
  MEDIA_LIST_BY_ITEM,
  OWN_ALBUM,
  SHARED_ALBUM,
  LIST_PLANS,
  DELETE_ALBUM,
  DELETE_USER_MEDIA,
  NOTIFICATION_SETTING,
  UPDATE_INVITE_CODE,
  SUBSCRIBE_PLAN,
  USER_SHARED_ALBUM,
  CHECK_ALBUM_NAME,
  UPLOAD_IMAGES,
} from "../endPoints";

import {
  SEND_APP_INVITATION,
  INVITED_USER_LIST,
  UPDATE_ALBUM_NAME,
  REVOKE_SHARE_ALBUM,
  ALBUM_LIST_OF_USER,
} from "../endPoints";
import { navigate } from "../../Navigator/RootNavigation";

function showAlert(title, msg) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export const subscribeSuccess = (data) => ({
  type: SUBSCRIBE_SUCCESS,
  payload: {
    data: data,
  },
});

export const listAllMediaSuccess = (data) => ({
  type: LIST_ALL_MEDIA_SUCCESS,
  payload: {
    data: data,
  },
});

export const updateInviteCodeSuccess = (data) => ({
  type: UPDATE_INVITE_CODE_SUCCESS,
  payload: {
    data: data,
  },
});

export const uploadMediaSuccess = (data) => ({
  type: UPLOAD_MEDIA_SUCCESS,
  payload: {
    data: data,
  },
});

export const getdMediaListByAlbumSuccess = (data) => ({
  type: MEDIA_LIST_BY_ITEM_SUCCESS,
  payload: {
    data: data,
  },
});

export const deleteUserMediaSuccess = (data) => ({
  type: DELETE_USER_MEDIA_SUCCESS,
  payload: {
    data: data,
  },
});

export const deleteUserMediaFail = (data) => ({
  type: DELETE_USER_MEDIA_FAILURE,
  payload: {
    data: data,
  },
});

export const deleteUserMediaAlbumDetailSuccess = (data) => ({
  type: DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS,
  payload: {
    data: data,
  },
});

export const deleteUserMediaAlbumDetailFail = (data) => ({
  type: DELETE_USER_MEDIA_ALBUM_DETAIL_FAILURE,
  payload: {
    data: data,
  },
});

export const deleteAlbumSuccess = (data) => ({
  type: DELETE_ALBUM_SUCCESS,
  payload: {
    data: data,
  },
});

export const deleteAlbumFail = (data) => ({
  type: DELETE_ALBUM_FAILURE,
  payload: {
    data: data,
  },
});

export const notificationSettingSuccess = (data) => ({
  type: NOTIFICATION_SETTING_SUCCESS,
  payload: {
    data: data,
  },
});
// From home screen
export const listOwnAlbumSuccess = (data) => ({
  type: OWN_ALBUM_SUCCESS,
  payload: {
    data: data,
  },
});
export const updateAlbumNameSuccess = (data) => ({
  type: UPDATE_ALBUM_NAME__SUCCESS,
  payload: {
    data: data,
  },
});
// From shared view
export const listOwnAlbumSharedViewSuccess = (data) => ({
  type: OWN_ALBUM_SHARED_VIEW_SUCCESS,
  payload: {
    data: data,
  },
});
// From Album screen
export const listOwnAlbumAlbumViewSuccess = (data) => ({
  type: OWN_ALBUM_ALBUM_VIEW_SUCCESS,
  payload: {
    data: data,
  },
});
// from Album screen for shared album
export const listSharedAlbumAlbumViewSuccess = (data) => ({
  type: SHARED_ALBUM_ALBUM_VIEW_SUCCESS,
  payload: {
    data: data,
  },
});

// From home screen for shared album
export const listSharedAlbumSuccess = (data) => ({
  type: SHARED_ALBUM_SUCCESS,
  payload: {
    data: data,
  },
});

/** UPDATE INVITE CODE  */
export const subscribeApiCall = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: SUBSCRIBE_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: SUBSCRIBE_PLAN,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: SUBSCRIBE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SUBSCRIBE_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//** UPDATE INVITE CODE  */
export const updateInviteCodeApiCall = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: UPDATE_INVITE_CODE_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: UPDATE_INVITE_CODE,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: UPDATE_INVITE_CODE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_INVITE_CODE_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//** GETTING/SETTING NOTIFICATION STATUS  */
export const notificationStatusApiCall = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: NOTIFICATION_SETTING_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: NOTIFICATION_SETTING,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({
          type: NOTIFICATION_SETTING_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: NOTIFICATION_SETTING_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

// Upload Staging api and integration

export const uploadImg = (param) => (dispatch) => {
  {
    dispatch({ type: UPLOAD_IMAGE_REQUEST, payload: {} });
    const headerObj = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    };
    return axios({
      method: "post",
      url: UPLOAD_IMAGES,
      headers: headerObj,
      data: param,
    })
      .then((response) => {
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPLOAD_IMAGE_FAILURE, payload: error });
      });
  }
};

export const uploadImgAddNewAlbum = (param) => (dispatch) => {
  {
    dispatch({ type: ADD_NEW_ALB_UPLOAD_IMAGE_REQUEST, payload: {} });
    const headerObj = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    };
    return axios({
      method: "post",
      url: UPLOAD_IMAGES,
      headers: headerObj,
      data: param,
    })
      .then((response) => {
        dispatch({
          type: ADD_NEW_ALB_UPLOAD_IMAGE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: ADD_NEW_ALB_UPLOAD_IMAGE_FAILURE, payload: error });
      });
  }
};

export const updateAlbumImageUpload = (param) => (dispatch) => {
  {
    console.log("UPDATE_ALB_UPLOAD_IMAGE_REQUEST ==>", param);
    dispatch({ type: UPDATE_ALB_UPLOAD_IMAGE_REQUEST, payload: {} });
    const headerObj = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    };
    return axios({
      method: "post",
      url: UPLOAD_IMAGES,
      headers: headerObj,
      data: param,
    })
      .then((response) => {
        console.log("UPDATE_ALB_UPLOAD_IMAGE_SUCCESS ===>", response);
        dispatch({
          type: UPDATE_ALB_UPLOAD_IMAGE_SUCCESS,
          payload: response.data,
        });
        navigate("Home");
      })
      .catch((error) => {
        console.log("UPDATE_ALB_UPLOAD_IMAGE_FAILURE ===>", error);
        // dispatch({ type: UPDATE_ALB_UPLOAD_IMAGE_FAILURE, payload: error });
        updateAlbumImageUpload(param)
      });
  }
};


//* Getting library Data  *//
export const listAllMedia = (data) => (dispatch) => {
  {
    dispatch({ type: LIST_ALL_MEDIA_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: LIST_ALL_MEDIA,
      headers: headers,
      data: data,
    })
      .then((response) => {
        dispatch({ type: LIST_ALL_MEDIA_SUCCESS, payload: response?.data });
      })
      .catch((error) => {
        dispatch({ type: LIST_ALL_MEDIA_FAILURE, payload: error });
      });
  }
};

//** Geting Album List   **//

export const listAlbum = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: LIST_ALBUM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: LIST_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: LIST_ALBUM_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LIST_ALBUM_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const getdMedialistbyAlbum = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: MEDIA_LIST_BY_ITEM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: MEDIA_LIST_BY_ITEM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: MEDIA_LIST_BY_ITEM_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: MEDIA_LIST_BY_ITEM_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const sendappinvitation = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: SEND_APP_INVITATION_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: SEND_APP_INVITATION,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: SEND_APP_INVITATION_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SEND_APP_INVITATION_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const inviteuserlist = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: INVITED_USER_LIST_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: INVITED_USER_LIST,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: INVITED_USER_LIST_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: INVITED_USER_LIST_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const uploadMedia = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: UPLOAD_MEDIA_REQUEST, payload: {} });

    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    };

    return axios({
      method: "post",
      url: UPLOAD_MEDIA,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: UPLOAD_MEDIA_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPLOAD_MEDIA_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//   Calling api for getting own album data on Shared view

export const listsOwnAlbumOnSharedView = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: OWN_ALBUM_SHARED_VIEW_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: OWN_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({
          type: OWN_ALBUM_SHARED_VIEW_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: OWN_ALBUM_SHARED_VIEW_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//   Calling api for getting own album data on Album view

export const listsOwnAlbumOnAlbumScreen = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: OWN_ALBUM_ALBUM_VIEW_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: OWN_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({
          type: OWN_ALBUM_ALBUM_VIEW_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: OWN_ALBUM_ALBUM_VIEW_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//   Calling api for getting own album data home view

export const listsOwnAlbum = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: OWN_ALBUM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: OWN_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: OWN_ALBUM_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: OWN_ALBUM_FAILURE, payload: error });
      });
  } else {
    //  showAlert(globals.warning, globals.noInternet)
    //  Alert.alert(globals.warning, globals.noInternet);
  }
};

export const listsSharedAlbumOnAlbumScreen = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: SHARED_ALBUM_ALBUM_VIEW_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: SHARED_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({
          type: SHARED_ALBUM_ALBUM_VIEW_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: SHARED_ALBUM_ALBUM_VIEW_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//   Calling api for getting Shared album data on home screen

export const listsSharedAlbum = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: SHARED_ALBUM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: SHARED_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: SHARED_ALBUM_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SHARED_ALBUM_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//** GET USER SPACE */

//* Getting library Data *//
export const listplans = (data) => (dispatch) => {
  // let data = { sessid: sessionId };
  if (globals.isInternetConnected == true) {
    dispatch({ type: LIST_PLANS_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: LIST_PLANS,
      headers: headers,
      data: data,
    })
      .then((response) => {
        dispatch({ type: LIST_PLANS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LIST_PLANS_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//////////////  getNotificationList
export const getNotificationList = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: NOTIFICATION_LIST_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: NOTIFICATION_LIST,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: NOTIFICATION_LIST_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

/* Delete User Media Data from home page */
export const deleteUserMedia = (data) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: DELETE_USER_MEDIA_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: DELETE_USER_MEDIA,
      headers: headers,
      data: data,
    })
      .then((response) => {
        dispatch({ type: DELETE_USER_MEDIA_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_USER_MEDIA_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//** Delete user media from album detail  **//
export const deleteUserMediaAlbumDetail = (data) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: DELETE_USER_MEDIA_ALBUM_DETAIL_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: DELETE_USER_MEDIA,
      headers: headers,
      data: data,
    })
      .then((response) => {
        dispatch({
          type: DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_USER_MEDIA_ALBUM_DETAIL_FAILURE,
          payload: error,
        });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

/* Delete Album  */
export const deleteAlbum = (data) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: DELETE_ALBUM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: DELETE_ALBUM,
      headers: headers,
      data: data,
    })
      .then((response) => {
        dispatch({ type: DELETE_ALBUM_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        dispatch({ type: DELETE_ALBUM_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

/// update Album name
export const updateAlbumName = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: UPDATE_ALBUM_NAME_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };
    return axios({
      method: "post",
      url: UPDATE_ALBUM_NAME,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: UPDATE_ALBUM_NAME__SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_ALBUM_NAME_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

/// update Album name
export const shareAlbumToUserApi = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: SHARE_ALBUM_TO_USER_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: USER_SHARED_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: SHARE_ALBUM_TO_USER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SHARE_ALBUM_TO_USER_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

//** UPDATE INVITE CODE  */
export const albumListOfUser = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: ALBUM_LIST_OF_USER_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: ALBUM_LIST_OF_USER,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: ALBUM_LIST_OF_USER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ALBUM_LIST_OF_USER_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const revokeShareAlbum = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: REVOKE_SHARE_ALBUM_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: REVOKE_SHARE_ALBUM,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: REVOKE_SHARE_ALBUM_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: REVOKE_SHARE_ALBUM_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const checkAlbumName = (param) => (dispatch) => {
  if (globals.isInternetConnected == true) {
    dispatch({ type: CHECK_ALBUM_NAME_REQUEST, payload: {} });

    const headers = {
      "Content-Type": "application/json",
    };

    return axios({
      method: "post",
      url: CHECK_ALBUM_NAME,
      headers: headers,
      data: param,
    })
      .then((response) => {
        dispatch({ type: CHECK_ALBUM_NAME_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: CHECK_ALBUM_NAME_FAILURE, payload: error });
      });
  } else {
    Alert.alert(globals.warning, globals.noInternet);
  }
};

export const albumIdInDetailToGet = (param) => (dispatch) => {
  dispatch({ type: SAVE_ALBUM_ID, payload: param });
};

export const albumDetailSuccessLocalData = (param) => (dispatch) => {
  dispatch({ type: ALBUM_DETAIL_SUCCESS_LOCAL_DATA, payload: param });
};
