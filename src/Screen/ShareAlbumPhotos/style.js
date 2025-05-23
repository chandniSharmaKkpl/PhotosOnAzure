import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");
import { AppColor } from "../../Theme";

const styles = StyleSheet.create({
  txtName: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: "MuseoSlab-300",
    padding: "1%",
  },
  viewContactBottom: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
  },
  viewInsideBottom: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: "#f0f4f9",
    margin: 20,
  },
  shareScroll: {
    flex: 1,
    backgroundColor: "#f0f4f9",
  },
  imgCradstyle: {
    width: 98,
    height: 135.8,
    borderRadius: 20,
  },
  cellView: {
    width: width * 0.4,
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

  imageAlbum: {
    width: width * 0.4,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.15,
    borderRadius: 20,
  },

  imageAllbumCard: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.16,
    borderRadius: 20,
    alignSelf: "center",
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 20,
    position: "absolute",
  },
  imgView: {
    height: 140,
    width: 140,
  },
  albumBottomView: {
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
  albumBottomText: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    padding: "1%",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "MuseoSlab-300",
  },
  video: {
    width: "93%",
    height: "93%",
    alignSelf: "center",
  },
  imageView: {
    width: "100%",
    height: "100%",
  },
  innerimage: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.17,
    borderRadius: 20,
  },
  transprentview: {
    width: 98,
    height: 135.8,
    borderRadius: 20,
    backgroundColor: "#0E365D",
    position: "absolute",
    opacity: 0.7,
  },
  cellView: {
    width: width * 0.35,
    marginHorizontal: width * 0.02,
    height: height * 0.18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  album: {
    margin: 20,
  },
  albumText: {
    color: "#0E365D",
    fontWeight: "bold",
    fontSize: 22,
  },
  noconatct: {
    fontSize: 18,
    fontFamily: "MuseoSlab-300",
    color: AppColor.colors.GRAY,
    textAlign: "center",
    alignSelf: "center",
  },
  textLow: {
    color: "#0E365D",
    fontFamily: "MuseoSlab-300",
    fontSize: 12,
  },
  topView: {
    flex: 0.3,
  },
  contactsText: {
    color: "#0E365D",
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "MuseoSlab-700",
  },
  readContactView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  contactsTextView: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  readButtoncontainer: {
    marginLeft: width * 0.06,
    width: "60%",
    height: height * 0.09,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  readAndShareButton: {
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderColor: "lightgray",
    paddingLeft: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
  },
  sharebutton: {
    borderRadius: 10,
    backgroundColor: "#0E365D",
    width: "20%",
    justifyContent: "center",
    marginTop: "5%",
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  readOnlyButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#0E365D",
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenTextView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreenText: {
    color: "#0E365D",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "MuseoSlab-300",
  },
  readBtnStyle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
    fontFamily: "MuseoSlab-300",
  },
  socialMedia: {
    width: width * 0.9,
    alignSelf: "center",
    marginVertical: 20,
    padding: 15,
    backgroundColor: "rgb(206, 226, 244)",
    borderRadius: 20,
    marginHorizontal: 0,
  },
  buttonView: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyles: {
    height: 55,
    width: width * 0.8,
    borderRadius: 25,
    backgroundColor: "#db1e32",
    justifyContent: "center",
    alignItems: "center",
  },
  ///// contact view design

  container: {
    width: 100,
    marginHorizontal: width * 0.01,
    height: height * 0.17,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "lightgray",
  },
  imgCradstyle: {
    width: 98,
    height: 135.8,
    borderRadius: 20,
  },
  cardStyle: {
    width: 98,
    height: 100,
    borderRadius: 20,
  },
  selectIconView: {
    backgroundColor: "red",
    alignSelf: "center",
    zIndex: 1,
  },
  bottomView: {
    flex: 1,
    backgroundColor: "rgba(14, 54, 93, 0.9)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  usernameview: {
    flex: 0.3,
    backgroundColor: "rgba(16,70,88,0.7)",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  lastbottomview: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  lastbottomContactview: {
    flex: 1.0,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomshare: {
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
