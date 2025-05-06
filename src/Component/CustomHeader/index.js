import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import style from './style'
import { AppColors } from '../../Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = (props) => {
    const {
        title,
        leftIcon,
        leftClick,
        rightIcon,
        rightClick,
        customStyles,
        onNavigation,
        rightVectorIcon
    } = props;
    return (
        <>
            <StatusBar  barStyle={"light-content"} backgroundColor={AppColors.colors.appColor} />
            <View style={[style.mainWrapper,customStyles.mainWrapper]}>
                
                <TouchableOpacity style={[style.leftView]} activeOpacity={leftClick ? 0.8 : 1} onPress={leftClick ? leftClick : null}>
                    {/* <Image source={AppImages.images.back} style={[style.leftIcon]} /> */}
                    {leftIcon ? <Image source={leftIcon} resizeMode={"contain"} style={[style.leftIcon, , customStyles.leftIcon]} /> : null}
                </TouchableOpacity>

                <View style={[style.textView]}>                    
                {leftIcon ? <Image source={leftIcon} resizeMode={"contain"} style={[style.leftIcon, , customStyles.leftIcon]} /> : null}

                </View>

                <TouchableOpacity style={[style.rightView]} activeOpacity={rightClick ? 0.8 : 1} onPress={rightClick ? rightClick : null}>
                    <>
                    {/* <Image source={AppImages.images.back} style={[style.rightIcon]} /> */}
                    {rightIcon ? <Image source={rightIcon} resizeMode={"contain"} style={[style.rightIcon, , customStyles.rightIcon]} /> : null}
                    {rightVectorIcon ? <Icon color={'#fff'} size={25} name={rightVectorIcon} /> : null}
                    </>
                </TouchableOpacity>

            </View>
        </>
    )
}
export default Header;
Header.defaultProps = { customStyles: {} };