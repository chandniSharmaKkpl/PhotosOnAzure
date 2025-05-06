import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { AppConstant } from "../../Theme";


const styles = StyleSheet.create({
    textInputButton:{
        width:'70%',
        alignSelf:'flex-start',
        borderWidth:0,
        height:60,
        backgroundColor:'transparent',
        paddingLeft:10,
        justifyContent:'center'
    },
    textCalendarInput:{
        fontFamily: 'MuseoSlab-300',
        color: 'black'
    },
    textCalendarEmpty:{
        fontFamily: 'MuseoSlab-300',
        color: 'gray'
    },
    inputStyle:{
        width:'70%',
        alignSelf:'flex-start',
        borderWidth:0,
        height:60,
        backgroundColor:'transparent',
        paddingLeft:10,
        fontFamily: 'MuseoSlab-300',
    },
    searchIconsView:{
        width:'30%',
        flexDirection:'row',
        height:'100%',
        alignItems:'center',
    },
    searchView:{
        height:60,
        width:'100%',
        alignSelf:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'silver',
        borderRadius:20,
        backgroundColor:'#eff4f9',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:'5%'
    },
    leftIconView:{
        flex:0.4, 
        height:'100%', 
        justifyContent:'center', 
        alignItems:'center'
    },
    leftIcon:{
        height:25,
        width:25,
    },
    rightIconStyle:{
        flex:0.4, 
        borderWidth:2,
        height:'100%', 
        justifyContent:'center', 
        alignItems:'center'
    },
    SearchIconStyle:{
       flex:0.6,
        height:'100%',
        width:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        borderRadius:20,
    },
   
    
    
    
});

export default styles;
