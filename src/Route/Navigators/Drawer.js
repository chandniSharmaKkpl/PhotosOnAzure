import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../Screen/HomeScreen';
import { Login } from '../../Screen/Login';
import { Welcome } from '../../Screen/Welcome';
import { AlbumScreen } from '../../Screen/Album';
import { ShareAlbumPhotos } from '../../Screen/ShareAlbumPhotos';
import { Notifications } from '../../Screen/Notifications';

import AlbumStack from "../TabStackNavigator/AlbumStack";
import HomeTabNavigator from '../HomeTabNavigator'

const Drawer = createDrawerNavigator();

export default function Drawers() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />

    </Drawer.Navigator>)
}



function Drawers1() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator drawerType='slide' drawerContentOptions={{ inactiveTintColor: '#fff', activeTintColor: '#fff', activeBackgroundColor: '#0E365D', style: { backgroundColor: '#3389df' } }} initialRouteName="Home">
      <Drawer.Screen options={{ drawerLabel: 'Notifications' }} name="Home" component={HomeScreen} />
      {/* <Drawer.Screen  options={{drawerLabel:'Notifications'}} name="Notifications" component={Notifications} /> */}
      <Drawer.Screen options={{ drawerLabel: 'Privacy Policy' }} name="Home1" component={HomeScreen} />
      <Drawer.Screen options={{ drawerLabel: 'About' }} name="Home2" component={HomeScreen} />
      <Drawer.Screen options={{ drawerLabel: 'Subscription Status' }} name="Home3" component={HomeScreen} />
      <Drawer.Screen name="ShareAlbumPhotos" options={{ drawerLabel: 'Edit Detail' }} component={ShareAlbumPhotos} />
      {/* <Drawer.Screen name="Album" options={{drawerLabel:'Album',headerShown:true}} component={AlbumStack} />
        <Drawer.Screen name="ShareAlbumPhotos"  options={{drawerLabel:'ShareAlbumPhotos'}} component={ShareAlbumPhotos} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}