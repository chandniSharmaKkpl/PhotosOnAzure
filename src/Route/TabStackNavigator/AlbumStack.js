import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { AlbumScreen, AddPhotoToAlbum } from "../../Screen/Album";
import {Notifications} from "../../Screen/Notifications";
const Stack = createStackNavigator();

const AlbumStack = () => {
    return (
        <>
            <NavigationContainer >
                <Stack.Navigator initialRouteName={'AlbumScreen'} options={{ gestureEnabled: true }}
                //  initialRouteName={routeName.Swiper}
                >

                    <Stack.Screen
                        component={AlbumScreen}
                        name='AlbumScreen'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />

                    <Stack.Screen
                        component={AddPhotoToAlbum}
                        name='AddPhotoToAlbum'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    />

                    {/* <Stack.Screen
                        component={Notifications}
                        name='Notifications'
                        options={
                            {
                                header: () => null,
                                gestureEnabled: false,
                                headerTransparent: true,
                            }
                        }
                    /> */}

                </Stack.Navigator>

            </NavigationContainer>


        </>
    )
}
export default AlbumStack
