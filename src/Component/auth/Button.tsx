import * as React from 'react'

import { StyleSheet } from 'react-native'

import { Button as PaperButton, useTheme } from 'react-native-paper'

interface Props {
	color: string
	children: string | JSX.Element
}

export default function Button({
	color,
	children,
	...rest
}: typeof PaperButton & Props): JSX.Element {
	const theme = useTheme()

	return (
		<PaperButton
			mode="contained"
			color={color}
			labelStyle={[
				styles.labelStyle,
				color === '#FFF' ? { color: theme.colors.accent } : { color: '#FFF' }
			]}
			uppercase={false}
			{...rest}>
			{children}
		</PaperButton>
	)
}

const styles = StyleSheet.create({
	labelStyle: {
		paddingVertical: 6,
		fontSize: 24,
		fontFamily: 'MuseoSlab-700'

	}
})
