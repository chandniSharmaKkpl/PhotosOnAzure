import React, { useState, useRef } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  Pressable,
  Keyboard,
  BackHandler,
  Share,
} from "react-native";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import styles from "./style";
import Spinner from "../../Component/auth/Spinner";
import AppConstants from "../../Theme/AppConstant";
import { Header } from "../../Component/Header";
import SearchContact from "../../Component/SearchContact";
import { AppConstant, AppImages } from "../../Theme";
import Contacts from "react-native-contacts";
import { sendappinvitation } from "../../Redux-api/actions/Home";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { useTheme, Avatar } from "react-native-paper";
import stylesAlbum from "../Album/style";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
import * as RNLocalize from "react-native-localize";
import { checkStringContainsSpecialChar } from "../../common";
import { notifyMessage } from "../../Component/AlertView";

export const InviteContact = (props) => {
  let [contacts, setContacts] = useState([]); ////Invite contact list
  let [myContact, setMyContact] = useState([]); /// MyContact list(who have this app,, installed by invited code)
  let [masterDataSource, setMasterDataSource] = useState([]);
  let [userinvitedText, setUserinvitedText] = useState("");
  const flatListRef = useRef();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { setUserData } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  let [searchText, setSearchText] = useState("");

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      setSearchText("");
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);

      setLoading(true);
      onGetallContactlist();
    });

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };

    // flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }, [props.navigation]);

  React.useEffect(() => {
    if (searchText && searchText.length !== 0) {
      if (checkStringContainsSpecialChar(searchText)) {
        notifyMessage(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
        return;
      }
    }
    if (searchText && searchText.length !== 0) {
      if (searchText) {
        const newData = masterDataSource.filter(function (item) {
          let final_names =
            Platform.OS == "ios"
              ? item.familyName + " " + item.givenName
              : item.displayName;

          const itemData = final_names
            ? final_names.toUpperCase()
            : "".toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setContacts(newData);
        setSearchText(searchText);
      } else {
        setContacts(masterDataSource);
        setSearchText(searchText);
      }
    } else {
      setContacts(masterDataSource);
      setSearchText(searchText);
    }
  }, [searchText]);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  // call when you want to share on social media via link
  const onshareApp = async (item) => {
    const messageToShow =
      AppConstant.constant.INVITE_CODE_SHARE +
      " " +
      user.user_detail.invite_code;
    try {
      const result = await Share.share({
        message: messageToShow,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          onInviteApicall(item);
        } else {
          onInviteApicall(item);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      notifyMessage(error.message);
    }
  };

  const onInviteApicall = (item) => {
    let phoneNumberGet =
      item &&
      item.phoneNumbers &&
      item.phoneNumbers.length > 0 &&
      item.phoneNumbers[0] &&
      item.phoneNumbers[0].number
        ? item.phoneNumbers[0].number
        : null;

    let phoneNumberTemp = phoneNumberGet.replace(/[^\w\s]/gi, "");

    if (phoneNumberTemp && phoneNumberTemp.length > 0) {
      let currentCountry = RNLocalize.getCountry();

      let final_number = phoneNumberTemp.replace(/ /g, "");

      let param = {
        sessid: user.sessid ? user.sessid : "",
        phone:
          currentCountry === AppConstant.constant.INDIA
            ? final_number
            : final_number.length === 10
            ? final_number.replace(final_number.charAt(0), "61")
            : final_number,
        name:
          Platform.OS == "ios"
            ? item.familyName + " " + item.givenName
            : item.displayName,
      };
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      setIsApiCall(true);
      dispatch(sendappinvitation(param));
    }
  };

  const renderList = ({ item }) => {
    let final_name = item.familyName + " " + item.givenName;
    let userImage = "";

    return (
      <View activeOpacity={1} style={styles.renderItemContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
          <Avatar.Icon icon="account" style={styles.image} />

          <View style={{ marginLeft: 5 }}>
            <Text
              numberOfLines={1}
              style={[stylesAlbum.albumText, { fontSize: 18 }]}
            >
              {Platform.OS == "ios" ? final_name : item.displayName}
            </Text>
            <Text
              numberOfLines={1}
              style={(styles.createText, { color: "#0E365D", fontSize: 12 })}
            >
              {item &&
              item.phoneNumbers.length > 0 &&
              item.phoneNumbers[0] &&
              item.phoneNumbers[0].number
                ? item.phoneNumbers[0].number
                : ""}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onshareApp(item)}
          style={styles.iconView}
        >
          <Image
            style={styles.shareIcon}
            resizeMode="cover"
            source={AppImages.images.share}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onGetallContactlist = async () => {
    await Contacts.getAll()
      .then((contacts) => {
        setContacts(contacts);
        setMasterDataSource(contacts);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    Contacts.checkPermission();
    setLoading(false);
  };

  const onClickSearch = () => {
    Keyboard.dismiss();
    if (searchText && searchText.length !== 0) {
      if (checkStringContainsSpecialChar(searchText)) {
        alert(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
        return;
      }
    }
    if (searchText && searchText.length !== 0) {
      if (searchText) {
        const newData = masterDataSource.filter(function (item) {
          let final_names =
            Platform.OS == "ios"
              ? item.familyName + " " + item.givenName
              : item.displayName;

          const itemData = final_names
            ? final_names.toUpperCase()
            : "".toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setContacts(newData);
        setSearchText(searchText);
      } else {
        setContacts(masterDataSource);
        setSearchText(searchText);
      }
    } else {
      setContacts(masterDataSource);
      setSearchText(searchText);
    }
  };

  const onChangeText = (textSearch) => {
    setSearchText(textSearch);
  };

  const alertLogout = () => {};

  const moveToLoginScreen = () => {
    // Making array and user empty in logout
    removeCurrentUser(); // Remove current logged in user from asyn storage
    dispatch(
      logOutUser({
        sessid: user.sessid ? user.sessid : "",
      })
    );
    setUserData(null);
  };

  const setInviteContactData = () => {
    if (
      data.HomeReducer.sendAppInviteResponse.responseCode ===
      AppConstants.constant.SUCCESS
    ) {
      if (isApiCall) {
        setIsApiCall(false);
        setContacts(data.HomeReducer.sendAppInviteResponse);
        setUserinvitedText(data.HomeReducer.sendAppInviteResponse.message);
      }
    } else {
      if (data.HomeReducer.sendAppInviteResponse.message) {
        // Remove message for showing only one time
        let message = data.HomeReducer.sendAppInviteResponse.message;
        var dict = data.HomeReducer.sendAppInviteResponse;
        dict.message = "";
        data.HomeReducer.sendAppInviteResponse = dict;
        console.log("Messages ===>", message);
        notifyMessage(message);
      }
    }
  };

  const checkInviteResponseCode = () => {
    if (data.HomeReducer && data.HomeReducer.sendAppInviteResponse) {
      if (
        data.HomeReducer.sendAppInviteResponse.errorCode &&
        data.HomeReducer.sendAppInviteResponse.errorCode ===
        AppConstants.constant.NOT_AUTHORIZED
        ) {
          alertLogout();
        } else {
        setInviteContactData();
      }
    }
  };

  const handleLoadMore = () => {
    if (data.HomeReducer.data.responseCode === AppConstants.constant.SUCCESS) {
      if (
        data.HomeReducer.data.sendAppInviteResponse.totalPages >= currentPage &&
        myContact.length <
          data.HomeReducer.data.sendAppInviteResponse.totalAlbumCount
      ) {
        callinviteuserlistApi(true);
      }
    }
  };

  return (
    <>
      {checkInviteResponseCode()}
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            Keyboard.dismiss();
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          test={"hello"}
          rightBackIcon={AppImages.images.backIcon}
          rightBackIconClick={() => {
            setSearchText("");
            props.navigation.goBack();
          }}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => {
            setSearchText("");
            props.navigation.navigate("Notifications");
          }}
        />
        <View style={styles.album}>
          <Text style={stylesAlbum.textMainTitle}>{"Search Contact"}</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <SearchContact
            onClickCalendar={() => {}}
            onClickSearch={onClickSearch}
            value={searchText}
            onChangeText={onChangeText}
            placeholder={"Search by Contact Name"}
            isCalendar={false}
            searchTxt={searchText}
          />
        </View>
        <View
          style={[
            styles.album,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text
            style={[
              stylesAlbum.albumText,
              { fontWeight: "400", fontFamily: "MuseoSlab-300" },
            ]}
          >
            {"List of Contacts"}
          </Text>
        </View>

        {contacts.length > 0 ? (
          <View
            style={[styles.album, { marginTop: 0, flex: 1, marginBottom: 25 }]}
          >
            <FlatList
              style={{ flex: 1 }}
              data={contacts}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View
            style={[
              styles.album,
              { flex: 1, alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text style={[styles.noconatct]}>{"No users."}</Text>
          </View>
        )}
      </Pressable>
      {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
    </>
  );
};
