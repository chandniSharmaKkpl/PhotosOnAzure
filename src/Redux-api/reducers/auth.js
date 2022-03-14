import {
    
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    EDIT_EMAIL_REQUEST,
  EDIT_EMAIL_SUCCESS,
  EDIT_EMAIL_FAILURE,

    } from "../constant";
    
    const initialState = {
        error: {},
        data: {},
        isRequesting: false
    }
    const AuthReducer = (state = initialState, action) => {
      
      switch (action.type) {
        case EDIT_PROFILE_REQUEST:{
          return {
            ...state, 
            data: {},
            isRequesting: true,
            error: {}
          };
        }
        case EDIT_PROFILE_SUCCESS:{
          return {
            ...state, 
            data: action.payload,
            isRequesting: false,
            error: {}
          };
        }
        case EDIT_PROFILE_FAILURE:{
          return {
            ...state, 
            data: action.payload.error,
            isRequesting: false,
            error: {}

          };
        }

        case EDIT_EMAIL_REQUEST:{
          return {
            ...state, 
            data: {},
            isRequesting: true,
            error: {}
          };
        }
        case EDIT_EMAIL_SUCCESS:{
          return {
            ...state, 
            data: action.payload,
            isRequesting: false,
            error: {}
          };
        }
        case EDIT_EMAIL_FAILURE:{
          return {
            ...state, 
            data: action.payload.error,
            isRequesting: false,
            error: {}

          };
        }
        
        default:
          return state;
      }
      
    };
    
    export default AuthReducer;