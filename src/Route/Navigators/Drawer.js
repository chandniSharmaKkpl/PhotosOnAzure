import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../../Screen/HomeScreen";
import { ShareAlbumPhotos } from "../../Screen/ShareAlbumPhotos";

import HomeTabNavigator from "../HomeTabNavigator";

const Drawer = createDrawerNavigator();

export default function Drawers() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
    </Drawer.Navigator>
  );
}

function Drawers1() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContentOptions={{
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
        activeBackgroundColor: "#0E365D",
        style: { backgroundColor: "#3389df" },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        options={{ drawerLabel: "Notifications" }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{ drawerLabel: "Privacy Policy" }}
        name="Home1"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{ drawerLabel: "About" }}
        name="Home2"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{ drawerLabel: "Subscription Status" }}
        name="Home3"
        component={HomeScreen}
      />
      <Drawer.Screen
        name="ShareAlbumPhotos"
        options={{ drawerLabel: "Edit Detail" }}
        component={ShareAlbumPhotos}
      />
    </Drawer.Navigator>
  );
}
