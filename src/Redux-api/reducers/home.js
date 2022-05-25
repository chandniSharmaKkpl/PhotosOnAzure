import {
  UPLOAD_MEDIA_REQUEST,
  UPLOAD_MEDIA_SUCCESS,
  MEDIA_LIST_BY_ITEM_SUCCESS,
  MEDIA_LIST_BY_ITEM_REQUEST,
  MEDIA_LIST_BY_ITEM_FAILURE,
  ALBUM_DETAIL_SUCCESS_LOCAL_DATA,
  UPLOAD_MEDIA_FAILURE,
  LIST_ALL_MEDIA_REQUEST,
  LIST_ALL_MEDIA_SUCCESS,
  LIST_ALL_MEDIA_FAILURE,
  OWN_ALBUM_REQUEST,
  OWN_ALBUM_SUCCESS,
  OWN_ALBUM_FAILURE,
  SHARED_ALBUM_REQUEST,
  SHARED_ALBUM_SUCCESS,
  SHARED_ALBUM_FAILURE,
  GET_USER_SPACE_REQUEST,
  GET_USER_SPACE_SUCCESS,
  GET_USER_SPACE_FAILURE,
  LIST_PLANS_REQUEST,
  LIST_PLANS_SUCCESS,
  LIST_PLANS_FAILURE,
  INVITED_USER_LIST_FAILURE,
  INVITED_USER_LIST_REQUEST,
  INVITED_USER_LIST_SUCCESS,
  SEND_APP_INVITATION_REQUEST,
  SEND_APP_INVITATION_SUCCESS,
  SEND_APP_INVITATION_FAILURE,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_FAILURE,
  NOTIFICATION_LIST_SUCCESS,
  DELETE_USER_MEDIA_REQUEST,
  DELETE_USER_MEDIA_FAILURE,
  DELETE_USER_MEDIA_SUCCESS,

  DELETE_USER_MEDIA_ALBUM_DETAIL_REQUEST,
  DELETE_USER_MEDIA_ALBUM_DETAIL_FAILURE,
  DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS,

  DELETE_ALBUM_REQUEST,
  DELETE_ALBUM_FAILURE,
  DELETE_ALBUM_SUCCESS,
  LIST_ALBUM_REQUEST,
  LIST_ALBUM_SUCCESS,
  LIST_ALBUM_FAILURE,
  UPDATE_ALBUM_NAME_REQUEST,
  UPDATE_ALBUM_NAME__SUCCESS,
  UPDATE_ALBUM_NAME_FAILURE,

  NOTIFICATION_SETTING_REQUEST,
  NOTIFICATION_SETTING_FAILURE,
  NOTIFICATION_SETTING_SUCCESS,

  UPDATE_INVITE_CODE_REQUEST,
  UPDATE_INVITE_CODE_SUCCESS,
  UPDATE_INVITE_CODE_FAILURE,

  OWN_ALBUM_SHARED_VIEW_REQUEST,
  OWN_ALBUM_SHARED_VIEW_SUCCESS,
  OWN_ALBUM_SHARED_VIEW_FAILURE,

  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,

  OWN_ALBUM_ALBUM_VIEW_REQUEST,
  OWN_ALBUM_ALBUM_VIEW_SUCCESS,
  OWN_ALBUM_ALBUM_VIEW_FAILURE,

  SHARED_ALBUM_ALBUM_VIEW_REQUEST,
  SHARED_ALBUM_ALBUM_VIEW_SUCCESS,
  SHARED_ALBUM_ALBUM_VIEW_FAILURE,

  SHARE_ALBUM_TO_USER_REQUEST,
  SHARE_ALBUM_TO_USER_SUCCESS,
  SHARE_ALBUM_TO_USER_FAILURE,

  SELECTED_REVOKED_USER,

  ALBUM_LIST_OF_USER_REQUEST,
  ALBUM_LIST_OF_USER_SUCCESS,
  ALBUM_LIST_OF_USER_FAILURE,

  REVOKE_SHARE_ALBUM_REQUEST,
  REVOKE_SHARE_ALBUM_SUCCESS,
  REVOKE_SHARE_ALBUM_FAILURE,

  CHECK_ALBUM_NAME_REQUEST,
  CHECK_ALBUM_NAME_SUCCESS,
  CHECK_ALBUM_NAME_FAILURE,
  // Upload Staging api and integration

  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,

  ADD_NEW_ALB_UPLOAD_IMAGE_FAILURE,
  ADD_NEW_ALB_UPLOAD_IMAGE_SUCCESS,
  ADD_NEW_ALB_UPLOAD_IMAGE_REQUEST,

  UPDATE_ALB_UPLOAD_IMAGE_FAILURE,
  UPDATE_ALB_UPLOAD_IMAGE_SUCCESS,
  UPDATE_ALB_UPLOAD_IMAGE_REQUEST,
  

  SAVE_ALBUM_ID,
} from "../constant";

