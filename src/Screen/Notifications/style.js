import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');



const styles = StyleSheet.create({
    album: { margin: 20 },
    albumText: {
        color: '#0E365D',
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily:'MuseoSlab-700',
    },
    greetingText: {
        fontSize: 20,
        fontWeight: "normal",
       // color: AppColor.colors.THEME_BLUE,
        fontFamily: "MuseoSlab-500",
      },
});

export default styles;
