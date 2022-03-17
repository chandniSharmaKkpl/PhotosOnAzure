import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import React from "react";
import { View, Image, ActivityIndicator, Alert } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import VideoCard from "../../Component/VideoCard";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as globals from "../../Utils/globals";
import AppConstants from "../../Theme/AppConstant";
import { AppColor } from "../../Theme";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import {notifyMessage} from '../../Component/AlertView';

const deleteClick = (props) => {
  if (props.itemZoom.owner_id == props.user_id) {
    Alert.alert(
      AppConstants.constant.ALERT,
      AppConstants.constant.DO_YOU_WANT_TO_DELETE_ONE_SELECTED_MEDIA,
      [
        {
          text: AppConstants.constant.YES,
          onPress: () => {
            props.itemZoom.isCheck = true;
            props.callApiToDelete([props.itemZoom.file_name]),
              props.closeZoomView();
          },
        },
        {
          text: AppConstants.constant.NO,
          onPress: () => {
            console.log("");
          },
        },
      ]
    );
  }else{
    notifyMessage(AppConstants.constant.YOU_CAN_DELETE_ONLY_OWN_ALBUMS)
    }
  
};

const ZoomView = (props) => {
  const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {};
  return (
    <View style={{ flex: 1, backgroundColor: AppColor.colors.THEME_BLUE }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: wp("2%"),
          paddingRight: wp("1%"),
        }}
      >
        {props.isaccessible == 0 ? null : (
          <IconMaterialCommunity
            onPress={() => deleteClick(props)}
            name="delete-circle"
            size={35}
            color={AppColor.colors.RED}
            style={{}}
          />
        )}

        <IconAntDesign
          onPress={props.closeZoomView}
          name="closecircle"
          size={30}
          color="#900"
          style={{ alignSelf: "flex-end", margin: "2%" }}
        />
      </View>

      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        onZoomAfter={logOutZoomState}
        style={{
          padding: 10,
          width: wp("100%"),
          height: hp("100%"),
          backgroundColor: "#0E365D",
        }}
      >
        {!props.isVideo ? (
          <FastImage
            style={styles.container}
            source={{
              uri: props.url,
            }}
            resizeMode={"contain"}
          />
        ) : (
          <View style={styles.container}>
            <VideoCard videoUrl={props.url} volume={10} />
          </View>
        )}
        {/* {loading  ? <Spinner /> : null} */}
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
  },
};

export default ZoomView;
