import { StyleSheet, Dimensions } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { AppColor } from '../../Theme'

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    cardContainer:{
    backgroundColor: 'white',
    borderRadius: 16,
    //overflow: 'hidden',
    padding:13,
    marginVertical:8,

    },
    cardShadow:{
      // borderRadius:10,
       // borderColor: "#0E365D",
        backgroundColor: 'transparent',
        shadowColor: AppColor.SHADOW_BG,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.52,
        shadowRadius: 2.22,
        elevation: 5,
    },

    cardHeading: {
        color: '#0E365D',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily:'MuseoSlab-700',
    },

})

export default styles;
