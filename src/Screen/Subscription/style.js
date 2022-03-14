import { StyleSheet, Dimensions } from "react-native";
import { AppColor, AppConstant } from "../../Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  upgradeNowTxt:{
    color: AppColor.colors.WHITE,
    // fontWeight: "900",
     fontStyle: "normal",
     fontFamily: "MuseoSlab-900",
  },
  textPlan: {
    color: AppColor.colors.WHITE,
   // fontWeight: "900",
    fontStyle: "normal",
    fontFamily: "MuseoSlab-900",
  },
  tabSwitch: {
    alignSelf: "center",
    width: wp("65%"),
    paddingTop: hp("3%"),
  },
  buttonSave: {
    width: "80%",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  activedotstyle: {
    width: 20,
    height: 10,
    borderRadius: 5,
    // marginHorizontal: 1,
    backgroundColor: AppColor.colors.THEME_BLUE,
  },
  inactivedotstyle: {
    borderWidth: 1,
    borderColor: AppColor.colors.GRAY,
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  scrollview: {
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
    paddingTop: "2%",
  },
  textSelectPlan: {
    color: AppColor.colors.TITLE_BLUE,
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "MuseoSlab-900",
  },
  cardTop: {
    alignItems: "center",
    backgroundColor: AppColor.colors.GRAY,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 10,
    // opacity:0.7

    // height:'20%'
  },
  bottombtnview: {
    backgroundColor: AppColor.colors.THEME_BLUE,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  mainview: {
    // backgroundColor: AppColor.colors.THEME_BLUE,
    borderRadius: 15,
    height: 350,
    marginLeft: 15,
    marginRight: 15,
  },
  cardBottom: {
    backgroundColor: AppColor.colors.TITLE_BLUE,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // height:'80%'
  },
  btn: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 18,
  },
  textPlanTitle: {
    fontSize: 24,
    fontFamily: "MuseoSlab-700",
    fontWeight: "900",
    fontStyle: "normal",
    color: AppColor.colors.WHITE,
    padding: "2%",
    textAlign:'center'
    
  },
  textPrice: {
    fontFamily: "MuseoSlab-500",
    fontSize: 24,
    fontWeight: "500",
    fontStyle: "normal",
    color: AppColor.colors.WHITE,
    padding: "2%",
  },
  textBottom: {
    fontFamily: "MuseoSlab-500",
    padding: "2%",
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    color: AppColor.colors.WHITE,
  },
  textEndDate:{
    fontFamily: "MuseoSlab-500",
    padding: "2%",
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    color: AppColor.colors.WHITE,
    flexWrap:'wrap',
    width:'50%',
   // backgroundColor:'pink'
  },
  album: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  albumText: {
    fontFamily: "MuseoSlab-700",
    color: AppColor.colors.TITLE_BLUE,
    fontWeight: "bold",
    fontSize: 22,
  },
  titleText: {
    fontFamily: "MuseoSlab-700",
    color: AppColor.colors.RED,
    // fontFamily: "MuseoSlab",
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "normal",
  },
  descriptionText: {
    fontFamily: "MuseoSlab-700",

    color: AppColor.colors.THEME_BLUE,
    //fontFamily: "MuseoSlab",
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "normal",
  },
});

export default styles;
