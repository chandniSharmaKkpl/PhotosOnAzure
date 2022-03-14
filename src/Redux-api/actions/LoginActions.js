import axios from "axios";

import {

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
  } from "../constant";

  import { LOGIN_API, LOGOUT_API } from "../endPoints";
  import * as globals from "../../Utils/globals";
import {notifyMessage} from '../../Component/AlertView';   

  export const loginUser = (param) => (dispatch) => {

    if (globals.isInternetConnected == true){

    dispatch({ type: LOGIN_REQUEST, payload: {} });
  
    let headerObj = {};
    headerObj = {
      "Content-Type": "application/json"
    };
  
    return axios({
      method: "post",
      url: LOGIN_API,
      headers: headerObj,
      data: param,
    }).then((response) => {

        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, payload: error });
      });
    }
    else{
      notifyMessage(globals.noInternet)

    }
  };
  

  export const logOutUser = (param) => (dispatch) => {

    if (globals.isInternetConnected == true){

    dispatch({ type: LOGOUT_REQUEST, payload: {} });
    
    let headerObj = {};
    headerObj = {
      "Content-Type": "application/json"
    };
  
    return axios({
      method: "post",
      url: LOGOUT_API,
      headers: headerObj,
      data: param,
    }).then((response) => {
        dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(" logOUT error ===> ", error); 
        dispatch({ type: LOGOUT_FAILURE, payload: error });
      });
    }
    else{
      notifyMessage(globals.noInternet)
    }
  };
  
