import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginBottom: 20,
  },
  back: {
    position: "absolute",
    top: 25,
    right: 10,
  },
  logo: {
    height: 100,
    width: "100%",
    marginTop: "10%",
    marginBottom: "8%",
  },
  scrollViewStyle: {
    flex: 1,
  },
  titleView: {
    margin: 20,
  },
  titleStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "MuseoSlab-500",
  },
  inputView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputViewImage: {
    flex: 1,
  },
  imageIcon: {
    height: 200,
    width: "100%",
    position: "absolute",
  },
  loginButtonView: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loginText: {
    fontSize: 18,
    marginTop: 10,
  },
  alreadyHaveAccount: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "300",
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
  },
  containerDate: {
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "rgba(211,211,211,0.3)",
    borderRadius: 50,
  },
  textinputContainer: {
    marginBottom: 40,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    height: 20,
    width: 20,
    position: "absolute",
    left: 16,
  },
  backgroundIcon: {
    width: 60,
    position: "absolute",
    left: 0,
  },
  textInputStyle: {
    width: "100%",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    fontFamily: "MuseoSlab-500Italic",
    height: 30,
  },
  errorDate: {
    paddingLeft: 10,
    position: "absolute",
    bottom: -30,
  },
  //////// media modal styles
  modalmediaopen: {
    backgroundColor: "#fff",
    borderRadius: 3,
    overflow: "hidden",
  },
  titleviewstyle: {
    marginVertical: height * 0.01,
  },
  choosefilestyle: {
    fontSize: 18,
    fontFamily: "MuseoSlab-500",
    color: "black",
    paddingTop: 18,
    paddingBottom: 18,
    marginStart: 20,
  },
  lineStyle: {
    height: height * 0.002,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
  },
  renderMimetypeImagemainView: {
    flex: 1,
  },
  viewPopupStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 22,
  },
  textStylePopup: {
    color: "black",
    fontSize: 16,
    fontFamily: "MuseoSlab-500Italic",
    fontWeight: "400",
    padding: width * 0.03,
  },
  lineStyle1: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.4,
  },
  imagePopupStyle: {
    height: width * 0.05,
    width: width * 0.05,
    resizeMode: "contain",
  },
});

export default styles;
