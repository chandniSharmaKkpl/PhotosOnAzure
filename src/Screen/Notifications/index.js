import React, { useState, useRef } from "react";
import {
  Alert,
  FlatList,
  Dimensions,
  StatusBar,
  View,
  Keyboard,
  BackHandler,
} from "react-native";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";

import { AppImages } from "../../Theme";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style";
import AppConstants from "../../Theme/AppConstant";
import { Header } from "../../Component/Header";
import { Text, useTheme } from "react-native-paper";
import Spinner from "../../Component/auth/Spinner";
import SubscriptionError from "../../Component/SubscriptionError";

import { getNotificationList } from "../../Redux-api/actions/Home";
import AuthContext from "../../context/AuthContext";
import { useRoute } from "@react-navigation/core";

const { height, width } = Dimensions.get("screen");
import { NotificationsCard } from "../../Component/NotificationsCard";

export default Notifications = (props) => {
  const { user } = React.useContext(AuthContext);
  const [notifocationList, setNotifocationList] = React.useState([]);
  const [isRefreshing, setisRefreshing] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const route = useRoute();
  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [formErr, setFormError] = React.useState("");
  const { setUserData } = React.useContext(AuthContext);
  const flatListRef = useRef();
  var countBack = 0;
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      callgetNotificationListApi();
    });

    flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // After adding any new object scroll flatlist to the index
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, []);

  const handleBackButtonClick = () => {
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
      props.navigation.goBack();
    }
    return true;
  };

  const distinctDataArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["notification_id"], x])).values(),
    ];

    return distinctArray;
  };

  const callgetNotificationListApi = () => {
    data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
    setIsApiCall(true);
    let param = {
      sessid: user.sessid ? user.sessid : "",
      page: currentPage,
    };
    dispatch(getNotificationList(param));
    {
      setCurrentPage(currentPage + 1);
    }
  };

  const alertShow = () => {
    if (isApiCall) {
      setIsApiCall(false);
    }
  };

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

  const setData = () => {
    if (data.HomeReducer.data.responseCode === AppConstants.constant.SUCCESS) {
      // Checking with length 0 to prevent re-rendering

      if (isApiCall) {
        setIsApiCall(false);
        setisRefreshing(false);
        if (notifocationList.length > 0) {
          //paging case need to append data in existing array
          setNotifocationList(
            notifocationList.concat(data.HomeReducer.data.data.data)
          );
        } else {
          // Initially when array length 0 add objects
          setNotifocationList(data.HomeReducer.data.data.data);
        }
      } else {
      }
    }
  };

  const checkResponseCode = () => {
    if (data.HomeReducer.data && data.HomeReducer.data.errorCode) {
      if (
        data.HomeReducer.data.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.NOTIFICATION}
            errorCode={data.HomeReducer.data.errorCode}
            navigation={props.navigation}
          />
        );
      }
    }
    if (
      data.HomeReducer &&
      data.HomeReducer.data &&
      data.HomeReducer.data.responseCode
    ) {
      if (
        data.HomeReducer.data.errorCode ===
        AppConstants.constant.NO_NOTIFICATION
      ) {
        alertShow();
      } else {
        setData();
      }
    }
  };

  const handleLoadMore = () => {
    if (
      data.HomeReducer &&
      data.HomeReducer.data &&
      data.HomeReducer.data.responseCode &&
      data.HomeReducer.data.responseCode === AppConstants.constant.SUCCESS
    ) {
      if (
        data.HomeReducer.data.data.totalPages >= currentPage &&
        notifocationList.length < data.HomeReducer.data.data.totalMediaCount
      ) {
        callgetNotificationListApi(true);
      }
    }
  };

  const renderList = ({ item, index }) => {
    return (
      <NotificationsCard title={item.title} description={item.description} />
    );
  };

  return (
    <>
      {checkResponseCode()}
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            Keyboard.dismiss();
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          test={"hello"}
          rightBackIcon={AppImages.images.backIcon}
          rightBackIconClick={() => props.navigation.goBack()}
          notificationsClick={() => props.navigation.navigate("Notifications")}
        />
        <View style={styles.album}>
          <Text style={styles.albumText}>Notifications</Text>
        </View>
        {notifocationList && notifocationList.length == 0 ? (
          <View style={styles.album}>
            <Text style={styles.greetingText}>No new notifications</Text>
          </View>
        ) : null}
        <FlatList
          ref={flatListRef}
          data={distinctDataArray(notifocationList)}
          style={{ flex: 1 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
      </View>
    </>
  );
};
