import { StyleSheet, Dimensions, Platform } from 'react-native';
import {AppColor} from '../../Theme'

const { height, width } = Dimensions.get('screen');

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    buttonSave:{
     width:'80%',
     alignSelf:'center',
    // marginBottom:hp('5%')
    },
    textInputView: {

         margin: '5%',
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 0.4,
        backgroundColor: AppColor.colors.OFF_WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    textInput:{
      padding: '5%',
    
    },
    album: { margin: 20 },
    subTitle:{
        color: '#0E365D',
        fontWeight: '400',
        fontSize: 22,
        fontFamily: 'MuseoSlab-700',

    },
    albumText: {
        color: '#0E365D',
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'MuseoSlab-700',
        // marginTop:1
    },
    invitecontactbuttonview:{
        flex:1,
        marginLeft:width *0.05,
        borderRadius:6,
        backgroundColor:"red", 
        alignItems:'center', 
        justifyContent:'center'
    },
    invitecontactbuttontext:{
        color: 'white',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'MuseoSlab-300',
    
    },
    sharebutton:{
        flex:1,
        borderRadius:10,
        backgroundColor:'#0E365D', 
        // width:'90%', 
        // height:'90%',
        justifyContent:'center',
        marginTop:10,
        alignItems:'center'
    },
    leftIcon: {
        height: 20,
        width: 20
    },
    SearchIconView: {
        marginLeft: 10,
        height: '100%',
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 20
    },
    searchView: {
        height: 60,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 20,
        backgroundColor: '#eff4f9',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    createText: {
        fontSize: 18,
        fontFamily: 'MuseoSlab-300',
        color: '#fff'
    },
    noconatct:{
        fontSize: 18,
        fontFamily: 'MuseoSlab-300',
        color: AppColor.colors.GRAY,
        textAlign:'center',
        alignSelf:'center'
    },
    createTouchable: {
        backgroundColor: '#0E365D',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    renderItemContainer: {
        width: width * 0.88,
        height: height * 0.09,
        flexDirection: 'row',
        backgroundColor: '#0E365D',
        alignSelf: 'center',
        borderRadius: 20,
        margin: 8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 0.5
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 1

    },
    innerContainer: {
        width: width * 0.75,
        height: height * 0.09,
        backgroundColor: '#eff4f9',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        borderRadius: 20,
        // shadowColor:'gray',
        // shadowOffset: {
        //     width: 0,
        //     height: 0.5
        // },
        // shadowRadius: 2,
        // shadowOpacity: 0.5,
        // elevation: 1

    },
    image: {

        width: width * 0.25,
        height: height * 0.083,
        borderRadius: 15,
        marginLeft:(Platform.OS =='ios')?3:0,
        // shadowColor:'red',
        // shadowOffset: {
        //     width: 0,
        //     height: 0.5
        // },
        // shadowRadius: 2,
        // shadowOpacity: 0.5,
        // elevation: 1
    },
    iconView: {
        width: width * 0.3,
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 20,
        position: 'absolute',
        right: 0,
        height: '100%',
    },
    shareIcon: {
        width: 20,
        margin: 5,
        height: 20
    }
});

export default styles;
