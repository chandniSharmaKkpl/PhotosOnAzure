const constant = {
  // app constant
  fullName: "Full Name",
  emailId: "Email Id",
  contactNumber: "Contact Number",
  setPassword: "Set Password",
  confirmPassword: "Confirm Password",
  AZURE_KEY: "azure_key",

  AES_KEY: "r^84%Eer",
  AES_IV: "9it73esd",
  CONTAINER_ACCOUNT: "onlinephotos26feb",
  SENDER_ID: "57143668188",
  CURRENT_USER: "CurrentUser",

  MAX_SELECTION_QTY: 5,

  // Word constant
  AES_KEY: "r^84%Eer",
  AES_IV: "9it73esd",
  CONTAINER_ACCOUNT: "onlinephotos26feb",
  SENDER_ID: "57143668188",
  CURRENT_USER: "CurrentUser",
  NEW_ADDED: "New Added",
  // Response code
  SUCCESS: 1,
  FAILURE: 0,
  CURRENT_TOKEN: "Current Token",
  INDIA: "IN",
  UPDATE_SUCCESS: "update_success",
  // Screen/  name
  HOME: "Home",
  NOTIFICATION_DRAWER: "Notification_drawer",
  NOTIFICATION: "Notification",
  ADD_NEW_ALBUM: "AddNewAlbum",
  ALBUM_SCREEN: "AlbumScreen",
  PROFILE: "Profile",
  SHARE_ALBUM_PHOTOS: "Share Album Photos",
  UPDATE_EMAIL: "Update Email",
  LOGOUT: "Logout",

  CHOOSE_FILE_TO_UPLOAD: "Select File to Upload",
  CAPTURE_IMAGE: "Take Photo",
  SELECT_PHOTO_FROM_LIBRARY: "Select Photo from Library",
  CAPTURE_VIDEO: "Capture Video",

  //  Error codes
  INSERT_FAIIL: "insert_fail",
  NOT_AUTHORIZED: "not_authorized",
  ALBUM_NOT_EXIST: "album_not_exist_success",
  YOUR_VERIFICATION_IS_REMAINING: "Email or phone verification is remaining ",
  VERIFY_EMAIL_BEFORE_LOGIN: "verify_email_before_login",
  REGISTER_FAIL: "register_fail",
  SEND_SUCCESS: "send_success",
  INSERT_SUCCESS: "insert_success",
  REQUIRED_FIELD_MISSING: "required_field_missing",
  NO_MEDIA: "no_media",
  PLEASE_LOGIN: "Please login to continue",
  NO_INVITED_USER: "no_invited_users",
  NO_NOTIFICATION: "no_notification",
  REGISTER_FAIL: "register_fail",
  VERIFICATION_FAIL: "verification_fail",
  DELETE_SUCCESS: "delete_success",
  DELETE_FAIL: "delete_fail",
  ALBUM_UPDATE_SUCCESSFULLY: "album_updated_successful",
  ALBUM_NOT_UPDATE: "album_update_failed",
  INVITED_USER_LIST: "invited_user_list",
  OWN_ALBUM_SUCCESSFUL: "own_album_listing_successful",
  ALBUM_SHARED_SUCCESSFULLY: "album_shared",
  ALBUM_SHARED_FAILED: "sharing_fail",
  NOTIFICATION_STATUS_UPDATED: "notification_status_updated",
  SUBSCRIPTION_EXPIRED:
    "subscription_expired" ||
    "subscription_invalid" ||
    "master_subscription_expired",
  PURCHASE_PLAN_OR_USE_INVITE_CODE: "purchase_plan_or_use_invite_code",
  MASTER_SUBSCRIPTION_EXPIRED: "master_subscription_expired",
  SUBSCRIPTION_INVALID: "subscription_invalid",
  INIT_SUCCESS: "init_success",
  REVOKE_FAIL: "revoke_fail",
  SHARED_OTHER_USER_ALBUM_LISTING_SUCCESSFUL:
    "shared_other_user_album_listing_successful",
  ALBUM_REVOKED: "album_revoked",
  ALBUM_CREATION_FAILED: "album_creation_failed",
  VERIFICATION_SUCCESS: "verification_success",

  // Values
  NO_SUBSCRIPTION: "0",
  MONTHLY_PARAM: 1,
  YEARLY_PARAM: 2,
  PAGE_NUMBER : 'pageNumber',

  //In App Purchase product Ids
  //Android 2Excel playstore a/c
  ONE_MONTH_STANDARD_PLAN: "com.onlinephotos.standard_plan",
  YEAR_STANDARD_PLAN: "standard_yearly_plan",
  ONE_MONTH_REGULAR_PLAN: "com.onlinephotos.regular_plan",
  YEAR_REGULAR_PLAN: "regular_yearly_plan",
  ONE_MONTH_PREMIUM_PLAN: "com.onlinephotos.premium_plan",
  YEAR_PREMIUM_PLAN: "premium_yearly_plan",
  BASIC_MONTHLY_PLAN:'com.ofv.basic_monthly',
  BUSINESS_MONTHLY_PLAN:'com.ofv.business_monthly',
  ADVANCED_MONTHLY_PLAN:'com.ofv.advanced_monthly',
  PREMIER_MONTHLY_PLAN:'com.ofv.premier_monthly',

  // iOS
  ONE_MONTH_STANDARD_PLAN_IOS: "com.onlinephotos.standard_plan.iOS",
  YEAR_STANDARD_PLAN_IOS: "YEAR_STANDARD_PLAN_iOS",
  ONE_MONTH_REGULAR_PLAN_IOS: "com.onlinephotos.regular_plan",
  YEAR_REGULAR_PLAN_IOS: "YEAR_REGULAR_PLAN_iOS",
  ONE_MONTH_PREMIUM_PLAN_IOS: "com.onlinephotos.premium_plan.iOS",
  YEAR_PREMIUM_PLAN_IOS: "YEAR_PREMIUM_PLAN_iOS",
  BASIC_MONTHLY_PLAN_IOS: "com.ofv.basic_monthly.iOS",
  BUSINESS_MONTHLY_PLAN_IOS: "com.ofv.business_monthly.iOS",
  ADVANCED_MONTHLY_PLAN_IOS: "com.ofv.advanced_monthly.iOS",
  PREMIER_MONTHLY_PLAN_IOS: "com.ofv.premier_monthly.iOS",

  // //* Android Live IAP productIds  */
  // BASIC_MONTHLY_PLAN: "com.ofv.basic_monthly",
  // ONE_MONTH_STANDARD_PLAN: "com.ofv.standard_monthly",
  // BUSINESS_MONTHLY_PLAN: "com.ofv.business_monthly",
  // ADVANCED_MONTHLY_PLAN: "com.ofv.advanced_monthly",
  // ONE_MONTH_PREMIUM_PLAN: "com.ofv.premium_monthly",
  // PREMIER_MONTHLY_PLAN: "com.ofv.premier_monthly",

  // YEAR_STANDARD_PLAN: "com.ofv.standard_yearly",
  // YEAR_REGULAR_PLAN: "com.ofv.regular_yearly",
  // YEAR_PREMIUM_PLAN: "com.ofv.premium_yearly",
  // ONE_MONTH_REGULAR_PLAN: "com.ofv.regular_monthly",

  // //* iOS Live IAP productIds  *//
  // ONE_MONTH_STANDARD_PLAN_IOS: "com.onlinephotos.standard_plan.iOS",
  // YEAR_STANDARD_PLAN_IOS: "YEAR_STANDARD_PLAN_iOS",
  // ONE_MONTH_REGULAR_PLAN_IOS: "com.onlinephotos.regular_plan",
  // YEAR_REGULAR_PLAN_IOS: "YEAR_REGULAR_PLAN_iOS",
  // ONE_MONTH_PREMIUM_PLAN_IOS: "com.onlinephotos.premium_plan.iOS",
  // YEAR_PREMIUM_PLAN_IOS: "YEAR_PREMIUM_PLAN_iOS",
  // BASIC_MONTHLY_PLAN_IOS:'com.ofv.basic_monthly.iOS',
  // BUSINESS_MONTHLY_PLAN_IOS:'com.ofv.business_monthly.iOS',
  // ADVANCED_MONTHLY_PLAN_IOS:'com.ofv.advanced_monthly.iOS',
  // PREMIER_MONTHLY_PLAN_IOS:'com.ofv.premier_monthly.iOS',

  // Alert
  ALERT: "Alert",
  OK: "Ok",
  CANCEL: "Cancel",
  YES: "Yes",
  NO: "No",
  CHANGE_NAME: "Change name",
  ADD_TO_EXISTING: "Add to existing",

  DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA:
    "Do you want to delete selected item?",
  DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_MEDIA:
    "Do you want to delete selected items?",
  PLEASE_SELECT_ATLEAST_ONE_ITEM: "Please select atleast one item to delete",

  PLEASE_SELECT_ATLEAST_ONE_ALBUM: "Please select atleast one album to delete",
  DO_YOU_WANT_TO_DELETE_ONE_SELECTED_ALBUM:
    "Do you want to delete selected album?",
  DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_ALBUMS:
    "Do you want to delete selected albums?",

  ONLY_ALBUM_CAN_SEARCH_BY_NAME: "Only albums can search by name",
  ALBUM_NAME_SPECIAL_CHAR_VALIDATION: "Special characters not allow",
  ALBUM_NAME_EMPTY_VALIDATION: "Please enter album name",
  ALBUM_IMAGE_VALIDATION: "Please select atleast 1 image",
  ALBUM_VALIDATION: "Please select atleast 1 album",
  UPGRADE_ACCOUNT_ALERT: "Please upgrade your account to store more data",
  ONLINE_FAMILY_VAULT: "Online Family Vault",
  REMIND_ME_LATER: "Remind me later",
  ENTER_INVITE_CODE: "Enter invite code",
  UPGRADE_NOW: "Upgrade Now",
  ONLY_CONTACT_CAN_SEARCH_BY_NAME: "Only contact can search by name",
  INVALID_PHONE_NUMBER: "Invalid phone number",
  YOU_CAN_DELETE_ONLY_OWN_ALBUMS: "You can delete only your own albums",
  MEDIA_SAVED_TO_ALBUM: "Media saved to your Album",
  USER_GO_TO_SETTING:
    "For sharing the album to others you need to give permission for accessing contacts  otherwise you can't share it. ",

  // For library

  SORRY: "Sorry",

  AZURE_CANT_UPLOAD_MULTIPLE_IMAGES_LIBRARY:
    "Server can not upload your few selected photos/videos at this moment",
  AZURE_CANT_UPLOAD_SINGLE_IMAGE_LIBRARY:
    "Server can not upload your one selected photo/video at this moment",
  DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA:
    "Do you want to delete selected item?",
  DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_MEDIA:
    "Do you want to delete selected items?",
  DO_YOU_WANT_TO_DELETE_ALL_ITEMS: "Do you want to delete all items?",

  PLEASE_SELECT_ATLEAST_ONE_ITEM: "Please select atleast one item to delete",

  PLEASE_SELECT_ATLEAST_ONE_ALBUM: "Please select atleast one album to delete",
  DO_YOU_WANT_TO_DELETE_ALL_ALBUMS: "Do you want to delete all albums?",
  DO_YOU_WANT_TO_DELETE_ONE_SELECTED_ALBUM:
    "Do you want to delete selected album?",
  DO_YOU_WANT_TO_DELETE_MULTIPLE_SELECTED_ALBUMS:
    "Do you want to delete selected albums?",

  DO_YOU_WANT_TO_SHARE_ALL_ALBUMS: "Do you want to share all albums?",
  DO_YOU_WANT_TO_SHARE_MULTIPLE_SELECTED_ALBUMS:
    "Do you want to share selected albums?",

  DO_YOU_WANT_TO_SHARE_ONE_SELECTED_ALBUM:
    "Do you want to share selected album?",
  PLEASE_SELECT_ATLEAST_ONE_ITEM_SHARE:
    "Please select atleast one item to share",

  ENTER_ALBUM_NAME_TO_SEARCH: "Please enter text to search",
  ONLY_ALBUM_CAN_SEARCH_BY_NAME: "Only albums can search by name",
  ALBUM_NAME_SPECIAL_CHAR_VALIDATION: "Special characters not allow",
  ALBUM_NAME_EMPTY_VALIDATION: "Please enter album name",
  ALBUM_IMAGE_VALIDATION: "Please select atleast 1 photo/video",
  UPGRADE_ACCOUNT_ALERT: "Please upgrade your account, to store more data",
  ONLINE_FAMILY_VAULT: "Online Family Vault",
  REMIND_ME_LATER: "Remind me later",
  UPGRADE_NOW: "Upgrade Now",
  ONLY_CONTACT_CAN_SEARCH_BY_NAME: "Only contact can search by name",
  INVALID_PHONE_NUMBER: "Invalid phone number",
  YOU_CAN_DELETE_ONLY_OWN_ALBUMS: "You can delete only own albums",
  YOU_CAN_SELECT_MAX_FIVE_MEDIA: "You can select maximum 5 photo/video",
  // For library

  SORRY: "Sorry",

  AZURE_CANT_UPLOAD_MULTIPLE_IMAGES_LIBRARY:
    "Server can not upload your few selected photos/videos at this moment",
  AZURE_CANT_UPLOAD_SINGLE_IMAGE_LIBRARY:
    "Server can not upload your one selected photo/video at this moment",

  // For album creation
  WE_CANT_CREATE_ALBUM:
    "We cant create album with selected media, please try after sometime.",
  OOPS: "Oops!",
  AZURE_CANT_UPLOAD_MULTIPLE_IMAGES:
    "but server can not upload your few selected photos/videos at this moment",
  AZURE_CANT_UPLOAD_SINGLE_IMAGE:
    "but server can not upload your selected photo/video at this moment",
  // For album creation
  WE_CANT_CREATE_ALBUM:
    "We cant create album with selected media, please try after sometime.",
  OOPS: "Oops!",
  AZURE_CANT_UPLOAD_MULTIPLE_IMAGES:
    "but server can not upload your few selected photos/videos at this moment",
  AZURE_CANT_UPLOAD_SINGLE_IMAGE:
    "but server can not upload your selected photo/video at this moment",
  WE_CANT_UPDATE_ALBUM:
    "We cant update album with selected media, please try after sometime.",
  NOTIFICATION_ON_MSG: "You will receive notifications now.",
  NOTIFICATION_OFF_MSG: "You will not receive notifications.",
  PLEASE_TRY_AFTER_SOME_TIME: "Please try after sometime. ",
  CONTACT_ACCESS_PERMISSION_IN_SETTING: "Please allow accessing of contacts",
  ALREADY_PURCHASED: "You have already purchased this plan.",
  ALREADY_ACTIVE_PLAN:
    "You already have an active plan, you can purchase new plan when the current plan will expire.",
  INVITE_CODE_SHARE:
    "I am sharing my OnlineFamilyVault app invitation code with you. Please enter it in the invitation code section of the app and confirm it",
  INVITE_CODE_EMPTY: "Invite code cannot be empty",
  ENTER_SHARED_INVITATION_CODE:
    "You are entering your own invitation code, please enter your shared invitation code",
  THIS_IS_YOUR_CURRENT_EMAIL:
    "This is your current email address, please enter different email address to update",
  ARE_YOU_SURE_ABOUT_REVOKE_USER_ACCESS:
    "Are you sure about revoke user access?",
  PLEASE_SELECT_ONE_ALBUM_TO_REVOKE: "Please select an album to revoke",
  EXIT_APP: "Exit App",
  GO_TO_SETTING : "",
  WANT_TO_EXIT_APP: "Do you want to exit the application?",
  PLEASE_SELECT_DATE: "Please select date",
};
module.exports = {
  constant,
};
