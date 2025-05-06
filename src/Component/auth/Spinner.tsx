import * as React from 'react'

import { StyleSheet, View } from 'react-native'

import { ActivityIndicator, Portal, useTheme } from 'react-native-paper'

export default function Spinner(): JSX.Element {
	const theme = useTheme()

	return (
		<Portal>
			<View style={[styles.container, StyleSheet.absoluteFill]}>
				<ActivityIndicator size="large" color={theme.colors.accent} />
			</View>
		</Portal>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0,0,0,.1)',
		justifyContent: 'center', 
		height: '90%', 
		marginTop:'20%'
	}
})
