import {
  StatusBar,
  ScrollView,
  View,
  Alert,
  Platform,
  Keyboard,
  BackHandler,
} from "react-native";
import styles from "./style";
import { Header } from "../../Component/Header";
import { AppImages, AppColor } from "../../Theme";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Avatar, Headline, Text, useTheme } from "react-native-paper";
import Button from "../../Component/auth/Button";
import Spinner from "../../Component/auth/Spinner";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import { listplans, listAllMediaSuccess } from "../../Redux-api/actions/Home";
import React, { useEffect, useState, useContext } from "react";
import AppConstants from "../../Theme/AppConstant";
import { IApContext } from "../../Component/InAppPurchase/IAPController";
import TabSwitch from "../../Component/auth/TabSwitch";
import { removeCurrentUser } from "../../database/localDB";
import { logOutUser } from "../../Redux-api/actions/LoginActions";
import { LIST_PLANS_SUCCESS } from "../../Redux-api/constant";
import { notifyMessage } from "../../Component/AlertView";
import { getCurrentUser, setCurrentUser } from "../../database/localDB";

export default Subscription = (props) => {
  const [activeSlide, setactiveSlide] = React.useState(0);
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  const [monthly, setMonthly] = React.useState(true);

  const dispatch = useDispatch();
  const onSnapToItem = (index) => {
    setactiveSlide(index);
  };
  const { setUserData } = React.useContext(AuthContext);
  const { setUser } = React.useContext(UserContext);

  const {
    makePurchase,
    makeSubscription,
    showUpgrade,
    handleAfterPurchase,
  } = useContext(IApContext);

  const data = useSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [planDataMonthly, setPlanDataMonthly] = React.useState([]);
  const [planDataYearly, setPlanDataYearly] = React.useState([]);
  const [currentPlan, setCurrentPlan] = React.useState("");
  const [carouselItems, setCarouselItems] = React.useState([]);
  const [isApiCall, setIsApiCall] = React.useState(false); // When calling listallmedia api  set this flag true so that only that time setData method will be call.
  const [isCarouselUpdate, setIsCarouselUpdate] = React.useState(false);

  var countBack = 0;

  React.useEffect(() => {
    data.HomeReducer.isRequesting ? setLoading(false) : setLoading(false);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    const unsubscribe = props.navigation.addListener("focus", () => {
      setIsApiCall(true);
      setMonthly(true);
      let dataParam = {
        sessid: user.sessid ? user.sessid : "",
        plan_type: AppConstants.constant.MONTHLY_PARAM,
      };

      dispatch(listplans(dataParam));
    });

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick()
      );
      unsubscribe;
    };
  }, []);

  const handleBackButtonClick = () => {
    countBack = countBack + 1;

    if (countBack > 1) {
      Alert.alert(
        "Exit App",
        "Do you want to exit the application?",
        [
          {
            text: "Cancel",
            onPress: () => (countBack = 0),
            style: "cancel",
          },
          {
            text: "Ok",
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

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.mainview}>
        <View style={styles.cardTop}>
          <Text style={styles.textPlanTitle}>{item.name}</Text>
          <Text style={styles.textPrice}>{"$" + "" + item.price}</Text>
        </View>

        <View style={styles.cardBottom}>
          <Text style={[styles.textBottom, { paddingTop: hp("2%") }]}>
            {item.space} GB Space
          </Text>
          <Text style={styles.textBottom}>
            Unlimited Share
            {/* 
            Date: 6th October2021 Client did change to make it unlimited 
            Number of Shares = {item.number_of_shares}
             */}
          </Text>

          {item.subscription_start_date && item.is_active === 1 ? (
            <Text style={styles.textBottom}>
              Start Date : {item.subscription_start_date}
            </Text>
          ) : null}
          {item.subscription_end_date && item.is_active === 1 ? (
            <Text style={styles.textBottom}>
              End Date : {item.subscription_end_date}
            </Text>
          ) : null}
        </View>
        <View style={styles.bottombtnview}>
          <Button
            // mode="contained"
            style={styles.btn}
            uppercase={false}
            color={AppColor.colors.RED}
            labelStyle={{
              paddingVertical: 3.5,
              fontSize: 20,
              fontWeight: "bold",
            }}
            onPress={() => {
              onClickCarouselItem(index);
            }}
          >
            <Text style={styles.textPlan}>
              {item.is_active === 1
                ? "Purchased"
                : item.isSelect
                ? "Selected"
                : "Select this plan"}
            </Text>
          </Button>
        </View>
      </View>
    );
  };
  const onClickCarouselItem = (index) => {
    //** check if user already have an active plan then no need to select another one */
    let plan = carouselItems.find((data) => data.is_active === 1);
    if (plan) {
      notifyMessage(AppConstants.constant.ALREADY_ACTIVE_PLAN);
      return;
    }

    var tempArray = carouselItems;
    tempArray.map((item, itemIndex) => {
      {
        {
          if (itemIndex === index) {
            item.isSelect = true;
          } else {
            item.isSelect = false;
          }
          tempArray[itemIndex] = item;
        }
      }
    });
    setCarouselItems(tempArray);
    data.HomeReducer.data.data = tempArray;

    dispatch({
      type: LIST_PLANS_SUCCESS,
      payload: data.HomeReducer.data,
    });
    setIsCarouselUpdate(true);
  };
  const alertLogout = () => {
    if (data.HomeReducer.data.message) {
      Alert.alert("Alert", data.HomeReducer.data.message, [
        {
          text: "Ok",
          onPress: () => {
            let dict = data.HomeReducer.data;
            dict.message = "";
            data.HomeReducer.data = dict;
            moveToLoginScreen();
          },
        },
      ]);
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
        let currentPlanTemp = data.HomeReducer.data.data.find(
          (value) => value.is_active === 1
        );
        setCurrentPlan(currentPlanTemp);

        if (monthly) {
          setPlanDataMonthly(data.HomeReducer.data.data);
        } else {
          setPlanDataYearly(data.HomeReducer.data.data);
        }
        setCarouselItems(data.HomeReducer.data.data);
      } else {
      }
    }
  };
  const onClickUpgrade = () => {
    var selectedSku = "";

    let selectedSkuData = {};

    let plan = carouselItems.find((data) => data.is_active === 1);
    if (plan) {
      notifyMessage(AppConstants.constant.ALREADY_ACTIVE_PLAN);
      return;
    }

    switch (activeSlide) {
      case 0:
        selectedSkuData = carouselItems[0];
        selectedSkuData.isPurchase = true;
        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.BASIC_MONTHLY_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_STANDARD_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.BASIC_MONTHLY_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_STANDARD_PLAN_IOS;
          }
        }
        break;
      case 1:
        selectedSkuData = carouselItems[1];
        selectedSkuData.isPurchase = true;

        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.ONE_MONTH_STANDARD_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_REGULAR_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.ONE_MONTH_STANDARD_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_REGULAR_PLAN_IOS;
          }
        }
        break;
      case 2:
        selectedSkuData.isPurchase = true;
        selectedSkuData = carouselItems[2];
        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.BUSINESS_MONTHLY_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.BUSINESS_MONTHLY_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN_IOS;
          }
        }
        break;
      case 3:
        selectedSkuData.isPurchase = true;
        selectedSkuData = carouselItems[3];
        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.ADVANCED_MONTHLY_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.ADVANCED_MONTHLY_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN_IOS;
          }
        }
        break;
      case 4:
        selectedSkuData.isPurchase = true;
        selectedSkuData = carouselItems[4];
        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.PREMIER_MONTHLY_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.PREMIER_MONTHLY_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN_IOS;
          }
        }
        break;
      case 5:
        selectedSkuData.isPurchase = true;
        selectedSkuData = carouselItems[5];
        if (Platform.OS === "android") {
          if (monthly) {
            selectedSku = AppConstants.constant.PREMIER_MONTHLY_PLAN;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN;
          }
        } else {
          if (monthly) {
            selectedSku = AppConstants.constant.PREMIER_MONTHLY_PLAN_IOS;
          } else {
            selectedSku = AppConstants.constant.YEAR_PREMIUM_PLAN_IOS;
          }
        }
        break;
      default:
        break;
    }
    // afterSubscriptionSuccess();
    // return;
    makeSubscription(selectedSku, selectedSkuData, monthly);
  };

  //** This method created for testing subscription demo */
  const afterSubscriptionSuccess = () => {
    //** Update user detail according to subscription purchased plan */
    let dictUser = user;
    let dictTemp = dictUser.user_detail;
    dictTemp.subscription_plan = JSON.stringify(carouselItems[activeSlide]);
    dictTemp.subscription_status = "1";
    dictTemp.subscription_start_date = "2021-12-18";
    dictTemp.subscription_end_date = "2021-12-19";
    // user.user_detail = dictTemp;

    setUserData(dictUser);
    setUser(dictUser);
    setCurrentUser(dictUser);
    //** now purchased plan will be active plan of the user  */
    setCurrentPlan(carouselItems[activeSlide].name);
    //** For showing text Purchased in the carousel */
  };

  const checkResponseCode = () => {
    if (
      data.HomeReducer &&
      data.HomeReducer.subscribe &&
      Object.keys(data.HomeReducer.subscribe).length != 0 &&
      data.HomeReducer.subscribe.message
    ) {
      //** Update user detail according to subscription purchased plan */

      //** now purchased plan will be active plan of the user  */
      setCurrentPlan(carouselItems[activeSlide].name);
      //** for showing success message */
      notifyMessage(data.HomeReducer.subscribe.message);

      // Making it empty so it will not call api again.
      let subscribeDict = data.HomeReducer.subscribe;
      (subscribeDict.message = ""),
        (data.HomeReducer.subscribe = subscribeDict);
      //** For updating carousel call again list plan api  */
      setIsApiCall(true);

      let dataParam = {
        sessid: user.sessid ? user.sessid : "",
        plan_type: AppConstants.constant.MONTHLY_PARAM,
      };
      dispatch(listplans(dataParam));
    }

    if (
      data.HomeReducer &&
      data.HomeReducer.data &&
      data.HomeReducer.data.errorCode
    ) {
      if (
        data.HomeReducer.data.errorCode === AppConstants.constant.NOT_AUTHORIZED
      ) {
        alertLogout();
      } else if (
        data.HomeReducer &&
        data.HomeReducer.data &&
        (data.HomeReducer.data.errorCode ===
          AppConstants.constant.SUBSCRIPTION_EXPIRED ||
          data.HomeReducer.data.errorCode ===
            AppConstants.constant.SUBSCRIPTION_INVALID)
      ) {
        if (isApiCall) {
          setIsApiCall(false);
        }
        // showUpgradeAlert();
        return false;
      } else {
        setData();
      }
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
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.album}>
            <Text style={styles.textSelectPlan}>Select Plan</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Carousel
              layout={"default"}
              layoutCardOffset={18}
              data={carouselItems}
              sliderWidth={wp("100%")}
              itemWidth={300}
              renderItem={_renderItem}
              onSnapToItem={(index) => onSnapToItem(index)}
            />
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={10}
              dotStyle={styles.activedotstyle}
              inactiveDotStyle={styles.inactivedotstyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
            {/* <View style={styles.tabSwitch}>
              <TabSwitch
                tabs={["Monthly", "Yearly"]}
                onPressFirstTab={() => {
                  setMonthly(true);
                  // if (planDataMonthly.length == 0)
                  {
                    setIsApiCall(true);
                    let dataParam = {
                      sessid: user.sessid ? user.sessid : "",
                      plan_type: AppConstants.constant.MONTHLY_PARAM,
                    };
                    dispatch(listplans(dataParam));
                  }
                  // else {
                  //   setCarouselItems(planDataMonthly);
                  // }
                }}
                onPressSecondTab={() => {
                  setMonthly(false);
                  //  if (planDataYearly.length == 0)
                  {
                    setIsApiCall(true);
                    let dataParam = {
                      sessid: user.sessid ? user.sessid : "",
                      plan_type: AppConstants.constant.YEARLY_PARAM,
                    };
                    dispatch(listplans(dataParam));
                  }
                  // else {
                  //   setCarouselItems(planDataYearly);
                  // }
                }}
                isFirstTab={monthly}
              />
            </View> */}

            <View style={styles.buttonSave}>
              <Button
                color={AppColor.colors.RED}
                onPress={() => onClickUpgrade()}
              >
                <Text style={styles.upgradeNowTxt}>Upgrade Now</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
      {loading || isApiCall || data.HomeReducer.isRequesting ? (
        <Spinner />
      ) : null}
    </>
  );
};
//export default Subscription;
