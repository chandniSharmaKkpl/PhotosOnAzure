
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import {
	configureFonts,
	DefaultTheme,
	Provider as PaperProvider
} from 'react-native-paper'

import AuthContext from './src/context/AuthContext';
import {Platform} from 'react-native'; 
import MediaContext from './src/context/MediaContext';
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import store from './store';
import React, { useEffect, useReducer, useRef, useState } from "react";
import {NavigationSetup} from './src/Route/NavigationSetup';

// import  {store}  from "./store";
import NetInfo from "@react-native-community/netinfo";
import * as globals from "./src/Utils/globals";
import SplashScreen from 'react-native-splash-screen';
import { IApController } from './src/Component/InAppPurchase/IAPController';

 console.disableYellowBox = true

const fontConfig = {
	regular: {
		fontFamily: 'MuseoSlab-700'
	},
	medium: {
		fontFamily: 'MuseoSlab-700'
	},
	light: {
		fontFamily: 'MuseoSlab-300'
	},
	thin: {
		fontFamily: 'MuseoSlab-500'
	}
}

const theme = {
	...DefaultTheme,
	roundness: 30,
	fonts: configureFonts({
		default: fontConfig,
		android: fontConfig,
		ios: fontConfig
	}),
	colors: {
		...DefaultTheme.colors,
		primary: '#103458',
		accent: '#db1e32'
	}
}

const App = () => {
	const [user, setUser] = React.useState(null);
	const [media, setMedia] = React.useState(null);

	React.useEffect(() => {
		if (Platform.OS === 'ios') {
			setTimeout(() => {
				SplashScreen.hide();
			  }, 0);
		} else {
			setTimeout(() => {
				SplashScreen.hide();
			  }, 100);
		 }
		

		NetInfo.addEventListener(state => {
			globals.isInternetConnected = state.isConnected;
		  });
		  // Specify how to clean up after this effect:
		  return function cleanup() {
			NetInfo.addEventListener(state => {
				globals.isInternetConnected = state.isConnected;
			  });
		  };
	  }, []);
	

	return (
		<AuthContext.Provider value={{ user, setUserData: setUser}}>
		<MediaContext.Provider value={{ media,setMediaData:setMedia}}>
			
		<Provider store={store}>
			{/* <StatusBar backgroundColor="#FFF" translucent={false} style="auto" /> */}
			<IApController>
			<NavigationContainer>
				<PaperProvider theme={theme}>
					 <NavigationSetup />
				</PaperProvider>
			</NavigationContainer>
			</IApController>

		</Provider>
		</MediaContext.Provider>
		 </AuthContext.Provider>
	)
	
};

export default App;

