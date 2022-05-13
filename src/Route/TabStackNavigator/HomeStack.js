import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../Screen/HomeScreen";
import { AddNewAlbum } from "../../Screen/Album";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNewAlbum" component={AddNewAlbum} />
    </Stack.Navigator>
  );
};

export default HomeStack;
