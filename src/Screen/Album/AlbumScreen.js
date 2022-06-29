import React, { useState, useRef } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput,
  Keyboard,
  BackHandler,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../Component/auth/Button";
import * as globals from "../../Utils/globals";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { AZURE_BASE_URL } from "../../Redux-api/endPoints";
import AppColor from "../../Theme/AppColor";
import AppConstants from "../../Theme/AppConstant";
import { useRoute } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style";
import { Header } from "../../Component/Header";
import Search from "../../Component/Search";
import Spinner from "../../Component/auth/Spinner";
import { AppImages } from "../../Theme";
import {
  listsOwnAlbumOnAlbumScreen,
  listsSharedAlbumOnAlbumScreen,
  updateAlbumName,
} from "../../Redux-api/actions/Home";
import { checkStringContainsSpecialChar } from "../../common";
import ReactModal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
import AuthContext from "../../context/AuthContext";
import { useTheme } from "react-native-paper";
import FastImage from "react-native-fast-image";
import SubscriptionError from "../../Component/SubscriptionError";
import { notifyMessage } from "../../Component/AlertView";
import VideoCard from "../../Component/VideoCard";

const AlbumScreen = (props) => {
  const [pageCountOwnAlbum, setpageCountOwnAlbum] = React.useState(1); // Pagination own album
  const [pageCountSharedAlbum, setPageCountSharedAlbum] = React.useState(1); // Pagination shared album

  const [isAlbumDropDownOpen, setIsAlbumDropDownOpen] = useState(false); // Own / Shared album ddrop down open
  const { user } = React.useContext(AuthContext);
  let [onopenmediaPicker, setonopenmediaPicker] = useState(false); // for open editAlbum model
  const [arrayAlbumOwn, setArrayAlbumOwn] = React.useState([]); //  own album
  const [arrayAlbumShared, setArrayAlbumShared] = React.useState([]); //Shared album
  const [arrayImages, setArrayImages] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [currentAlbumID, setcurrentAlbumID] = React.useState("");
  const [isClearSearchText, setIsClearSearchText] = useState(false); // Clear search bar text when selecting library
  const [isSharedAlbum, setIsSharedAlbum] = React.useState(false); // Manage either own album or album
  let [searchText, setSearchText] = useState("");
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const { setUserData } = React.useContext(AuthContext);
  const flatListRef = useRef();
  const theme = useTheme();
  const dispatch = useDispatch();
  const route = useRoute();
  const data = useSelector((state) => state);
  const [isClickForSearch, setIsClickForSearch] = useState(false); // When clicking on the search updating the pagecount and list, using this flag in render method of ownAlbum
  const [selectedDate, setSelectedDate] = useState(""); // Assign calendar selected date
  const [loading, setLoading] = React.useState(false);
  const [totalSharedAlbumspace, setTotalSharedAlbumspace] = React.useState(0);
  const [isApiCall, setIsApiCall] = useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [searchAlbumName, setSearchAlbumName] = useState(""); // Search bar text
  const [isAbletocreateNewAlbum, setisAbletocreateNewAlbum] = useState(true);
  const [ownAlbumResponse, setOwnAlbumResponse] = React.useState({});
  const [sharedAlbumResponse, setSharedAlbumResponse] = React.useState({});

  var countBack = 0;

 
  
  React.useEffect(() => {
    // requestReadContactPermission();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    const unsubscribe = props.navigation.addListener("focus", () => {
      setIsAlbumDropDownOpen(false);
      setSearchAlbumName("");
      Keyboard.dismiss();
      data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
      setpageCountOwnAlbum(1);
      arrayAlbumOwn.length = 0; // Make empty so show new data
      callApiToGetOwnAlbumData("", 1);
      //  flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // After adding any new object scroll flatlist to the index
    });
    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      unsubscribe;
    };
  }, [props.navigation]);

  React.useEffect(() => {
    if (searchAlbumName && searchAlbumName.length !== 0) {
      if (checkStringContainsSpecialChar(searchAlbumName)) {
        Alert.alert(
          globals.appName,
          AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION
        );
        return;
      }
    }
    setIsClickForSearch(true);
    // Setting page count 1 and clear array so that only searched data will show in the list.
    if (isSharedAlbum) {
      setPageCountSharedAlbum(1);
      if (arrayAlbumShared && arrayAlbumShared.length > 0) {
        arrayAlbumShared.length = 0;
        setArrayAlbumShared([]);
      }
      callApiToGetSharedAlbum("", 1, searchAlbumName);
    } else {
      setpageCountOwnAlbum(1);
      if (arrayAlbumOwn && arrayAlbumOwn.length > 0) {
        arrayAlbumOwn.length = 0;
        setArrayAlbumOwn([]);
      }
      callApiToGetOwnAlbumData("", 1, searchAlbumName);
    }
  }, [searchAlbumName]);

  const handleBackButtonClick = () => {
    //props.navigation.goBack();
    countBack = countBack + 1;

    if (countBack > 2) {
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
      setSearchAlbumName("");
      props.navigation.goBack();
    }
    return true;
  };

  // serach album name from search bar
  const onChangeText = (textSearch) => {
    setSearchAlbumName(textSearch);
  };

  // press on search button check validation and search album by name
  const onClickSearch = () => {
    filterAlbumBasedOnName(searchAlbumName);
  };

  const filterAlbumBasedOnName = (textToSearch) => {
    if (textToSearch && textToSearch.length !== 0) {
      if (checkStringContainsSpecialChar(textToSearch)) {
        Alert.alert(
          globals.appName,
          AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION
        );
        return;
      }
    }
    setIsClickForSearch(true);
    // Setting page count 1 and clear array so that only searched data will show in the list.
    if (isSharedAlbum) {
      setPageCountSharedAlbum(1);
      if (arrayAlbumShared && arrayAlbumShared.length > 0) {
        arrayAlbumShared.length = 0;
        setArrayAlbumShared([]);
      }
      callApiToGetSharedAlbum("", 1, textToSearch);
    } else {
      setpageCountOwnAlbum(1);
      if (arrayAlbumOwn && arrayAlbumOwn.length > 0) {
        arrayAlbumOwn.length = 0;
        setArrayAlbumOwn([]);
      }
      callApiToGetOwnAlbumData("", 1, textToSearch);
    }
  };

  // open popup of update album name
  const editAlbumName = (item) => {
    if (item) {
      setonopenmediaPicker(true);
      setTitle(item.name);
      setcurrentAlbumID(item.album_id);
    }
  };

  // when Oen album list and user want to shared album with another user
  const sharedAlbum = (item) => {
    props.navigation.navigate("ShareAlbumPhotos", { albumdetail: item });
  };

  //navigate to view album detail screen
  const gotoAlbumDetails = (item) => {
    var itemAccess = "";
    if (isSharedAlbum) {
      itemAccess = item.access;
    } else {
      itemAccess = 1;
    }
    item.isSharedAlbum = isSharedAlbum;
    props.navigation.navigate("AlbumDetailScreen", {
      albumdetail: item,
      access: itemAccess,
      onReturn: () => {
        refreshAlbumList(data);
      },
    });
  };

  const renderList = ({ item }) => {
    let containerName = "";
    if (isSharedAlbum) {
      containerName = item.container;
    } else {
      containerName =
        user && user.user_detail ? user.user_detail.container_name : "";
    }
    let imageUrl = AZURE_BASE_URL + containerName + "/" + item.file_name;

    return (
      <View
        style={{
          height: Platform.OS === "android" ? 80 : 100,
          width: "100%",
          marginBottom: "5%",
        }}
      >
        <View style={styles.skyBlueView}>
          <View style={{ flex: 0.8 }} />
          <TouchableOpacity
            onPress={() => editAlbumName(item)}
            style={styles.pencilIcon}
          >
            <Icon name={"pencil"} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>

        <View style={styles.navyBlueView}>
          <View style={{ flex: 0.8 }} />
          <TouchableOpacity
            onPress={() => sharedAlbum(item)}
            style={styles.pencilIcon}
          >
            <Icon name={"share"} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => gotoAlbumDetails(item)}
          activeOpacity={1}
          style={[
            styles.innerContainer,
            {
              height: Platform.OS === "android" ? 80 : 100,
              width: isSharedAlbum ? width * 0.91 : width * 0.75,
            },
          ]}
        >
          {item.file_type && item.file_type.includes("image") ? (
            <FastImage
              style={styles.image}
              source={{
                uri: imageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.video}>
              <VideoCard
                style={{ borderRadius: 20 }}
                videoUrl={imageUrl}
                volume={0}
              ></VideoCard>

              <TouchableOpacity
                onPress={() => gotoAlbumDetails(item)}
                activeOpacity={1}
                style={[
                  {
                    justifyContent: "center",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  },
                ]}
              />
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
      </View>
    );
  };

  // render flailist of own and shared album
  const renderList1 = ({ item }) => {
    let containerName = "";
    if (isSharedAlbum) {
      containerName = item.container;
    } else {
      containerName =
        user && user.user_detail ? user.user_detail.container_name : "";
    }
    let imageUrl = AZURE_BASE_URL + containerName + "/" + item.file_name;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.renderItemContainer,
            { marginBottom: height * 0.02, backgroundColor: "yellow" },
          ]}
        >
          <TouchableOpacity
            onPress={() => gotoAlbumDetails(item)}
            activeOpacity={1}
            style={[
              styles.innerContainer,
              {
                width: isSharedAlbum ? width * 0.88 : width * 0.75,
              },
            ]}
          >
            <FastImage
              style={styles.image}
              source={{
                uri: imageUrl,
                //headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
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
          {isSharedAlbum ? null : (
            <View
              style={{
                flexDirection: "column",
                width: width * 0.3,
                marginRight: 10,
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => editAlbumName(item)}
                style={[styles.iconView]}
              >
                <Icon
                  style={{ margin: 5, marginHorizontal: 10, borderRadius: 20 }}
                  name={"pencil-outline"}
                  size={20}
                  color={"#fff"}
                />
              </TouchableOpacity>
              <View style={styles.lineview}></View>
              <TouchableOpacity
                onPress={() => sharedAlbum(item)}
                style={styles.iconView}
              >
                <Image
                  style={styles.shareIcon}
                  resizeMode="cover"
                  source={AppImages.images.share}
                />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // update album by name API call
  const UpdateAlbumNameApiCall = () => {
    setIsApiCall(true);
    dispatch(
      updateAlbumName({
        sessid: user.sessid ? user.sessid : "",
        name: title,
        album_id: currentAlbumID,
      })
    );
    setonopenmediaPicker(false);
  };

  // save button onpress while need to change album name from popup
  const onClickSave = () => {
    if (title.length !== 0) {
      if (checkStringContainsSpecialChar(title)) {
        Alert.alert(
          globals.appName,
          AppConstants.constant.ALBUM_NAME_SPECIAL_CHAR_VALIDATION
        );
        return;
      }
    } else {
      Alert.alert(
        globals.appName,
        AppConstants.constant.ALBUM_NAME_EMPTY_VALIDATION
      );
      return;
    }
    if (title.length > 0) {
      UpdateAlbumNameApiCall();
    }
  };

  // update Album Datas
  const updateAlbumDatas = (data) => {
    if (isSharedAlbum) {
      const selectedFilteredSharedArray = arrayAlbumShared.map((item) => {
        if (item.album_id === currentAlbumID) {
          return Object.assign({}, item, { name: data.name });
        }
        return item;
      });
      setArrayAlbumShared(selectedFilteredSharedArray);
    } else {
      const selectedFilteredArray = arrayAlbumOwn.map((item) => {
        if (item.album_id === currentAlbumID) {
          return Object.assign({}, item, { name: data.name });
        }
        return item;
      });
      setArrayAlbumOwn(selectedFilteredArray);
      updateAlbumNameSuccessApiCall();
    }
  };

  // API call response setdata for own and shared album view list data update

  const setData = () => {
    if (isSharedAlbum) {
      if (
        data.HomeReducer.sharedAlbumAlbumView &&
        data.HomeReducer.sharedAlbumAlbumView.responseCode &&
        data.HomeReducer.sharedAlbumAlbumView.responseCode ===
          AppConstants.constant.SUCCESS
      ) {
        if (isApiCall) {
          setIsApiCall(false);
          if (arrayAlbumShared) {
            if (arrayAlbumShared.length > 0) {
              //paging case need to append data in existing array
              setArrayAlbumShared(
                arrayAlbumShared.concat(
                  data.HomeReducer.sharedAlbumAlbumView.data.data
                )
              );
            } else {
              if (
                data.HomeReducer.sharedAlbumAlbumView.data.totalAlbumCount === 0
              ) {
                setArrayAlbumShared([]);
                if (arrayAlbumShared && arrayAlbumShared.length > 0) {
                  arrayAlbumShared.length = 0;
                }
              } else {
                // When api call first time

                setArrayAlbumShared(
                  data.HomeReducer.sharedAlbumAlbumView.data.data
                );
              }
            }
          }
        }
      }
    } else {
      if (
        data.HomeReducer &&
        data.HomeReducer.ownAlbumAlbumView &&
        data.HomeReducer.ownAlbumAlbumView.responseCode &&
        data.HomeReducer.ownAlbumAlbumView.responseCode ===
          AppConstants.constant.SUCCESS
      ) {
        if (isApiCall) {
          setIsApiCall(false);
          if (
            data.HomeReducer.ownAlbumAlbumView &&
            data.HomeReducer.ownAlbumAlbumView.data &&
            data.HomeReducer.ownAlbumAlbumView.data.data
          ) {
            if (arrayAlbumOwn) {
              if (arrayAlbumOwn.length > 0) {
                setArrayAlbumOwn(
                  arrayAlbumOwn.concat(
                    data.HomeReducer.ownAlbumAlbumView.data.data
                  )
                );
              } else {
                if (
                  data.HomeReducer.ownAlbumAlbumView.data &&
                  data.HomeReducer.ownAlbumAlbumView.data.data.length > 0
                ) {
                  setArrayAlbumOwn(
                    data.HomeReducer.ownAlbumAlbumView.data.data
                  );
                } else {
                  arrayAlbumOwn.length = 0;
                  setArrayAlbumOwn([]);
                }
              }
            }
          }
        }
      }
    }
  };

  // Manage failure response and error condition to show alert and do action accordingly
  const showNoMediaAlert = (dataResponse) => {
    if (dataResponse && isApiCall) {
      if (dataResponse.errorCode === AppConstants.constant.NO_MEDIA) {
        setIsApiCall(false);
      }
      if (dataResponse.errorCode === AppConstants.constant.ALBUM_NOT_UPDATE) {
        setIsApiCall(false);
        notifyMessage(data.HomeReducer.data.message);
      } else {
        setData();
      }
    }
  };

  // manage API call responses
  const checkResponseCode = () => {
    // For library, Own Album and shared album
    if (
      data.HomeReducer.updateAlbumName &&
      data.HomeReducer.updateAlbumName.errorCode
    ) {
      if (
        data.HomeReducer.updateAlbumName.errorCode ===
        AppConstants.constant.PURCHASE_PLAN_OR_USE_INVITE_CODE
      ) {
        setIsApiCall(false);
        return (
          <SubscriptionError
            comeFrom={AppConstants.constant.ALBUM_SCREEN}
            errorCode={data.HomeReducer.updateAlbumName.errorCode}
            navigation={props.navigation}
          />
        );
      } else if (
        data.HomeReducer.updateAlbumName.errorCode ===
        AppConstants.constant.ALBUM_CREATION_FAILED
      ) {
        setIsApiCall(false);
        notifyMessage(data.HomeReducer.updateAlbumName.message);
        updateAlbumNameSuccessApiCall();
      }
    }

    if (
      data.HomeReducer.updateAlbumName &&
      data.HomeReducer.updateAlbumName.errorCode ===
        AppConstants.constant.ALBUM_UPDATE_SUCCESSFULLY
    ) {
      //let responseTemp = data.HomeReducer.updateAlbumName;
      setIsApiCall(false);
      updateAlbumDatas(data.HomeReducer.updateAlbumName.data);
    } else if (isSharedAlbum) {
      if (
        data.HomeReducer.sharedAlbumAlbumView.errorCode ===
        AppConstants.constant.NOT_AUTHORIZED
      ) {
        let dict = data.HomeReducer.sharedAlbumAlbumView;
        dict.errorCode = "";
        data.HomeReducer.sharedAlbumAlbumView = dict;
        notifyMessage(data.HomeReducer.data.message);
      } else {
        showNoMediaAlert(data.HomeReducer.sharedAlbumAlbumView);
      }
    } else {
      if (
        data.HomeReducer.ownAlbumAlbumView.errorCode ===
        AppConstants.constant.NOT_AUTHORIZED
      ) {
        let dict = data.HomeReducer.ownAlbumAlbumView;
        dict.errorCode = "";
        data.HomeReducer.ownAlbumAlbumView = dict;
        notifyMessage(data.HomeReducer.data.message);
      } else {
        showNoMediaAlert(data.HomeReducer.ownAlbumAlbumView);
      }
    }
  };

  const updateAlbumNameSuccessApiCall = () => {
    let dict = data.HomeReducer;
    dict.updateAlbumName.errorCode = "";
    data.HomeReducer = dict;
  };
  // load morre data from bottom flalist to show more data
  const loadMoreData = () => {
    if (isSharedAlbum) {
      if (
        data.HomeReducer.sharedAlbumAlbumView &&
        data.HomeReducer.sharedAlbumAlbumView.data
      )
        if (
          data.HomeReducer.sharedAlbumAlbumView.data.totalPages >=
            pageCountSharedAlbum &&
          arrayAlbumShared &&
          arrayAlbumShared.length <
            data.HomeReducer.sharedAlbumAlbumView.data.totalAlbumCount
        ) {
          let dataToSet = pageCountOwnAlbum + 1;
          setpageCountOwnAlbum(dataToSet);
          setPageCountSharedAlbum(dataToSet);

          callApiToGetSharedAlbum("loadMore", dataToSet);
        }
    } else {
      if (
        data.HomeReducer.ownAlbumAlbumView &&
        data.HomeReducer.ownAlbumAlbumView.data
      )
        if (
          data.HomeReducer.ownAlbumAlbumView.data.totalPages >=
            pageCountOwnAlbum &&
          arrayAlbumOwn &&
          arrayAlbumOwn.length <
            data.HomeReducer.ownAlbumAlbumView.data.totalAlbumCount
        ) {
          let dataToSet = pageCountOwnAlbum + 1;
          setpageCountOwnAlbum(dataToSet);

          callApiToGetOwnAlbumData("loadeMore", dataToSet);
        }
    }
  };

  // API call for get own album list
  const callApiToGetOwnAlbumData = (from, pageCount, textToSearch) => {
    setIsApiCall(true);
    if (pageCount) {
      dispatch(
        listsOwnAlbumOnAlbumScreen({
          sessid: user.sessid ? user.sessid : "",
          page: pageCount,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    } else {
      dispatch(
        listsOwnAlbumOnAlbumScreen({
          sessid: user.sessid ? user.sessid : "",
          page: pageCountOwnAlbum,
          order_by_colum: "created_date",
          direction: "DESC",
          name: textToSearch ? textToSearch : searchAlbumName,
        })
      );
    }
  };

  // API response and manage own album data
  const getOwnAlbumData = (isLoadMore) => {
    {
      // This is the first time when own album is empty and we need to call api
      callApiToGetOwnAlbumData();
    }
  };

  // API response and manage shared album data
  const getSharedAlbumData = () => {
    {
      // This is the first time when own album is empty and we need to call api
      callApiToGetSharedAlbum();
    }
  };

  // API call of shared album list
  const callApiToGetSharedAlbum = (from, pageCount) => {
    setIsApiCall(true);
    if (pageCount) {
      {
        dispatch(
          listsSharedAlbumOnAlbumScreen({
            sessid: user.sessid ? user.sessid : "",
            page: pageCount,
            order_by_colum: "created_date",
            direction: "DESC",
            name: searchAlbumName,
          })
        );
      }
    } else {
      dispatch(
        listsSharedAlbumOnAlbumScreen({
          sessid: user.sessid ? user.sessid : "",
          page: pageCountSharedAlbum,
          order_by_colum: "created_date",
          direction: "DESC",
          name: searchAlbumName,
        })
      );
    }
  };

  // manage dropdown when click on ownAlbum
  const onClickOwnAlbum = () => {
    setIsSharedAlbum(false),
      setisAbletocreateNewAlbum(true),
      callApiToGetOwnAlbumData();
  };

  // manage dropdown when click on shared album
  const onClickSharedAlbum = () => {
    setIsSharedAlbum(true),
      setisAbletocreateNewAlbum(false),
      getSharedAlbumData();
  };

  // distict OwncAlbumArray
  const distictOwnAlbumArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["album_id"], x])).values(),
    ];
    return distinctArray;
  };

  // distict SharedAlbumArray
  const distictSharedAlbumArray = (data) => {
    const distinctArray = [
      ...new Map(data.map((x) => [x["album_id"], x])).values(),
    ];
    return distinctArray;
  };

  // CLOSE MEDIA PICKER WHEN IMG/VID IS CAPTURED OR SELECTED
  const closemediaPicker = () => {
    setonopenmediaPicker(false);
  };

  // call when coming back from add album
  const refreshAlbumList = (data) => {
    setpageCountOwnAlbum(1);
    arrayAlbumOwn.length = 0; // Make empty so show new data
   callApiToGetOwnAlbumData("", 1);
  };

  // For search text
  React.useEffect(() => {
    callApiToGetOwnAlbumData();
  }, [pageCountOwnAlbum]);

  // Initialy check

  // Initialy check
  const checkUserAvailableSpace = () => {
    let userOwnSpace = {};
    if (
      data.HomeReducer &&
      data.HomeReducer.userSpace &&
      data.HomeReducer.userSpace.own_space
    ) {
      userOwnSpace = data.HomeReducer.userSpace.own_space;
      if (
        userOwnSpace.own_space_total_bytes &&
        userOwnSpace.own_space_total_bytes >=
          userOwnSpace.own_space_used_total_bytes
      ) {
        return true;
      } else {
        showUpgradeAlert();
        return false;
      }
    } else {
      if (
        data.HomeReducer &&
        data.HomeReducer.library &&
        (data.HomeReducer.library.errorCode ===
          AppConstants.constant.SUBSCRIPTION_EXPIRED ||
          data.HomeReducer.library.errorCode ===
            AppConstants.constant.SUBSCRIPTION_INVALID)
      ) {
        showUpgradeAlert();
        return false;
      }
    }
  };

  const showUpgradeAlert = () => {
    Alert.alert(
      AppConstants.constant.ONLINE_FAMILY_VAULT,
      AppConstants.constant.UPGRADE_ACCOUNT_ALERT,
      [
        {
          text: AppConstants.constant.REMIND_ME_LATER,
          onPress: () => console.log("ok"),
        },
        {
          text: AppConstants.constant.UPGRADE_NOW,
          onPress: () => moveToSubscriptionScreen(),
        },
      ]
    );
  };
  const moveToSubscriptionScreen = () => {
    props.navigation.navigate("Subscription");
  };

  return (
    <>
      {checkResponseCode()}

      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <Pressable
        style={{ flex: 1, backgroundColor: "white" }}
        onPress={() => Keyboard.dismiss()}
      >
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
            setSearchAlbumName("");
            props.navigation.goBack();
          }}
          rightViewLeftIcon={require("../../assets/images/Notification.png")}
          notificationsClick={() => {
            setSearchAlbumName("");
            props.navigation.navigate("Notifications");
          }}
        />
        {onopenmediaPicker == true ? (
          <ReactModal
            backdropColor="rgba(52, 52, 52, 0.8)"
            backdropOpacity={1}
            transparent={true}
            animationType="slide"
            transparent={true}
            isVisible={onopenmediaPicker}
            onRequestClose={() => {
              closemediaPicker(false);
            }}
            onBackdropPress={() => {
              closemediaPicker(false);
            }}
          >
            <View style={styles.modalmediaopen}>
              <View style={styles.titleviewstyle}>
                <Text style={[styles.choosefilestyle, { fontWeight: "600" }]}>
                  {"Change Album Name"}
                </Text>
                <View style={styles.lineStyle}></View>
                <View
                  style={{
                    height: globals.screenWidth * 0.42,
                  }}
                >
                  <View style={styles.textInputView}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter Album Title Here"
                      value={title}
                      onChangeText={(e) => setTitle(e)}
                    />
                  </View>
                  <Button
                    onPress={onClickSave}
                    // mode="contained"
                    style={styles.btn}
                    uppercase={false}
                    color={AppColor.colors.RED}
                    labelStyle={{
                      paddingVertical: 3.5,
                      fontSize: 20,
                      fontWeight: "700",
                      fontFamily: "MuseoSlab-700",
                    }}
                  >
                    Save
                  </Button>
                </View>
              </View>
            </View>
          </ReactModal>
        ) : null}

        <View style={styles.album}>
          <Text style={styles.textMainTitle}>Albums</Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Search
            onClickCalendar={() => {}}
            onClickSearch={onClickSearch}
            isCalendar={false}
            onChangeText={onChangeText}
            placeholder={"Search Album Name"}
            searchTxt={searchAlbumName}
          />
        </View>
        <View
          style={[
            styles.album,
            {
              marginVertical: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          {isAbletocreateNewAlbum ? (
            <Pressable
              style={styles.invitebuttonview}
              onPress={() => {
                if (!checkUserAvailableSpace()) {
                  return;
                }
                props.navigation.navigate("AddNewAlbum", {
                  totalOwnAlbumspace: 0,
                  uploadMediadatas: [],
                  itisfrom: "Album",
                  onReturn: () => {
                    refreshAlbumList(data);
                  },
                });
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.addView}
                source={require("../../assets/icons/plus.png")}
              />
              <Text numberOfLines={1} style={[styles.invitebuttontext]}>
                {"Create New Album"}
              </Text>
            </Pressable>
          ) : (
            <View
              style={[styles.invitebuttonview, { backgroundColor: "white" }]}
            ></View>
          )}

          <View
            style={{
              width: wp("18%"),
              height: hp("10%"),
              justifyContent: "center",
            }}
          >
            <View style={styles.viewAlbum}>
              <TouchableOpacity
                onPress={() => setIsAlbumDropDownOpen(!isAlbumDropDownOpen)}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.textAlbum}>
                    {isSharedAlbum ? "Share" : "Own"}
                  </Text>
                  {!isAlbumDropDownOpen ? (
                    <IconAntDesign
                      name="caretdown"
                      color={AppColor.colors.WHITE}
                      size={14}
                    />
                  ) : (
                    <IconAntDesign
                      color={AppColor.colors.WHITE}
                      name="caretup"
                      size={14}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {isAlbumDropDownOpen ? (
              <View style={styles.viewFlatListDropDown}>
                <FlatList
                  data={["Own", "Share"]}
                  renderItem={(item) => {
                    return (
                      <View style={styles.viewDropDownCell}>
                        <TouchableOpacity
                          onPress={() => {
                            setIsAlbumDropDownOpen(false),
                              isClearSearchText
                                ? setIsClearSearchText(false)
                                : null;
                            item.item === "Own"
                              ? onClickOwnAlbum()
                              : onClickSharedAlbum();
                          }}
                        >
                          <Text style={styles.textDropDownCell}>
                            {item.item}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : null}
          </View>
        </View>

        <View style={[{ marginTop: 0, flex: 1, marginBottom: 25 }]}>
          <FlatList
            style={{ flex: 1 }}
            data={
              isSharedAlbum
                ? distictSharedAlbumArray(arrayAlbumShared)
                : distictOwnAlbumArray(arrayAlbumOwn)
            }
            ref={flatListRef}
            extraData={
              isSharedAlbum
                ? distictSharedAlbumArray(arrayAlbumShared)
                : distictOwnAlbumArray(arrayAlbumOwn)
            }
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              loadMoreData();
            }}
            keyExtractor={(item, index) =>
              isSharedAlbum ? index.toString() : item.album_id.toString()
            }
          />

          {loading || data.HomeReducer.isRequesting ? <Spinner /> : null}
        </View>
      </Pressable>
    </>
  );
};

export default AlbumScreen;
