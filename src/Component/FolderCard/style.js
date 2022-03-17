import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { AppConstant } from "../../Theme";


const styles = StyleSheet.create({

    container:{
        height:105,
        width:72,
        borderWidth:1,
        borderRadius:20,
        borderColor:'lightgray'
       
    },
    cardStyle:{
        width:71, 
        height:70, 
        borderRadius:20,
        zIndex:1
      
    },
    selectIconView:{
        // width:40, 
        // height:40, 
        alignSelf:'center', 
        margin:10,
        zIndex:1
    },
    bottomView:{
        flex:1 , 
        backgroundColor:'rgba(14, 54, 93, 0.9)',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20, 
        // justifyContent:'center', 
        // alignItems:'center'
    }

});

export default styles;
