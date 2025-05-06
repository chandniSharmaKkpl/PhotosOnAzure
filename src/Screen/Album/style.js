import { StyleSheet, Dimensions } from "react-native";
import { AppColor } from "../../Theme";
import * as globals from "../../Utils/globals";

const { height, width } = Dimensions.get("screen");
import DeviceInfo, {getDeviceId} from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  HeadingTitle: {
    marginLeft: "5%",
    marginTop: "5%",
    flexDirection: "row",
  },
  viewContainImg: {
    width: "50%",
    height: "50%",
  },
  addAlbumView: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  footerContainerView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "rgba(14, 54, 93, 0.6)",
    width: width * 0.41,
    height: height * 0.15,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
  },
  footerAddAlbum: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(14, 54, 93, 0.6)",
  },
  detailText: {
    fontSize: 14,
    fontWeight: "normal",
    color: AppColor.colors.THEME_BLUE,
    fontFamily: "MuseoSlab-300",
    marginLeft: "5%",
    marginTop: "2%",
  },

  detailText2: {
    fontSize: 14,
    fontWeight: "normal",
    color: AppColor.colors.THEME_BLUE,
    fontFamily: "MuseoSlab-300",
    marginTop: "2%",
  },

  iconDelete: {
    paddingLeft: wp("2%"),
  },
  buttonSave: {
    width: "80%",
    alignSelf: "center",
    marginBottom: hp("5%"),
  },
  textInputView: {
    margin: "5%",
    borderColor: "gray",
    borderRadius: 15,
    borderWidth: 0.4,
    backgroundColor: AppColor.colors.OFF_WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  textInput: {
    padding: "5%",
    fontFamily: "MuseoSlab-700",
  },
  textDate: {
    fontFamily: "MuseoSlab-300",
    color: "black",
    fontSize: 18,
  },
  album: {
    margin: 20,
  },
  albumAddNew: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  subTitle: {
    color: "#0E365D",
    fontWeight: "400",
    fontSize: 22,
    fontFamily: "MuseoSlab-700",
  },
  albumText: {
    color: "#0E365D",
    fontWeight: "600",
    fontSize: 22,
    fontFamily: "MuseoSlab-700",
  },
  leftIcon: {
    height: 20,
    width: 20,
  },
  SearchIconView: {
    marginLeft: 10,
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 20,
  },
  searchView: {
    height: 60,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 20,
    backgroundColor: "#eff4f9",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  createText: {
    fontSize: 12,
    fontFamily: "MuseoSlab-300",
    color: "#fff",
  },
  createTouchable: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  skyBlueView: {
    flex: 0.5,
    backgroundColor: "rgb(54,135,214)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  imageShareIcon: {},
  pencilIcon: {
    flex: 0.2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  navyBlueView: {
    flex: 0.5,
    backgroundColor: "#0E365D",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },

  renderItemContainer: {
    width: width * 0.88,
    height: height * 0.09,
    flexDirection: "row",
    backgroundColor: "#0E365D",
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 1,
  },
  innerContainer: {
    width: width * 0.75,
    height: height * 0.112,
    backgroundColor: "#eff4f9",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
  },
  imageFolder: {
    width: "100%",
    height: "100%",
  },
  viewAlbumPlaceHolder: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 20,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 20,
  },
  video: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 20,
  },
  iconView: {
    width: width * 0.3,
    justifyContent: "center",
    right: 0,
    height: "50%",
  },
  shareIcon: {
    marginHorizontal: 10,
    borderRadius: 20,
    width: 20,
    height: 20,
  },
  invitebuttonview: {
    padding: 7,
    borderRadius: 6,
    backgroundColor: "red",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  invitebuttontext: {
    color: "white",
    fontWeight: "600",
    fontSize: DeviceInfo.isTablet() ? 18 : 12,
    fontFamily: "MuseoSlab-300",
    width: width * 0.35,
  },
  addView: {
    width: DeviceInfo.isTablet() ? 18 : 10,
    height: DeviceInfo.isTablet() ? 18 : 10,
    marginLeft: 6,
    marginRight: 6,
  },

  ///// shared/own album style
  viewAlbum: {
    padding: "5%",
    backgroundColor: "red",
    borderRadius: 6,
  },
  textAlbum: {
    padding: "3%",
    color: AppColor.colors.WHITE,
    fontFamily: "MuseoSlab-700",
    fontSize: DeviceInfo.isTablet() ? 18 : 14
  },
  textMainTitle: {
    fontFamily: "MuseoSlab-700",
    fontWeight: "bold",
    color: "#0E365D",

    fontSize: 22,
  },
  textSelectPhoto: {
    fontFamily: "MuseoSlab-300",
    color: "#fff",
    textAlign: "center",
    fontSize : DeviceInfo.isTablet () ? 16 : 14,
  },
  viewFlatListDropDown: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: "5%",
  },
  viewDropDownCell: {
    padding: "2%",
  },
  textDropDownCell: {
    padding: "2%",
    color: AppColor.colors.WHITE,
  },
  iconimgingle: {
    width: 20,
    margin: 5,
    height: 20,
  },
  iconviewsingle: {
    width: width * 0.3,
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    right: 0,
    height: "100%",
  },
  lineview: {
    width: width * 0.3,
    backgroundColor: "white",
    height: "1%",
  },

  //////// react edit album model style
  modalmediaopen: {
    backgroundColor: "#fff",
    borderRadius: 3,
    overflow: "hidden",
  },
  titleviewstyle: {
    marginVertical: globals.screenHeight * 0.01,
  },
  choosefilestyle: {
    fontSize: 18,
    fontFamily: "MuseoSlab-700",
    color: "black",
    paddingTop: 18,
    paddingBottom: 18,
    marginStart: 20,
  },
  lineStyle: {
    height: globals.screenHeight * 0.002,
    width: "100%",
  },
  btn: {
    marginVertical: 5,
    marginHorizontal: 18,
    borderRadius: 18,
  },
});

export default styles;
