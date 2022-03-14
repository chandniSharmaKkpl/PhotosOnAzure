import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import TextInputView from "../../Component/TextInputView";
import { AppConstant } from "../../Theme";

export const Login = (props) => {

    useEffect(() => {
    })

    return (
        <>
            <ImageBackground style={styles.imgBackground} source={require('../../assets/images/BackgroundDark_HighRes.png')}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} resizeMode='contain' source={require('../../assets/Logo.png')} />
                    </View>

                    <View style={styles.createAccountView}>
                        {/* <Text style={styles.titleStyle}>Welcome</Text> */}
                    </View>
                    <View style={styles.inputView}>

                        <View style={styles.userImageStyle}>
                            <Image
                                source={require('../../assets/Logo.png')}
                                style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: '#eee' }}
                            />
                        </View>

                        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 35, fontWeight: '900', textAlign: 'center', color: 'white' }}>Welcome Nicky Chester</Text>
                        </View>


                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Drawer')} style={{ height: 50, justifyContent: 'center', marginTop: 50, width: '80%', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'red', }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={{ position: 'absolute', zIndex: 1, width: '100%', bottom: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#fff' }}>Don't Have an Account?<Text onPress={() => props.navigation.navigate('Register')} style={{ color: 'red' }}>Create New Account</Text></Text>
                    </View> */}
                </View>

            </ImageBackground>

        </>
    )
}

