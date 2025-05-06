import axios from "axios";
import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,

  EDIT_EMAIL_REQUEST,
  EDIT_EMAIL_SUCCESS,
  EDIT_EMAIL_FAILURE,

} from "../constant";
import { Alert, Share } from 'react-native';

import { EDIT_PROFILE, EDIT_EMAIL } from "../endPoints";
import * as globals from "../../Utils/globals";

////// updateProfile API /////////

export const updateProfile = (param) => (dispatch) => {
  if (globals.isInternetConnected == true){
  dispatch({ type: EDIT_PROFILE_REQUEST, payload: {} });

  let headerObj = {};
  headerObj = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  return axios({
    method: "post",
    url: EDIT_PROFILE,
    headers: headerObj,
    data: param,
  })
    .then((response) => {
      console.log("EDIT_PROFILE_SUCCESS ===>", response.data);
      dispatch({ type: EDIT_PROFILE_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log("EDIT_PROFILE_FAILURE ===>", error);
      dispatch({ type: EDIT_PROFILE_FAILURE, payload: error });
    });
  }
  else{
    Alert.alert(globals.warning,globals.noInternet)
  }
};


////// update EMAIL API /////////

export const updateEmail = (param) => (dispatch) => {

  if (globals.isInternetConnected == true){
  dispatch({ type: EDIT_EMAIL_REQUEST, payload: {} });

  const headers = {
    'Content-Type': 'application/json',
  };

  return axios({
    method: "post",
    url: EDIT_EMAIL,
    headers: headers,
    data: param
  })
    .then((response) => {
      dispatch({ type: EDIT_EMAIL_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: EDIT_EMAIL_FAILURE, payload: error });
    });
  }
  else{
    Alert.alert(globals.warning,globals.noInternet)
  }
};