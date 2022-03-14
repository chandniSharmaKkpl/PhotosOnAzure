import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View, BackHandler } from 'react-native';
import styles from './style';
import TextInputView from "../../Component/TextInputView";
import { AppConstant } from "../../Theme";

export const ResetPassword = (props) => {

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return function cleanup() {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButtonClick
            );     
              };
    })

    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
      }
    

    return (
        <>
            <ImageBackground style={styles.imgBackground} source={require('../../assets/images/BackgroundDark.png')}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/Logo.png')} />
                    </View>

                    <View style={styles.createAccountView}>
                        <Text style={styles.titleStyle}>Reset Password</Text>
                        <Text style={styles.title}>Set the new password for your account so you can login and access all features</Text>
                    </View>
                    <View style={styles.inputView}>

                        <View>
                            <TextInputView
                                icon={require('../../assets/images/Full_Name.png')}
                                placeholder={AppConstant.constant.fullName}
                            />
                        </View>
                        <View style={{marginTop:25}}>
                            <TextInputView
                                icon={require('../../assets/images/Full_Name.png')}
                                placeholder={AppConstant.constant.fullName}
                            />
                        </View>


                        <TouchableOpacity onPress={() => props.navigation.navigate('Welcome')} style={{ height: 50, justifyContent: 'center', marginTop: 50, width: '80%', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'red', fontFamily: 'MuseoSlab-100-Regular' }}>Confirm & Update</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </ImageBackground>

        </>
    )
}

