import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AlbumScreen,
  AddPhotoToAlbum,
  AddNewAlbum,
  AlbumDetailScreen,
} from "../Screen/Album";
import { ShareAlbumPhotos } from "../Screen/ShareAlbumPhotos";
import { InviteContact } from "../Screen/InviteContact";
import { AlredyInviteContact } from "../Screen/AlredyInvitedContact";
import AlbumStack from "./TabStackNavigator/AlbumStack";
import HomeStack from "./TabStackNavigator/HomeStack";
import { CameraIcon } from "../Screen/CameraIcon";
import InviteCode from "../Screen/InviteCode";

const Tab = createBottomTabNavigator();
export default function HomeNavigation(props) {
  return (
    <Tab.Navigator initialRouteName={"HomeStack"}>
      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="Album"
        component={AlbumStack}
      />

      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="AddNewAlbum"
        component={AddNewAlbum}
      />

      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="AlbumDetailScreen"
        component={AlbumDetailScreen}
      />

      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="AlbumScreen"
        component={AlbumScreen}
      />

       <Tab.Screen
        options={{ tabBarVisible: false }}
        name="CameraIcon"
        component={CameraIcon}
      />
      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="AddPhotoToAlbum"
        component={AddPhotoToAlbum}
      />

      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="ShareAlbumPhotos"
        component={ShareAlbumPhotos}
      />
      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="InviteContact"
        component={InviteContact}
      />
      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="InviteCode"
        component={InviteCode}
      />

      <Tab.Screen
        options={{ tabBarVisible: false }}
        name="AlredyInviteContact"
        component={AlredyInviteContact}
      />
     
    </Tab.Navigator>
  );
}
