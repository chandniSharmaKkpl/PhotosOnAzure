import { StyleSheet, Dimensions } from 'react-native';
import { AppColor } from '../../Theme'


export default StyleSheet.create({
    MainWrappper: {
        // width:width,
        backgroundColor: '#fff',
        flexDirection: "row",
        // height: deviceInfo.hasNotch() ? 90 : 70,
        justifyContent: 'space-between',
        paddingHorizontal:'15%',
        alignItems: 'center',
        height: 80 ,
        borderTopLeftRadius:25,
        borderTopRightRadius:25

    },
    icon: {
        width:  30,
        height:  30,
        // width: AppDimension.deviceWidth < 400 ? 30 : 32,
        // height: AppDimension.deviceWidth < 400 ? 30 : 32,
    },
    addposticon: {
        width: 35,
        height: 35,
    },
    positionIcon:{
        position: 'absolute',
        height:110,
        alignItems:'center',
        width:110,
        borderRadius:55,
        justifyContent:'center',
        top:  -60,
        right: "50%",
      // backgroundColor:'pink'
        backgroundColor:'rgba(240,244,249,0.7)'

    },
    whiteCircle:{
        height:80,
        width:80,
        backgroundColor:'rgba(256,256,256,0.3)',
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: AppColor.SHADOW_BG,
        shadowOffset: {
          width: 6,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 1,
        backgroundColor:'white',
       
    },
    icon2: {
        width:  55,
        height: 55,
    },
    
    
})