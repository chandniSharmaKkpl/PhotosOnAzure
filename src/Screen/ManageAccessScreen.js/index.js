import React, { useState } from "react";
import {
  StatusBar,
  Text,
  View,
  Keyboard,
  BackHandler,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./style";
import { Header } from "../../Component/Header";
import { AppImages, AppColor } from "../../Theme";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Component/auth/Spinner";
import AuthContext from "../../context/AuthContext";
import FastImage from "react-native-fast-image";
import { notifyMessage } from "../../Component/AlertView";
import Button from "../../Component/auth/Button";
import AppConstants from "../../Theme/AppConstant";
import { useRoute } from "@react-navigation/core";
import {
  albumListOfUser,
  revokeShareAlbum,
} from "../../Redux-api/actions/Home";
import { AZURE_BASE_URL } from "../../Redux-api/endPoints";
import Icon from "react-native-vector-icons/AntDesign";
import { ALBUM_LIST_OF_USER_SUCCESS } from "../../Redux-api/constant";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const ManageAccess = (props) => {
  const { user } = React.useContext(AuthContext);

  const [pageCountSharedAlbum, setPageCountSharedAlbum] = React.useState(1); // Pagination shared album
  const [arrayAlbumShared, setArrayAlbumShared] = React.useState([]); //Shared album
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [isSharedAlbum, setIsSharedAlbum] = React.useState(false); // Manage either own album or album

  var countBack = 0;
  const route = useRoute();

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    callApiToGetUserAlbums("effect", 1);

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [route.params]);

  const callApiToGetUserAlbums = (callFrom, count) => {
    if (data.HomeReducer.revokedUser) {
      setIsApiCall(true);
      dispatch(
        albumListOfUser({
          sessid: user.sessid ? user.sessid : "",
          page: count,
          user_id: data.HomeReducer.revokedUser.user_id,
        })
      );
    }
  };

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  //navigate to view album detail screen
  const gotoAlbumDetails = (item) => {
    var itemAccess = "";
    {
      itemAccess = item.access;
    }
    item.isSharedAlbum = true;
    props.navigation.navigate("AlbumDetailScreen", {
      albumdetail: item,
      access: itemAccess,
      onReturn: () => {
        refreshAlbumList(data);
      },
    });
  };

  const refreshAlbumList = (data) => {
    setPageCountSharedAlbum(1);
    arrayAlbumShared.length = 0; // Make empty so show new data
    callApiToGetUserAlbums("", 1);
  };

  const callApiToRevoke = (arrayRevokeAlbum) => {
    setIsApiCall(true);
    let param = { sessid: user.sessid, album_data: arrayRevokeAlbum };
    dispatch(revokeShareAlbum(param));
  };

  const checkResponseCode = () => {
    if (isApiCall) {
      if (
        data.HomeReducer &&
        data.HomeReducer.albumListOfUserData &&
        data.HomeReducer.albumListOfUserData.data &&
        data.HomeReducer.albumListOfUserData.errorCode
      ) {
        setIsApiCall(false);
        data.HomeReducer.albumListOfUserData.errorCode = "";
        setArrayAlbumShared(data.HomeReducer.albumListOfUserData.data.data);
      }

      if (
        data.HomeReducer &&
        data.HomeReducer.revokeShareAlbumData &&
        data.HomeReducer.revokeShareAlbumData.errorCode
      ) {
        if (
          data.HomeReducer.revokeShareAlbumData.errorCode ===
          AppConstants.constant.ALBUM_REVOKED
        ) {
          data.HomeReducer.revokeShareAlbumData.errorCode = null;
          props.navigation.goBack();
        } else {
          if (
            data.HomeReducer.revokeShareAlbumData.errorCode ===
              AppConstants.constant.REVOKE_FAIL &&
            data.HomeReducer.revokeShareAlbumData.message
          ) {
            notifyMessage(data.HomeReducer.revokeShareAlbumData.message);
            data.HomeReducer.revokeShareAlbumData.errorCode = null;
          }
        }
        setIsApiCall(false);
      }
    }
  };

  const onClickRevoke = () => {
    let arrayRevokeAlbum = [];
    arrayAlbumShared.map((item) => {
      if (item.isRevoke) {
        arrayRevokeAlbum.push({
          album_id: item.album_id,
          shared_with: [item.shared_with],
        });
      }
    });
    if (arrayRevokeAlbum && arrayRevokeAlbum.length > 0) {
      Alert.alert(
        AppConstants.constant.ALERT,
        AppConstants.constant.ARE_YOU_SURE_ABOUT_REVOKE_USER_ACCESS,
        [
          {
            text: AppConstants.constant.YES,
            onPress: () => callApiToRevoke(arrayRevokeAlbum),
          },
          {
            text: AppConstants.constant.NO,
            onPress: () => console.log(""),
          },
        ]
      );
    } else {
      notifyMessage(AppConstants.constant.PLEASE_SELECT_ONE_ALBUM_TO_REVOKE);
    }
  };

  const editAlbumAccess = (item) => {
    let itemTemp = item;

    if (itemTemp.isRevoke) {
      itemTemp.isRevoke = !itemTemp.isRevoke;
    } else {
      itemTemp.isRevoke = true;
    }
    let index = arrayAlbumShared.indexOf(item);

    arrayAlbumShared[index] = itemTemp;
    setArrayAlbumShared(arrayAlbumShared);
    data.HomeReducer.albumListOfUserData.data.data = arrayAlbumShared;
    dispatch({
      type: ALBUM_LIST_OF_USER_SUCCESS,
      payload: data.HomeReducer.albumListOfUserData.data,
    });
  };

  // render flailist of own and shared album
  const renderList = ({ item }) => {
    let containerName = item.container;

    let imageUrl = AZURE_BASE_URL + containerName + "/" + item.file_name;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={
          item.isRevoke
            ? styles.renderItemContainerRed
            : styles.renderItemContainer
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.innerContainer,
            {
              width: isSharedAlbum ? width * 0.88 : width * 0.75,
            },
          ]}
        >
          {item.file_name ? (
            <FastImage
              style={styles.image}
              source={{
                uri: imageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.viewAlbumPlaceHolder}>
              <View style={styles.viewContainImg}>
                <FastImage
                  tintColor={"red"}
                  style={styles.imageFolder}
                  source={require("../../assets/images/Folder_Blue.png")}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>
          )}
          <View style={{ marginLeft: 8 }}>
            <Text
              numberOfLines={1}
              style={[
                styles.albumText,
                {
                  width: width * 0.4,
                  fontFamily: "MuseoSlab-300",
                  fontSize: 18,
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={
                (styles.createText,
                {
                  width: width * 0.4,
                  color: "#0E365D",
                  fontFamily: "MuseoSlab-300",
                  fontSize: 10,
                })
              }
            >
              {isSharedAlbum ? item.created_at : item.created_date}
            </Text>
          </View>
        </TouchableOpacity>

        {item.isRevoke ? (
          <View style={styles.viewOutside}>
            <TouchableOpacity
              onPress={() => editAlbumAccess(item)}
              style={[
                styles.iconView,
                {
                  borderBottomEndRadius: 20,
                },
              ]}
            >
              <Icon
                style={{ margin: 5, marginHorizontal: 10, borderRadius: 20 }}
                name={"minussquareo"}
                size={20}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewOutside}>
            <TouchableOpacity
              onPress={() => editAlbumAccess(item)}
              style={[styles.iconView]}
            >
              <Icon
                style={{ margin: 5, marginHorizontal: 10, borderRadius: 20 }}
                name={"checksquare"}
                size={20}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      //
    );
  };
  // distict SharedAlbumArray
  const distictSharedAlbumArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["album_id"], x])).values(),
    ];
    return distinctArray;
  };

  const loadMoreData = () => {
    if (
      data.HomeReducer.albumListOfUserData &&
      data.HomeReducer.albumListOfUserData.data
    )
      if (
        data.HomeReducer.albumListOfUserData.data.totalPages >=
          pageCountSharedAlbum &&
        arrayAlbumShared &&
        arrayAlbumShared.length <
          data.HomeReducer.albumListOfUserData.data.totalAlbumCount
      ) {
        let dataToSet = pageCountSharedAlbum + 1;
        setPageCountSharedAlbum(dataToSet);

        callApiToGetUserAlbums("loadMore", dataToSet);
      }
  };

  return (
    <>
      {checkResponseCode()}
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={AppColor.colors.TITLE_BLUE}
      />

      <View style={{ flex: 1 }}>
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
          <Text style={styles.albumText}>Shared Albums with User</Text>
        </View>

        <View style={[{ marginTop: 0, flex: 1, marginBottom: 25 }]}>
          <FlatList
            style={{ flex: 1 }}
            data={distictSharedAlbumArray(arrayAlbumShared)}
            extraData={distictSharedAlbumArray(arrayAlbumShared)}
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              loadMoreData();
            }}
            keyExtractor={(item, index) => item.album_id.toString()}
          />

          {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
        </View>
        <View style={styles.buttonSave}>
          <Button color={AppColor.colors.RED} onPress={onClickRevoke}>
            Revoke
          </Button>
        </View>
      </View>
    </>
  );
};
export default ManageAccess;
