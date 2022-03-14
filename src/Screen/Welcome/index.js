import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import TextInputView from "../../Component/TextInputView";
import { AppConstant } from "../../Theme";

export const Welcome = (props) => {

    useEffect(() => {
    })

    return (
        <>
            <ImageBackground style={styles.imgBackground} source={require('../../assets/images/BackgroundDark.png')}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Logo.png')} />
                    </View>

                    <View style={styles.createAccountView}>
                        <Text style={styles.titleStyle}>Welcome</Text>
                    </View>
                    <View style={styles.inputView}>

                        <View >
                            <TextInputView
                                icon={require('../../assets/images/Full_Name.png')}
                                placeholder={'Enter Email or Username'}
                            />
                        </View>

                        <View style={{ marginTop: 25 }}>
                            <TextInputView
                                icon={require('../../assets/images/Password.png')}
                                placeholder={'Enter Password'}
                            />
                        </View>

                        <View style={{ alignItems: 'flex-end', width: '70%', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('ResetPassword')}>
                                <Text style={{ color: '#fff' }}>forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Verify')} style={{ height: 50, justifyContent: 'center', marginTop: 50, width: '80%', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'red', }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', zIndex: 1, width: '100%', bottom: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#fff' }}>Don't Have an Account?<Text onPress={() => props.navigation.navigate('Register')} style={{ color: 'red' }}>Create New Account</Text></Text>
                    </View>
                </View>

            </ImageBackground>

        </>
    )
}

