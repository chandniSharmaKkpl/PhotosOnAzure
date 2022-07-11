import { StyleSheet, Dimensions, Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('screen');
import DeviceInfo, {getDeviceId} from 'react-native-device-info';



const styles = StyleSheet.create({
    backIconArea:{
      width:40,
      height:40,
      justifyContent:'center',
      //backgroundColor:'blue',
      alignItems:'center',
      marginRight:'2%'
    },
    backIconAreaNotification:{
      width:40,
      height:40,
      justifyContent:'center',
      //backgroundColor:'green',
      alignItems:'center',
      zIndex:999
    
    },
    viewInside:{
        flexDirection:"row",
        paddingTop:'2%', 
        paddingBottom:'2%'
    },
    containerHome:{
      //  height:'10.3%',
        backgroundColor:"#0E365D", 
        // paddingTop: DeviceInfo.hasNotch() ? 30 : null,
        paddingTop: hp('1.8%'),
        justifyContent:'center',
        alignItems:'center',
       // backgroundColor:"pink", 
    },
   container:{
    height:'10%',
    backgroundColor:"#0E365D", 
   
    // paddingTop: DeviceInfo.hasNotch() ? 30 : null,
    paddingTop:Platform.OS === 'android'? hp('1.8%'): hp('1.6%'),
    justifyContent:'center',
    alignItems:'center',

   },
   leftView:{
       flex:0.2,
        justifyContent:'center',
        paddingTop:Platform.OS === 'android'? 0: '3%'

    //    alignItems:'center'
   },
   leftButton:{
    paddingLeft:wp('2.5%')
   },
   centerView:{
   flex:0.6,
  // justifyContent:'center',
   alignItems:'center',
   tintColor:'white',
 // backgroundColor:'pink',
   paddingTop:Platform.OS === 'android'? 0: '2.3%'
   },
   rightView:{
       flex:0.2,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       paddingTop:Platform.OS === 'android'? 0: '3%',
      // zIndex:999
     // backgroundColor:'orange',
   },
   onlyRighIcon:{
    flex:0.2,
    justifyContent:'center',
       alignItems:'flex-end',
       paddingTop: hp('2.5%'),
       paddingRight: hp('1.5%'),
       //backgroundColor:'blue'
},
   leftIcon:{
       height: DeviceInfo.isTablet() ? 34 : 20,
       width:DeviceInfo.isTablet() ? 34 : 20
   },
   titleIcon:{
    height:DeviceInfo.isTablet() ? 60 : 45,
    width: DeviceInfo.isTablet() ? 70 : 55,
    tintColor:'#fff'
   },
   righticonleftView:{
    flex:1,
   // height:'50%',
   // width:'100%', 
    justifyContent:'center',
    alignItems:'center',
  // backgroundColor:'red'
   },
   rightIcon:{
    marginLeft:'4%',
    height: DeviceInfo.isTablet() ? 34 : 20,
    width: DeviceInfo.isTablet() ? 34 : 20,
    tintColor:'#fff',
   //backgroundColor:'pink'
   },
   rightIconNotification:{
   // margin:'4%',
    height: DeviceInfo.isTablet() ? 30 : 20,
    width: DeviceInfo.isTablet() ? 30 : 20,
    tintColor:'#fff',
    // backgroundColor:'orange'
   },
});

export default styles;
