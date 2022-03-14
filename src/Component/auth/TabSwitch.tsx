import * as React from 'react'

import { Pressable, StyleSheet, View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import Button from './Button';

import {AppColor} from '../../Theme'



const TabSwitch = (props) => {
	const theme = useTheme()

	const inActiveLabel = { color: theme.colors.primary }

	return (
		<View style={styles.container}>
			<Pressable onPress={()=>props.onPressFirstTab()} style={styles.btn}>
				<Button
					style={props.isFirstTab ? styles.activeBtn : styles.inActiveTab}
					labelStyle={props.isFirstTab ? styles.textActive : styles.textInActive}
				>
					{props.tabs[0]}

				</Button>

			</Pressable>

			<Pressable onPress={()=>props.onPressSecondTab()} style={styles.btn}>
				<Button
					style={props.isFirstTab ? styles.inActiveTab : styles.activeBtn}
					title={'Album'}
					labelStyle={props.isFirstTab ? styles.textInActive : styles.textActive}
				>
					{props.tabs[1]}
				</Button>

			</Pressable>

		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 20,
		padding: 6,
		backgroundColor: '#FFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
		marginBottom: 20,
		//height: 60
	},
	btn: {
		flex: 1,
		justifyContent: 'center'
	},
	activeBtn: {
		borderRadius: 20,
		paddingVertical: 10
	},
	inActiveTab: {
		backgroundColor: 'transparent',
		elevation: 0
	},
	textActive: {
		color: "white",
		fontFamily: 'MuseoSlab-700'

	},
	textInActive: {
		color: AppColor.colors.THEME_BLUE,
		fontFamily: 'MuseoSlab-700'

	}
})

export default TabSwitch;