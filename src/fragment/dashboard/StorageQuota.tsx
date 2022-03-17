import * as React from 'react'
import {useContext} from 'react';

import { Image, Pressable, StyleSheet, View, Text } from 'react-native'

import { Caption, Subheading, useTheme, ProgressBar } from 'react-native-paper'
import { AppColor } from '../../Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IApContext } from "../../Component/InAppPurchase/IAPController";


export default function StorageQuota(props): JSX.Element {
	const theme = useTheme()
	const { showUpgrade, data, upgradeNow } = props

	let strSpace = "Calculating space ...";
	var progressValue = 0.0
	const { makePurchase } = useContext(IApContext);

	if (data.HomeReducer && data.HomeReducer.userSpace && data.HomeReducer.userSpace.own_space) {

		strSpace = data.HomeReducer.userSpace.own_space.own_space_used_total_unit+" of " +data.HomeReducer.userSpace.own_space.own_space_total_gb  +" used";
		progressValue = data.HomeReducer.userSpace.own_space.own_space_used_total_bytes/data.HomeReducer.userSpace.own_space.own_space_total_bytes;
	
	}else{

		if (data.HomeReducer && data.HomeReducer.library && data.HomeReducer.library.data 
			&& data.HomeReducer.library.data.userSpace && data.HomeReducer.library.data.userSpace.own_space){
        
		let dictTemp = data.HomeReducer.library.data; 

		 strSpace = dictTemp.userSpace.own_space.own_space_used_total_unit+" of " +dictTemp.userSpace.own_space.own_space_total_gb  +" used";
		 progressValue = dictTemp.userSpace.own_space.own_space_used_total_bytes/dictTemp.userSpace.own_space.own_space_total_bytes;
	 
		}else{
			strSpace = "0.00 GB";
		}
		
	}
	return (
		<View style={styles.container}>
			<Image
				resizeMode="contain"
				style={styles.storageImage}
				source={require('../../assets/icons/storage.png')}
			/>
			<View style={styles.quotaMeta}>
				<View style={styles.avalibleStorageView}>
					<View style={{ flex: 1 }}>
						<Subheading style={styles.avalibleStorageText}>
							Available Space
						</Subheading>
					</View>
					{/* {showUpgrade?  */}
					<Pressable style={styles.buttonStyles} onPress={upgradeNow}>
						<Caption style={styles.upgradeText}>Upgrade Now</Caption>
					</Pressable>
					{/* :null } */}
				</View>
				<Caption style={styles.storageValue}>{strSpace}</Caption>

				<View >
					<ProgressBar progress={progressValue} color={AppColor.colors.RED} style={styles.barStyle} />
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
textUsed:{
   color:'white',
},
	container: {
		backgroundColor: '#0E365D',
		borderRadius: 20,
		flexDirection: 'row',
		padding: 20
	},
	storageImage: {
		height: 70,
		width: 70
	},
	barStyle: {
		height: hp('1.1%'),
		borderRadius: 10,
		backgroundColor: AppColor.colors.BLUE_BAR_COLOR
	},

	barInnerStyle: {
		borderRadius: 4,
		width: '10%',
		height: '100%'
	},
	avalibleStorageView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	avalibleStorageText: {
		color: '#fff'
	},
	storageValue: {
		color: '#FFF',
		//backgroundColor:'green',
		paddingBottom:'2%',
		fontSize:13,
		fontFamily: 'MuseoSlab-500'

	},
	upgradeText: {
		color: '#fff',
		fontFamily: 'MuseoSlab-700'

	},
	quotaMeta: {
		flex: 1,
		marginLeft: 10
	},
	buttonStyles: {
		borderRadius: 4,
		backgroundColor: '#db1e32',
		paddingHorizontal: 4
	}
})
