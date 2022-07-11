import { StyleSheet, Dimensions, Platform } from "react-native";
import { AppColor } from "../../Theme";
import DeviceInfo, {getDeviceId} from 'react-native-device-info';

export default StyleSheet.create({
  container: {
   
  },
  MainWrappper: {
    // width:width,
    backgroundColor: "#fff",
    // backgroundColor: "pink",
    flexDirection: "row",
    // height: deviceInfo.hasNotch() ? 90 : 70,
    justifyContent: "space-between",
    paddingHorizontal: "15%",
    alignItems: "center",
    height:  Platform.OS === "ios"
    ? DeviceInfo.isTablet()
      ? 110
      : 80
    : DeviceInfo.isTablet()
    ? 90
    : 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  icon: {
    width:  Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 50 : 30 : DeviceInfo.isTablet() ? 40 : 30,
    height: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 50 : 30 : DeviceInfo.isTablet() ? 40 : 30,
  },
  addposticon: {
    width: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 50 : 35 : DeviceInfo.isTablet() ? 40 : 35,
    height: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 50 : 35 : DeviceInfo.isTablet() ? 40 : 35,
  },
  positionIcon: {
    // flex: 1,
    // position: "absolute",
    height : Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 130 : 110 : DeviceInfo.isTablet() ? 120 : 110,
    // height: DeviceInfo.isTablet() ? 130 : 110,
    alignItems: "center",
    width: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 130 : 110 : DeviceInfo.isTablet() ? 120 : 110,
    borderRadius: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 60 : 55 : DeviceInfo.isTablet() ? 55 : 55,
    justifyContent: "center",
    marginBottom: Platform.OS === "ios" ?  DeviceInfo.isTablet() ? 80 : 55 : DeviceInfo.isTablet() ? 70 : 55,
    // backgroundColor: "pink",

    backgroundColor: "rgba(240,244,249,0.7)",
  },
  whiteCircle: {
    height: DeviceInfo.isTablet() ? 100 : 80,
    width: DeviceInfo.isTablet() ? 100 : 80,
    backgroundColor: "rgba(256,256,256,0.3)",
    borderRadius: DeviceInfo.isTablet() ? 50 : 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  icon2: {},
});
