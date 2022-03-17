import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Welcome } from '../Screen/Welcome';
import { Register } from '../Screen/Register';
import { Verify } from '../Screen/Verify';
import { ResetPassword } from "../Screen/ResetPassword";
import { Login } from "../Screen/Login";
import { HomeScreen } from "../Screen/HomeScreen";
import { AlbumScreen, AddPhotoToAlbum, AddNewAlbum } from "../Screen/Album";

import HomeTabNavigator from './HomeTabNavigator';
import CustomDrawer from './Navigators/CustomDrawer';
import Drawers from './Navigators/Drawer';
import CustomStackBar from './Navigators/CustomStackBar';
import  Notifications  from "../Screen/Notifications";
import { LoginWithEmail } from '../Screen/LoginWithEmail';
import { ForgotPassword } from '../Screen/ForgotPassword';
import { Verification } from '../Screen/Verification';
import AuthContext from '../context/AuthContext'
import PrivacySecurity from '../Screen/PrivacySecurity';
import About from '../Screen/About';
import Subscription from '../Screen/Subscription';
import EditProfile from '../Screen/Profile';
import UpdateEmail from '../Screen/UpdateEmail';
import InviteCode from '../Screen/InviteCode';
import ManageAccess from '../Screen/ManageAccessScreen.js';



const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();


const DrawerStack = () => {
    return (
        <Drawer.Navigator initialRouteName={"Home"} drawerContent={() => <CustomDrawer />} drawerType="slide">
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="PrivacySecurity" component={PrivacySecurity} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Subscription" component={Subscription} />
            <Drawer.Screen name="Home" component={HomeTabNavigator} />
            <Drawer.Screen name="EditDetails" component={EditProfile} />
            <Drawer.Screen name="UpdateEmail" component={UpdateEmail} />
            <Drawer.Screen name="InviteCode" component={InviteCode} />
            <Drawer.Screen name="ManageAccess" component={ManageAccess} />

        </Drawer.Navigator>
    )
}



const NavigationSetup = () => {
    const { user } = React.useContext(AuthContext)
    return (
        <Stack.Navigator initialRouteName={'LoginWithEmail'} options={{ gestureEnabled: true }} >
            {user === null || user.sessid === null ?
                <>
                    <Stack.Screen
                        component={Verification}
                        name='VerificationNew'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={LoginWithEmail}
                        name='LoginWithEmail'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={ForgotPassword}
                        name='ForgotPassword'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={Welcome}
                        name='Welcome'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={Register}
                        name='Register'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={Verify}
                        name='Verify'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={ResetPassword}
                        name='ResetPassword'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                    <Stack.Screen
                        component={Login}
                        name='Login'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />
                </> :
                <Stack.Screen
                    name="DrawerStack"
                    component={DrawerStack}
                    options={{
                        header: () => null,
                        gestureEnabled: false,
                        headerTransparent: true,
                    }}
                />}

        </Stack.Navigator>


    )
}
export {NavigationSetup} 
