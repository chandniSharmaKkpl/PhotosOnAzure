import React from 'react'

import {
	View,
	Image,
	StyleSheet,
	TextInput,
	TextInputProps,
	ViewStyle,
	Platform
} from 'react-native'
import IconEntypo from 'react-native-vector-icons/Entypo'; 

import { Caption, useTheme } from 'react-native-paper'

interface Props {
	icon: any
	onRef?: any
	left?: boolean
	customStyle?: ViewStyle
	error?: string,
	right?: any,
	onPressRight?:()=>void,
	isClickEye?: boolean
}

export default function TextInputView({
	icon,
	left,
	customStyle,
	onRef,
	error,
	onChangeText,
	right,
	onPressRight,
	isClickEye,
	...rest
}: TextInputProps & Props): JSX.Element {
	const theme = useTheme()
	return (
		<View style={Platform.OS ==='android'? styles.textinputContainerAndroid: styles.textinputContainerIos}>
			<View style={[ Platform.OS ==='android'? styles.containerAndroid:styles.containerIos , customStyle]}>
				{left == false ? null : (
					<View style={styles.iconContainer}>
						<Image
							resizeMode="contain"
							style={styles.backgroundIcon}
							source={require('../../assets/img/inputIconBg.png')}
						/>
						<Image
							resizeMode="contain"
							style={styles.iconStyle}
							source={icon}
						/>
					</View>
				)}
               <View style={Platform.OS === 'android'? styles.viewContainInputAndroid: styles.viewContainInputIos}>
				<TextInput
					{...rest}
					secureTextEntry={right? isClickEye? false: true: false}
					style={right? Platform.OS === 'ios'?  styles.textInputPasswordIOS: styles.textInputPassword: Platform.OS === 'ios'? styles.textInputStyleIos: styles.textInputStyle}
					ref={onRef ? (input) => onRef(input) : null}
					onChangeText={onChangeText}
					autoCapitalize="none"
					placeholderTextColor="white"
					textAlign={'center'}
					

				/>
				 
				</View>
				{right?
					 <View style={styles.viewEye}>

				   {isClickEye?  
              <IconEntypo name="eye"
			  onPress={onPressRight} 
               style={styles.eye}
                /> 
                  : 
                <IconEntypo name="eye-with-line" 
				onPress={onPressRight} 
				style={styles.eye} />
				 }
             </View>: null
                }
			</View>
			{error ? (
				<Caption style={[styles.error, { color: theme.colors.accent }]}>
					{error}
				</Caption>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	viewContainInputIos:{
			width:'80%', 
			alignItems:'center', 
			marginLeft:'11%', 
		justifyContent:'center'
	},
	viewContainInputAndroid:{
		width:'80%', 
		alignItems:'center', 
		marginLeft:'11%', 
		justifyContent:'center',
	
	},
	viewEye:{
	
		// top:0,
		// bottom:0,
		// width:50,
		// height:50,
		justifyContent:'center',
	  },
	  eye:{
	   fontSize:20, 
	   padding:5,
	   color:'white'
	   //alignSelf:'flex-end'
	  },
	containerAndroid: {
		
		borderColor: 'lightgray',
		borderWidth: 1,
		flexDirection: 'row',
		//backgroundColor: 'rgba(211,211,211,0.3)',
		borderRadius: 50,
		height: 40,
		
	},

	containerIos: {
		borderColor: 'lightgray',
		borderWidth: 1,
		flexDirection: 'row',
	 	backgroundColor: 'rgba(211,211,211,0.3)',
		borderRadius: 50,
		height: 40,
	},
	
	textinputContainerIos: {
		marginBottom: 40,

	},
	textinputContainerAndroid: {
		marginBottom: 40,
	},
	
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	iconStyle: {
		height: 20,
		width: 20,
		position: 'absolute',
		left: 14
	},
	backgroundIcon: {
		width: 56,
		position: 'absolute',
		left: -1
	},
	textInputStyle: {
		//justifyContent: 'center',
		color: '#fff',
		paddingLeft:'2%',
		textAlign:'center',
		fontFamily: 'MuseoSlab-500',
		includeFontPadding:false,
	//	paddingBottom: 0, 
		height:'100%',
		width:"100%"
	},
	textInputStyleIos: {
		width: '100%',
		justifyContent: 'center',
		color: '#fff',
		paddingLeft:'2%',
		textAlign:'center',
		fontFamily: 'MuseoSlab-500',
		includeFontPadding:false,
		paddingBottom: 0, 
		height:'100%',

	},
	textInputPassword:{
		//width: '90%',
		//justifyContent: 'center',
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'MuseoSlab-500',
		includeFontPadding:false,
	//	paddingBottom: 0, 
		height:'100%',
		paddingLeft: '2%',
	},
	textInputPasswordIOS:{
		width: '90%',
		justifyContent: 'center',
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'MuseoSlab-500',
		includeFontPadding:false,
		paddingBottom: 0, 
		height:'100%',
		paddingLeft: '2%',
	},
	error: {
		paddingLeft: 10,
		position: 'absolute',
		bottom: -30,
		fontSize: 11
	}
})
