import React, { createContext, useState, useContext, useEffect } from "react";
import * as RNIap from "react-native-iap";
import { useIAP } from "react-native-iap";

import { Alert, Platform } from "react-native";
import AppConstants from "../../Theme/AppConstant";
import {
  subscribeApiCall,
  subscribeSuccess,
} from "../../Redux-api/actions/Home";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { notifyMessage } from "../AlertView";

export const IApContext = createContext();

const itemSkus = Platform.select({
  ios: [
    AppConstants.constant.BASIC_MONTHLY_PLAN_IOS,
    AppConstants.constant.ONE_MONTH_STANDARD_PLAN_IOS,
    AppConstants.constant.BUSINESS_MONTHLY_PLAN_IOS,
    AppConstants.constant.ADVANCED_MONTHLY_PLAN_IOS,
    AppConstants.constant.ONE_MONTH_PREMIUM_PLAN_IOS,
    AppConstants.constant.PREMIER_MONTHLY_PLAN_IOS,
  ],
  android: [
    AppConstants.constant.BASIC_MONTHLY_PLAN,
    AppConstants.constant.ONE_MONTH_STANDARD_PLAN,
    AppConstants.constant.BUSINESS_MONTHLY_PLAN,
    AppConstants.constant.ADVANCED_MONTHLY_PLAN,
    AppConstants.constant.ONE_MONTH_PREMIUM_PLAN,
    AppConstants.constant.PREMIER_MONTHLY_PLAN,
  ],
});

export const IApController = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [showUpgrade, setshowUpgrade] = useState(true);
  const dispatch = useDispatch({});
  const { user } = React.useContext(AuthContext);
  const [transactionReceipt, setTransactionReceipt] = useState("");

  useEffect(() => {
    console.log("use Effect iap -- children", children);
    initIAp();
  }, []);

  const initIAp = async () => {
    await RNIap.initConnection().then(async (connection) => {
      try {
        const products = await RNIap.getProducts(itemSkus);
        // if (Platform.OS === "android")

        const subscription = await RNIap.getSubscriptions(itemSkus);
        products.push(subscription[0]);

        console.log(
          "products ---",
          products,
          "\n",
          " subscrition",
          subscription
        );
        setProducts({ products });
      } catch (err) {
        console.log("products fetching error---", err);

        console.warn(err); // standardized err.code and err.message available
      }
    });
  };

  const makePurchase = async (sku, selectSkuData) => {
    try {
      await RNIap.requestPurchase(sku, false).then(async (res) => {
        toggleUpgrade(false);
      });
    } catch (err) {}
  };

  makeSubscription = async (sku, selectedSkuData, monthly) => {
    let duration = "";
    if (monthly) {
      duration = 1;
    } else {
      duration = 12;
    }
    try {
      await RNIap.requestSubscription(sku, false).then(async (res) => {
        setTransactionReceipt(res.transactionReceipt);

        let planDetails = {
          name: selectedSkuData.name ? selectedSkuData.name : "",
          price: selectedSkuData.price ? selectedSkuData.price : "",
          space: selectedSkuData.space ? selectedSkuData.space : "",
          number_of_shares: selectedSkuData.number_of_shares
            ? selectedSkuData.number_of_shares
            : "",
        };
        let param = {
          sessid: user.sessid ? user.sessid : "",
          plan_details: planDetails,
          duration_in_months: duration,
          payment_order_id: res.transactionReceipt.orderId,
          device_type: Platform.OS === "android" ? "android" : "ios",
          transaction_receipt: res.transactionReceipt,
          product_id: sku,
        };
        // setIsApiCall(true);
        handleAfterPurchase();
        dispatch(subscribeApiCall(param));

        toggleUpgrade(false);
      });
    } catch (err) {
      notifyMessage(
        err.message
          ? err.message
          : AppConstants.constant.PLEASE_TRY_AFTER_SOME_TIME
      );
    }
  };

  handleAfterPurchase = async () => {
    if (transactionReceipt) {
      const purchases = await RNIap.getAvailablePurchases();

      try {
        if (Platform.OS === "android") {
          await RNIap.consumePurchaseAndroid(purchases[0].purchaseToken);
        } else {
          const ackResult = await RNIap.finishTransaction(
            purchases && purchases.length > 0
              ? purchases[0].purchaseToken
                ? purchases[0].purchaseToken
                : ""
              : "",
            true
          );
        }
      } catch (error) {
        console.log(" 130 Error code ", err.code, "Error mesg ", err.message);
      }
    }
  };

  const toggleUpgrade = (value) => {
    if (value === true) {
      setshowUpgrade(true);
    } else {
      setshowUpgrade(false);
    }
  };

  const checkValidPurchase = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();

      purchases.forEach(async (purchase) => {
        switch (purchase.productId) {
          case AppConstants.constant.ONE_MONTH_STANDARD_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ONE_MONTH_REGULAR_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ONE_MONTH_PREMIUM_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.BASIC_MONTHLY_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.BUSINESS_MONTHLY_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.PREMIER_MONTHLY_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ADVANCED_MONTHLY_PLAN:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.BASIC_MONTHLY_PLAN_IOS:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ONE_MONTH_STANDARD_PLAN_IOS:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.BUSINESS_MONTHLY_PLAN_IOS:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ADVANCED_MONTHLY_PLAN_IOS:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.ONE_MONTH_PREMIUM_PLAN_IOS:
            toggleUpgrade(false);
            break;
          case AppConstants.constant.PREMIER_MONTHLY_PLAN_IOS:
            toggleUpgrade(false);
            break;
          default: {
          }
        }
      });
    } catch (err) {
      //console.warn(err);
    }
  };

  return (
    <IApContext.Provider
      value={{
        initIAp,
        checkValidPurchase,
        showUpgrade,
        products,
        makePurchase,
        makeSubscription,
        handleAfterPurchase,
      }}
    >
      {children}
    </IApContext.Provider>
  );
};
