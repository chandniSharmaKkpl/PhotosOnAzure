import { StyleSheet, Dimensions } from 'react-native';
import { AppColor } from '../../Theme'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";



const styles = StyleSheet.create({
    webview:{
        width: wp('100%'), 
        height:'100%', 
       
      },
    scrollview:{
     paddingLeft:'5%',
     paddingRight:'5%',
     paddingBottom:'5%', 
     paddingTop:'2%'
    },
    album: { margin: 20 },
    albumText: {
        color: AppColor.colors.TITLE_BLUE,
        fontWeight: 'bold',
        fontSize: 22,
    },
    titleText: {
        color: AppColor.colors.RED,
       // fontFamily: "MuseoSlab",
        fontSize: 14,
        fontWeight: "300",
        fontStyle: "normal",
    },
    descriptionText: {
        paddingTop:hp('2%'),    
        color: AppColor.colors.THEME_BLUE,
        //fontFamily: "MuseoSlab",
        fontSize: 14,
        fontWeight: "300",
        fontStyle: "normal",
        paddingBottom:hp('2%')
    }
});

export default styles;
