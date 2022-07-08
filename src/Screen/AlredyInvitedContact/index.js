import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  PermissionsAndroid,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Keyboard,
  Platform,
  Pressable,
  BackHandler,
  Linking,
} from "react-native";
import styles from "./style";
import stylesAlbum from "../Album/style";
import Spinner from "../../Component/auth/Spinner";
import AppConstants from "../../Theme/AppConstant";
import { Header } from "../../Component/Header";
import Search from "../../Component/Search";
import { AppImages } from "../../Theme";
import { inviteuserlist } from "../../Redux-api/actions/Home";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { useTheme, Avatar } from "react-native-paper";
import { checkStringContainsSpecialChar } from "../../common";
import Contacts from "react-native-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import { notifyMessage } from "../../Component/AlertView";

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export const AlredyInviteContact = (props) => {
  let [myContact, setMyContact] = useState([]); /// MyContact list(who have this app, installed by invited code)
  let [masterDataSource, setMasterDataSource] = useState([]);
  let [searchText, setSearchText] = useState("");
  const flatListRef = useRef();
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const { setUserData } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [count, setCount] = useState(0);

  var countBack = 0;

  const getCounterAndroid = async () => {
    try {
      const value = await AsyncStorage.getItem("Permission");
      if (value !== null) {
        // value previously stored
        const clickCount = JSON.parse(value).requestCount;
        return clickCount;
      } else {
        return 0;
      }
      // return value?.requestCount || 0
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const setCounterAndroid = async (value) => {
    try {
      const ContactPermission = {
        requestCount: value,
      };
      const jsonValue = JSON.stringify(ContactPermission);
      await AsyncStorage.setItem("Permission", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      callinviteuserlistApi();
    });

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };

    // flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }, []);

  React.useEffect(() => {
    if (searchText && searchText.length !== 0) {
      if (checkStringContainsSpecialChar(searchText)) {
        notifyMessage(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
        return;
      }
    }
    if (searchText) {
      const newData = masterDataSource.filter(function (item) {
        let final_names = item.full_name;

        const itemData = final_names
          ? final_names.toUpperCase()
          : "".toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMyContact(newData);
      setSearchText(searchText);
    } else {
      setMyContact(masterDataSource);
      setSearchText(searchText);
    }
  }, [searchText]);

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;

    if (countBack > 1) {
      Alert.alert(
        AppConstants.constant.EXIT_APP,
        AppConstants.constant.WANT_TO_EXIT_APP,
        [
          {
            text: AppConstants.constant.CANCEL,
            onPress: () => (countBack = 0),
            style: "cancel",
          },
          {
            text: AppConstants.constant.OK,
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      setSearchText("");
      props.navigation.goBack();
    }
    return true;
  };

  const requestReadContactPermissionAndroid = async () => {
    try {
      const preCount = await getCounterAndroid();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      setPermissionGranted(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setSearchText("");
        props.navigation.navigate("InviteContact");
      } else {
        setCounterAndroid(preCount + 1);
        if (preCount >= 2) {
          Alert.alert(
            AppConstants.constant.ALERT,
            AppConstants.constant.USER_GO_TO_SETTING,

            [
              {
                text: AppConstants.constant.CANCEL,
                onPress: () => (countBack = 0),
                style: "cancel",
              },
              {
                text: AppConstants.constant.OK,
                onPress: () => Linking.openSettings(),
              },
            ],
            {
              cancelable: false,
            }
          );
        }
        // requestReadContactPermissionAndroid();
      }
    } catch (err) {
      console.log("requestReadContactPermissionAndroid", err);
    }
  };

  const requestReadContactPermissionIos = async () => {
    try {
      Contacts.checkPermission().then((permission) => {
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED

        if (permission === "authorized") {
          setSearchText("");
          props.navigation.navigate("InviteContact");
        } else {
          againContactRequest();
        }
      });
    } catch (error) {}
  };

  const againContactRequest = async () => {
    try {
      const preCount = await getCounterAndroid();

      Contacts.requestPermission().then((permission) => {
        if (permission === "authorized") {
          setSearchText("");
          props.navigation.navigate("InviteContact");
        } else {
          setCounterAndroid(preCount + 1);
          if (preCount >= 1) {
            Alert.alert(
              AppConstants.constant.ALERT,
              AppConstants.constant.USER_GO_TO_SETTING,

              [
                {
                  text: AppConstants.constant.CANCEL,
                  onPress: () => (countBack = 0),
                  style: "cancel",
                },
                {
                  text: AppConstants.constant.OK,
                  onPress: () => Linking.openSettings(),
                },
              ],
              {
                cancelable: false,
              }
            );
          }
        }
      });
    } catch (error) {}
  };
  // distict contacts
  const distictContact = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["user_id"], x])).values(),
    ];
    return distinctArray;
  };

  const callinviteuserlistApi = () => {
    let param = {
      sessid: user.sessid ? user.sessid : "",
      page: currentPage,
    };
    setIsApiCall(true);
    dispatch(inviteuserlist(param));
    {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderMyContactList = ({ item }) => {
    return (
      <View
        activeOpacity={1}
        style={[styles.renderItemContainer, { backgroundColor: "#eff4f9" }]}
      >
        <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
          <Avatar.Icon icon="account" style={styles.image} />

          <View style={{ marginLeft: 5 }}>
            <Text
              numberOfLines={1}
              style={[stylesAlbum.albumText, { fontSize: 18 }]}
            >
              {item.full_name}
            </Text>
            <Text
              numberOfLines={1}
              style={(styles.createText, { color: "#0E365D", fontSize: 12 })}
            >
              {item.phone}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onClickSearch = () => {
    Keyboard.dismiss();
    if (searchText && searchText.length !== 0) {
      if (checkStringContainsSpecialChar(searchText)) {
        notifyMessage(AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION);
        return;
      }
      if (searchText) {
        const newData = masterDataSource.filter(function (item) {
          let final_names = item.full_name;

          const itemData = final_names
            ? final_names.toUpperCase()
            : "".toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setMyContact(newData);
        setSearchText(searchText);
      } else {
        setMyContact(masterDataSource);
        setSearchText(searchText);
      }
    } else {
      setMyContact(masterDataSource);
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

  const checkMyContactResponseCode = () => {
    if (
      data.HomeReducer &&
      data.HomeReducer.invitedUserList &&
      data.HomeReducer.invitedUserList.responseCode
    ) {
      if (
        data.HomeReducer.invitedUserList.responseCode ===
          AppConstants.constant.FAILURE &&
        data.HomeReducer.invitedUserList.errorCode ===
          AppConstants.constant.NO_INVITED_USER
      ) {
        alertLogout(data.HomeReducer.invitedUserList.message);
      } else {
        setMyContactData();
      }
    }
  };
  const setMyContactData = () => {
    if (
      data.HomeReducer.invitedUserList.responseCode &&
      data.HomeReducer.invitedUserList.responseCode ===
        AppConstants.constant.SUCCESS
    ) {
      // Checking with length 0 to prevent re-rendering

      if (isApiCall) {
        setIsApiCall(false);
        if (myContact.length > 0) {
          //paging case need to append data in existing array
          setMyContact(
            myContact.concat(data.HomeReducer.invitedUserList.data.data)
          );
          setMasterDataSource(
            myContact.concat(data.HomeReducer.invitedUserList.data.data)
          );
        } else {
          // Initially when array length 0 add objects
          setMyContact(data.HomeReducer.invitedUserList.data.data);
          setMasterDataSource(data.HomeReducer.invitedUserList.data.data);
        }
      } else {
      }
    }
  };

  const handleLoadMore = () => {
    if (
      data.HomeReducer &&
      data.HomeReducer.invitedUserList &&
      data.HomeReducer.invitedUserList.responseCode &&
      data.HomeReducer.invitedUserList.responseCode ===
        AppConstants.constant.SUCCESS
    ) {
      if (
        data.HomeReducer.invitedUserList.data.totalPages >= currentPage &&
        myContact.length < data.HomeReducer.invitedUserList.data.totalAlbumCount
      ) {
        callinviteuserlistApi(true);
      }
    }
  };

  return (
    <>
      {checkMyContactResponseCode()}
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
            let txt = "";
            setSearchText(txt);
            props.navigation.navigate("Notifications");
          }}
        />
        <View style={styles.album}>
          <Text style={stylesAlbum.textMainTitle}>Search Contact</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Search
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
            numberOfLines={1}
            style={[
              stylesAlbum.albumText,
              { fontWeight: "400", width: "60%", fontFamily: "MuseoSlab-300" },
            ]}
          >
            {"Invited Contacts"}
          </Text>

          <Pressable
            style={styles.invitecontactbuttonview}
            onPress={() => {
              if (Platform.OS === "android") {
                if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
                  setSearchText("");
                  props.navigation.navigate("InviteContact");
                } else {
                  requestReadContactPermissionAndroid();
                  setCount(count + 1);
                }
              } else {
                requestReadContactPermissionIos();
              }
            }}
          >
            <Text style={[styles.invitecontactbuttontext]}>{"My Contact"}</Text>
          </Pressable>
        </View>

        {myContact.length > 0 ? (
          <View
            style={[styles.album, { marginTop: 0, flex: 1, marginBottom: 25 }]}
          >
            <FlatList
              data={distictContact(myContact)}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderMyContactList}
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
