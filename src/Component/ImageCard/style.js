import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { AppConstant } from "../../Theme";


const styles = StyleSheet.create({

    imageView:{
        height:120,
        width:120,
    },
    cardStyle:{
        width:115, 
        height:115, 
        borderRadius:20,
        position:'absolute'
    },
    selectIconView:{
        width:20, 
        height:20, 
        alignSelf:'flex-end', 
        margin:10
    }
    
});

export default styles;
