import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { AppConstant } from "../../Theme";



const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        // backgroundColor: 'rgba(255,25,255,0.5)',
    },
    logoContainer: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        flex: 0.4,
     
    },
    logo: {
        height: 70,
        width: '100%',
        alignSelf: 'center'
    },
    createAccountView: {
        height: '100%',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        marginTop: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        zIndex: 1,
    },
    scrollViewStyle: {
        marginTop: '20%',
        width: '100%'
    },
    titleStyle: {
        marginTop: '10%',
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
        // fontFamily: AppConstant.constant.MuseoSlab,
        textAlign: 'center'
    },

    title: {
        marginTop: '10%',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
        // fontFamily: 'MuseoSlab-100-Regular',
        textAlign: 'center'
    },
    inputView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    // height:50,width:'80%',borderColor:'lightgray',borderWidth:1,flexDirection:'row',alignItems:'center',backgroundColor:'rgba(211,211,211,0.3)',borderRadius:50
    buttonStyle: {
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50
    },
    welcomeinputView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,

    },
    inputViewStyle: {
        height: 50,
        width: '80%',
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(211,211,211,0.3)',
        borderRadius: 50
    }
});

export default styles;