const initialState = {
  error: {},
  data: {},
  albumDetailData: {},
  albumDetailLocalData: {},
  library: {},
  ownAlbums: {},
  sharedAlbums: {},
  updateAlbumName: {},
  userSpace: {},
  uploadMedia: {},
  isRequesting: false,
  deleteUserMedia: {},
  deleteAlbum: {},
  deleteUserMediaAlbumDetail: {},
  notificationSetting: {},
  updateInviteCodeData: {},
  ownAlbumSharedViewData: {},
  subscribe: {},
  ownAlbumAlbumView: {},
  sharedAlbumAlbumView: {},
  invitedUserList: {},
  shareAlbumToUserData: {},
  sendAppInviteResponse: {},
  albumIdParam: "",
  revokedUser: '',
  albumListOfUserData: {},
  revokeShareAlbumData: {},
  checkAlbumNameData: {},
  // Upload Staging api and integration
  uploadImages: {},
  uploadImagesAddNewAlbum: {},
updateAlbumUploadImg:{}
};
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {

    case CHECK_ALBUM_NAME_REQUEST: {
      return {
        ...state,
        checkAlbumNameData: {},
        isRequesting: true,
        error: {},
      };
    }
    case CHECK_ALBUM_NAME_SUCCESS: {

      return {
        ...state,
        checkAlbumNameData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case CHECK_ALBUM_NAME_FAILURE: {
      return {
        ...state,
        checkAlbumNameData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case ALBUM_LIST_OF_USER_REQUEST: {
      return {
        ...state,
        albumListOfUserData: {},
        isRequesting: true,
        error: {},
      };
    }
    case ALBUM_LIST_OF_USER_SUCCESS: {
      return {
        ...state,
        albumListOfUserData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case ALBUM_LIST_OF_USER_FAILURE: {
      return {
        ...state,
        albumListOfUserData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case REVOKE_SHARE_ALBUM_REQUEST: {
      return {
        ...state,
        revokeShareAlbumData: {},
        isRequesting: true,
        error: {},
      };
    }
    case REVOKE_SHARE_ALBUM_SUCCESS: {
      return {
        ...state,
        revokeShareAlbumData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case REVOKE_SHARE_ALBUM_FAILURE: {
      return {
        ...state,
        revokeShareAlbumData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case SELECTED_REVOKED_USER: {
      return {
        ...state,
        revokedUser: action.payload
      };
    }

    case SAVE_ALBUM_ID: {
      return {
        ...state,
        albumIdParam: action.payload
      };
    }

    case SHARE_ALBUM_TO_USER_REQUEST: {
      return {
        ...state,
        shareAlbumToUserData: {},
        isRequesting: true,
        error: {},
      };
    }
    case SHARE_ALBUM_TO_USER_SUCCESS: {
      return {
        ...state,
        shareAlbumToUserData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case SHARE_ALBUM_TO_USER_FAILURE: {
      return {
        ...state,
        shareAlbumToUserData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case SUBSCRIBE_REQUEST: {
      return {
        ...state,
        subscribe: {},
        isRequesting: true,
        error: {},
      };
    }
    case SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        subscribe: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case SUBSCRIBE_FAILURE: {
      return {
        ...state,
        subscribe: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case UPDATE_INVITE_CODE_REQUEST: {
      return {
        ...state,
        updateInviteCodeData: {},
        isRequesting: true,
        error: {},
      };
    }
    case UPDATE_INVITE_CODE_SUCCESS: {

      return {
        ...state,
        updateInviteCodeData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case UPDATE_INVITE_CODE_FAILURE: {
      return {
        ...state,
        updateInviteCodeData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    case NOTIFICATION_SETTING_REQUEST: {
      return {
        ...state,
        notificationSetting: {},
        isRequesting: true,
        error: {},
      };
    }
    case NOTIFICATION_SETTING_SUCCESS: {

      return {
        ...state,
        notificationSetting: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case NOTIFICATION_SETTING_FAILURE: {
      return {
        ...state,
        notificationSetting: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    case LIST_ALL_MEDIA_REQUEST: {
      return {
        ...state,
        library: {},
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case LIST_ALL_MEDIA_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        library: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case LIST_ALL_MEDIA_FAILURE: {
      return {
        ...state,
        library: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case UPLOAD_MEDIA_REQUEST: {
      return {
        ...state,
        uploadMedia: {},
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case UPLOAD_MEDIA_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        uploadMedia: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case UPLOAD_MEDIA_FAILURE: {
      return {
        ...state,
        uploadMedia: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    case MEDIA_LIST_BY_ITEM_REQUEST: {
      return {
        ...state,
        deleteUserMedia: {},
        albumDetailData: {},
        isRequesting: true,
        error: {},
      };
    }
    case MEDIA_LIST_BY_ITEM_SUCCESS: {
      return {
        ...state,
        deleteUserMedia: {},
        userSpace: action.payload.data.userSpace,
        albumDetailData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case ALBUM_DETAIL_SUCCESS_LOCAL_DATA: {
      return {
        ...state,
        albumDetailLocalData: action.payload
      };
    }
    case MEDIA_LIST_BY_ITEM_FAILURE: {
      return {
        ...state,
        deleteUserMedia: {},
        albumDetailData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case OWN_ALBUM_SHARED_VIEW_REQUEST: {
      return {
        ...state,
        ownAlbumSharedViewData: {},
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case OWN_ALBUM_SHARED_VIEW_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        ownAlbumSharedViewData: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case OWN_ALBUM_SHARED_VIEW_FAILURE: {
      return {
        ...state,
        ownAlbumSharedViewData: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case OWN_ALBUM_ALBUM_VIEW_REQUEST: {
      return {
        ...state,
        ownAlbumAlbumView: {},
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case OWN_ALBUM_ALBUM_VIEW_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        ownAlbumAlbumView: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case OWN_ALBUM_ALBUM_VIEW_FAILURE: {
      return {
        ...state,
        ownAlbumAlbumView: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }


    case OWN_ALBUM_REQUEST: {
      return {
        ...state,
        ownAlbums: {},
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case OWN_ALBUM_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        ownAlbums: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case OWN_ALBUM_FAILURE: {
      return {
        ...state,
        ownAlbums: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    case SHARED_ALBUM_REQUEST: {
      return {
        ...state,
        userSpace: {},
        sharedAlbums: {},
        isRequesting: true,
        error: {},
      };
    }
    case SHARED_ALBUM_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        sharedAlbums: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case SHARED_ALBUM_FAILURE: {
      return {
        ...state,
        sharedAlbums: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case SHARED_ALBUM_ALBUM_VIEW_REQUEST: {
      return {
        ...state,
        userSpace: {},
        sharedAlbumAlbumView: {},
        isRequesting: true,
        error: {},
      };
    }
    case SHARED_ALBUM_ALBUM_VIEW_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload.data.userSpace,
        sharedAlbumAlbumView: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case SHARED_ALBUM_ALBUM_VIEW_FAILURE: {
      return {
        ...state,
        sharedAlbumAlbumView: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case GET_USER_SPACE_REQUEST: {
      return {
        ...state,
        userSpace: {},
        isRequesting: true,
        error: {},
      };
    }
    case GET_USER_SPACE_SUCCESS: {
      return {
        ...state,
        userSpace: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case GET_USER_SPACE_FAILURE: {
      return {
        ...state,
        userSpace: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    case LIST_PLANS_REQUEST: {
      return {
        ...state,
        data: {},
        isRequesting: true,
        error: {},
      };
    }
    case LIST_PLANS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case LIST_PLANS_FAILURE: {
      return {
        ...state,
        data: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case INVITED_USER_LIST_REQUEST: {
      return {
        ...state,
        invitedUserList: {},
        isRequesting: true,
        error: {},
      };
    }
    case INVITED_USER_LIST_SUCCESS: {
      return {
        ...state,
        invitedUserList: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case INVITED_USER_LIST_FAILURE: {
      return {
        ...state,
        invitedUserList: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case SEND_APP_INVITATION_REQUEST: {
      return {
        ...state,
        sendAppInviteResponse: {},
        isRequesting: true,
        error: {},
      };
    }
    case SEND_APP_INVITATION_SUCCESS: {
      return {
        ...state,
        sendAppInviteResponse: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case SEND_APP_INVITATION_FAILURE: {
      return {
        ...state,
        sendAppInviteResponse: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case NOTIFICATION_LIST_REQUEST: {
      return {
        ...state,
        data: {},
        isRequesting: true,
        error: {},
      };
    }
    case NOTIFICATION_LIST_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case NOTIFICATION_LIST_FAILURE: {
      return {
        ...state,
        data: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case DELETE_USER_MEDIA_REQUEST: {
      return {
        ...state,
        deleteUserMedia: {},
        isRequesting: true,
        error: {},
      };
    }
    case DELETE_USER_MEDIA_SUCCESS: {
      return {
        ...state,
        deleteUserMedia: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case DELETE_USER_MEDIA_FAILURE: {
      return {
        ...state,
        deleteUserMedia: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case DELETE_USER_MEDIA_ALBUM_DETAIL_REQUEST: {
      return {
        ...state,
        deleteUserMediaAlbumDetail: {},
        isRequesting: true,
        error: {},
      };
    }
    case DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS: {
      // console.log("DELETE_USER_MEDIA_ALBUM_DETAIL_SUCCESS  ===>",action.payload);
      return {
        ...state,
        deleteUserMediaAlbumDetail: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case DELETE_USER_MEDIA_ALBUM_DETAIL_FAILURE: {
      return {
        ...state,
        deleteUserMediaAlbumDetail: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case DELETE_ALBUM_REQUEST: {
      return {
        ...state,
        deleteAlbum: {},
        isRequesting: true,
        error: {},
      };
    }
    case DELETE_ALBUM_SUCCESS: {
      return {
        ...state,
        deleteAlbum: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case DELETE_ALBUM_FAILURE: {
      return {
        ...state,
        deleteAlbum: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case LIST_ALBUM_REQUEST: {
      return {
        ...state,
        data: {},
        isRequesting: true,
        error: {},
      };
    }
    case LIST_ALBUM_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case LIST_ALBUM_FAILURE: {
      return {
        ...state,
        data: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    case UPDATE_ALBUM_NAME_REQUEST: {
      return {
        ...state,
        updateAlbumName: {},
        isRequesting: true,
        error: {},
      };
    }
    case UPDATE_ALBUM_NAME__SUCCESS: {
      return {
        ...state,
        updateAlbumName: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case UPDATE_ALBUM_NAME_FAILURE: {
      return {
        ...state,
        updateAlbumName: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }
    // Upload Staging api and integration

    case UPLOAD_IMAGE_REQUEST: {
      return {
        ...state,
        uploadImages: {},
        isRequesting: true,
        error: {},
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        uploadImages: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case UPLOAD_IMAGE_FAILURE: {
      return {
        ...state,
        uploadImages: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    // Add new album 
    case ADD_NEW_ALB_UPLOAD_IMAGE_REQUEST: {
      return {
        ...state,
        uploadImagesAddNewAlbum: {},
        isRequesting: true,
        error: {},
      };
    }
    case ADD_NEW_ALB_UPLOAD_IMAGE_SUCCESS: {
      console.log("ADD_NEW_ALB_UPLOAD_IMAGE_SUCCESS =>", action.payload);
      return {
        ...state,
        uploadImagesAddNewAlbum: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case ADD_NEW_ALB_UPLOAD_IMAGE_FAILURE: {
      return {
        ...state,
        uploadImagesAddNewAlbum: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

     // update existing album 
     case UPDATE_ALB_UPLOAD_IMAGE_REQUEST: {
      return {
        ...state,
        updateAlbumUploadImg: {},
        isRequesting: true,
        error: {},
      };
    }
    case UPDATE_ALB_UPLOAD_IMAGE_SUCCESS: {

      return {
        ...state,
        updateAlbumUploadImg: action.payload,
        isRequesting: false,
        error: {},
      };
    }
    case UPDATE_ALB_UPLOAD_IMAGE_FAILURE: {
      return {
        ...state,
        updateAlbumUploadImg: action.payload.error,
        isRequesting: false,
        error: {},
      };
    }

    default:
      return state;
  }
};

export default HomeReducer;