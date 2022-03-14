import React, { useEffect, useState } from 'react'
import { Text, Image, Keyboard } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screen/HomeScreen';
import { Login } from '../Screen/Login';
import { Welcome } from '../Screen/Welcome';
import BottomBar from '../Component/BottomBar';
import { AlbumScreen, AddPhotoToAlbum , AddNewAlbum, AlbumDetailScreen} from '../Screen/Album';
import { ShareAlbumPhotos } from '../Screen/ShareAlbumPhotos';
import {InviteContact} from '../Screen/InviteContact';
import {AlredyInviteContact} from '../Screen/AlredyInvitedContact';
import  AlbumStack  from "./TabStackNavigator/AlbumStack";
import Drawers from './Navigators/Drawer';
import CustomDrawer from './Navigators/CustomDrawer';
import CustomStackBar from './Navigators/CustomStackBar';
import HomeStack from './TabStackNavigator/HomeStack';
import { View } from 'react-native';
import {CameraIcon} from '../Screen/CameraIcon'
import InviteCode from '../Screen/InviteCode';

const Tab = createBottomTabNavigator();
export default function HomeNavigation(props) {
//   var countBack = 0;

// React.useEffect(() => {

//   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

//   return () => {
//     BackHandler.removeEventListener(
//       "hardwareBackPress",
//       handleBackButtonClick
//     );
//   };
// }, [])

// const handleBackButtonClick = () => {
//   countBack = countBack + 1;
  

//   if (countBack > 1) {
//     Alert.alert(
//       "Exit App",
//       "Do you want to exit the application?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => (countBack = 0),
//           style: "cancel",
//         },
//         {
//           text: "Ok",
//           onPress: () => BackHandler.exitApp(),
//         },
//       ],
//       {
//         cancelable: false,
//       }
//     );
//   } else {
   
//   }
//   return true;
// };

  return (
    <Tab.Navigator
      // tabBar={props => <BottomBar {...props} />}
      // screenOptions={({ route }) => ({
      //   tabBarLabel: ({ focused }) => {

      //     return <Text style={{}}>{route.name}</Text>
      //   },
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName; let colors;
      //     return <Image source={iconName} style={{ height: 20, width: 20 }} />
      //   },
      // })}
      // tabBarOptions={{
      //   keyboardHidesTabBar: true
      // }}
      initialRouteName={'HomeStack'}>

     <Tab.Screen options={{tabBarVisible:false}}  name="HomeStack" component={HomeStack} />
     <Tab.Screen options={{tabBarVisible:false}} name="Album" component={AlbumStack} />

       <Tab.Screen options={{tabBarVisible:false}}  name="AddNewAlbum" component={AddNewAlbum} />
       
       <Tab.Screen options={{tabBarVisible:false}}  name="AlbumDetailScreen" component={AlbumDetailScreen} />

      <Tab.Screen options={{tabBarVisible:false}}  name="AlbumScreen" component={AlbumScreen} />
      <Tab.Screen options={{tabBarVisible:false}}  name="AddPhotoToAlbum" component={AddPhotoToAlbum} />

      <Tab.Screen options={{tabBarVisible:false}} name="ShareAlbumPhotos"   component={ShareAlbumPhotos} />
      <Tab.Screen options={{tabBarVisible:false}} name="InviteContact"   component={InviteContact} />
      <Tab.Screen options={{tabBarVisible:false}} name="InviteCode"   component={InviteCode} />

      <Tab.Screen options={{tabBarVisible:false}} name="AlredyInviteContact"   component={AlredyInviteContact} />
      <Tab.Screen options={{tabBarVisible:false}} name="CameraIcon"   component={CameraIcon} /> 

      {/* /* <Tab.Screen name="Welcome" options={{ tabBarVisible: true }} component={Welcome} /> */}
      
    </Tab.Navigator>
  );
}

