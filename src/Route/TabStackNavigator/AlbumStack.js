import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AlbumScreen, AddPhotoToAlbum } from "../../Screen/Album";
const Stack = createStackNavigator();

const AlbumStack = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"AlbumScreen"}
          options={{ gestureEnabled: true }}
        >
          <Stack.Screen
            component={AlbumScreen}
            name="AlbumScreen"
            options={{
              header: () => null,
              gestureEnabled: false,
              headerTransparent: true,
            }}
          />

          <Stack.Screen
            component={AddPhotoToAlbum}
            name="AddPhotoToAlbum"
            options={{
              header: () => null,
              gestureEnabled: false,
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default AlbumStack;
