import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { AppConstant } from "../../Theme";


const styles = StyleSheet.create({
    container:{
        height: 50, 
        alignSelf: 'center', 
        width: '80%', 
        borderColor: 'lightgray', 
        borderWidth: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(211,211,211,0.3)', 
        borderRadius: 50 , 
    },
    iconContainer:{
        height: 50, 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 25, 
        backgroundColor: '#fff'
    },
    iconStyle:{
        height: 20, 
        width: 20
    },
    textInputStyle:{
        backgroundColor: 'transparent', 
        height: 50, 
        maxHeight: 80,
        width:'83%', 
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'MuseoSlab-300'
        // fontFamily:AppConstant.constant.MuseoSlab
        
      }
});

export default styles;
