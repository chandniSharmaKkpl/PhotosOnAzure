import { StyleSheet, Dimensions, Platform } from "react-native";
import { AppColor } from "../../Theme";
const { height, width } = Dimensions.get("screen");

import * as globals from "../../Utils/globals";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  modalmediaopen: {
    backgroundColor: "#fff",
    borderRadius: 3,
    overflow: "hidden",
  },
  viewLoader: {
    padding: 10,
  },
  textEmpty: {
    color: AppColor.colors.THEME_BLUE,
    fontSize: 22,
    fontFamily: "MuseoSlab-700",
    fontWeight: "500",
   alignSelf:'center', 
   marginTop:'15%',
   textAlign:'center'
  },
  titleviewstyle: {
    // marginHorizontal: globals.screenWidth * 0.02,
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
    backgroundColor: "white",
    opacity: 0.6,
  },
  renderMimetypeImagemainView: {
    flex: 1,
    marginBottom: globals.screenWidth * 0.015,
  },
  viewPopupStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 22,
  },
  imagePopupStyle: {
    height: globals.screenWidth * 0.05,
    width: globals.screenWidth * 0.05,
    resizeMode: "contain",
  },
  textStylePopup: {
    color: "rgb(27, 27, 30)",
    fontSize: 16,
    fontFamily: "MuseoSlab-300",
    fontWeight: "400",
    padding: globals.screenWidth * 0.03,
  },
  lineStyle1: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.4,
  },

  ////////////////// Render img view
  cellView: {
    width: width * 0.4,
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    height: height * 0.15,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  video: {
    width: '91%',
    height: '91%',
    alignSelf: 'center'
},
  imageView: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: width * 0.4,

    height: height * 0.15,
    borderRadius: 20,
    // width: width * 0.4,
    //     marginHorizontal: width * 0.02,
    //     marginVertical: width * 0.02,
    //     height: height * 0.15,
    //     borderRadius: 20,
  },
  videoview:{
    width: '100%',
    height: '100%',
    // borderRadius: 20,
    justifyContent: 'center'
  },
  album: {
    flex: 0.3,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10
  },
  subTitle: {
    color: "#0E365D",
    fontWeight: "400",
    fontSize: 22,
    fontFamily: "MuseoSlab-700",
  },
  albumText: {
    color: "#0E365D",
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "MuseoSlab-700",

    // marginTop:1
  },
  invitecontactbuttonview: {
    // flex:1,
    height: globals.screenWidth * 0.15,
    width: globals.screenWidth * 0.4,
    // marginLeft:width *0.05,
    borderRadius: 6,
    backgroundColor: "#0E365D",
    alignItems: "center",
    justifyContent: "center",
  },
  invitecontactbuttontext: {
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "MuseoSlab-300",
  },
});

export default styles;
