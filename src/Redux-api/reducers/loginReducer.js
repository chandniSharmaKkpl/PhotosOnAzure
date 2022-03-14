
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    
  } from "../constant";

  const initialState = {
    error: {},
    loginResponse: {},
    logoutResponse:{},
    isRequesting: false
}

const LoginReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case LOGIN_REQUEST:{
          return {
          //  ...state, 
            loginResponse: {},
            isRequesting: true,
            error: {}
          };
        }
        case LOGIN_SUCCESS:{
          return {
           // ...state, 
            loginResponse: action.payload,
            isRequesting: false,
            error: {}
          };
        }
        case LOGIN_FAILURE:{
          return {
          //  ...state, 
            loginResponse: action.payload.error,
            isRequesting: false,
            error: {}

          };
        }

        case LOGOUT_REQUEST:{
          return {
          //  ...state, 
            logoutResponse: {},
            isRequesting: true,
            error: {}
          };
        }
        case LOGOUT_SUCCESS:{
          return {
           // ...state, 
            logoutResponse: action.payload,
            isRequesting: false,
            error: {}
          };
        }
        case LOGOUT_FAILURE:{
          return {
          //  ...state, 
            logoutResponse: action.payload.error,
            isRequesting: false,
            error: {}

          };
        }
        default:
            return state;
        }
    }


export default LoginReducer;