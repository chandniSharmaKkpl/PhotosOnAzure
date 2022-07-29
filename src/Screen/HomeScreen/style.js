import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");
import { AppColor } from "../../Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DeviceInfo, { getDeviceId } from "react-native-device-info";

const styles = StyleSheet.create({
  invitebuttonview: {
    position: "absolute",
    right: DeviceInfo.isTablet() ? 16 : 5,
    bottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "red",
    marginRight: 25,
    shadowColor: "#103458",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 22,
    shadowRadius: 4.65,
    elevation: 5,
  },
  addNewBtn: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  addPlusIconView: {
    width:
      Platform.OS === "ios"
        ? DeviceInfo.isTablet()
          ? 50
          : 20
        : DeviceInfo.isTablet()
        ? 40
        : 20,
    height:
      Platform.OS === "ios"
        ? DeviceInfo.isTablet()
          ? 50
          : 20
        : DeviceInfo.isTablet()
        ? 40
        : 20,
  },
  invitebuttontext: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    fontFamily: "MuseoSlab-500",
    justifyContent: "center",
  },
  textBottom: {
    color: "#fff",
    fontFamily: "MuseoSlab-500",
    fontSize: 12,
  },
  addView: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  video: {
    width: "93%",
    height: "93%",
    alignSelf: "center",
    backgroundColor: "pink",
  },
  viewTitleAndDelete: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconDelete: {
    paddingLeft: wp("2%"),
  },
  viewLineAndDropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
    alignItems: "center",
  },
  viewFlatListDropDown: {
    backgroundColor: AppColor.colors.RED,
    borderRadius: 6,
    padding: "5%",
  },
  viewDropDownCell: {
    padding: "2%",
  },
  textDropDownCell: {
    padding: "2%",
    color: AppColor.colors.WHITE,
    fontFamily: "MuseoSlab-700",
  },
  viewAlbum: {
    padding: "5%",
    backgroundColor: AppColor.colors.RED,
    borderRadius: 6,
  },
  textAlbum: {
    padding: "3%",
    color: AppColor.colors.WHITE,
    fontFamily: "MuseoSlab-700",
    fontSize: DeviceInfo.isTablet() ? 18 : 14,
  },
  viewLoader: {
    padding: 10,
  },
  activityIndicator: {
    alignSelf: "center",
    padding: 10,
  },
  viewTabs: {
    width: "50%",
    alignSelf: "flex-end",
    height: "18%",
  },
  album: { margin: 10 },
  headerViewUser: {
    marginBottom: "5%",
  },

  albumText: {
    color: "#0E365D",
    fontWeight: "700",
    fontSize: 22,
    fontFamily: "MuseoSlab-500",
  },
  viewCellAlbum: {
    position: "absolute",
    width: width * 0.4,
    bottom: 0,
    height: 20,
    backgroundColor: "rgba(14, 54, 93, 0.6)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
    marginBottom: "5%",
  },
  cellView: {
    width:
      Platform.OS === "ios"
        ? DeviceInfo.isTablet()
          ? width * 0.44
          : width * 0.41
        : DeviceInfo.isTablet()
        ? width * 0.43
        : width * (0.41),
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "red",
  },

  cellViewAlbumShare: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
  },

  imageAllbumCard: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.16,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonTransparant: {
    width: width * 0.41,
    marginHorizontal: width * 0.02,
    height: height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    position: "absolute",
    top: 0,
  },

  buttonTransparantShare: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    position: "absolute",
    top: 0,
  },

  cellViewTransparantShare: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#0E365D",
    top: 0,
    opacity: 0.5,
  },
  cellViewTransparant: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#0E365D",
    top: 0,
    opacity: 0.5,
  },

  imageView: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: width * 0.4,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.15,
    borderRadius: 20,
  },
  imageViewLongPress: {
    width: "80%",
    height: "80%",
  },
  imageLongPress: {
    width: width * 0.3,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.11,
    borderRadius: 20,
    alignSelf: "center",
  },
  allPhotosTitle: {
    marginVertical: 20,
    fontFamily: "MuseoSlab-700",
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  userDetailView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  userHeaderView: {
    flexDirection: "row",
    alignItems: "center",
  },

  greetingText: {
    fontSize: 16,
    fontWeight: "normal",
    color: AppColor.colors.THEME_BLUE,
    fontFamily: "MuseoSlab-300",
  },
  hiText: {
    fontSize: DeviceInfo.isTablet() ? 22 : 20,
    fontWeight: "normal",
    color: AppColor.colors.THEME_BLUE,
    fontFamily: "MuseoSlab-500",
  },
  footerContainerView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(14, 54, 93, 0.6)",
    width: width * 0.41,
    height: height * 0.15,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
  },
  addView: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  albumView: {
    position: "absolute",
    bottom: 0,
    height: 20,
    backgroundColor: "rgba(14, 54, 93, 0.55)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  fullScreenTextView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreenText: {
    color: "#0E365D",
    fontWeight: "300",
    fontSize: 16,
  },
  albumBottomViewShare: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "rgba(16,70,88,0.7)",
    width: "90%",
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  albumBottomView: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(16,70,88,0.7)",
    width: "99%",
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  albumBottomText: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    padding: "1%",
    fontSize: DeviceInfo.isTablet() ? 20 : 12,
  },
});

export default styles;
