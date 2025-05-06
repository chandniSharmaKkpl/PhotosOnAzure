import * as React from 'react'

import { StyleSheet, TextInput, View } from 'react-native'

import { Text } from 'react-native-paper'

const Otp = new Array(6).fill('')

interface Props {
	setOtpVal: (e: string) => void
}

export default function OtpBox({ setOtpVal }: Props): JSX.Element {
	const [otpVal, setOtp] = React.useState([])

	return (
		<View style={styles.otpInputContainer}>
			{Otp &&
				Otp.map((_, index) => (
					<View key={index} style={styles.verificationRoundStyle}>
						<Text style={styles.otpVal}>{otpVal[index]}</Text>
					</View>
				))}
			<TextInput
				style={styles.input}
				keyboardType="number-pad"
				maxLength={6}
				onChangeText={(e) => {
					setOtp(Array.from(e))
					setOtpVal(e)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	verificationRoundStyle: {
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		backgroundColor: 'rgba(211,211,211,0.3)',
		borderColor: 'lightgray',
		borderWidth: 1
	},
	otpInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	otpVal: {
		color: '#FFF'
	},
	input: {
		position: 'absolute',
		width: '100%',
		height: 40,
		opacity: 0
	}
})
