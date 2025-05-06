import React, { useEffect } from 'react'
import { View, Text, StatusBar, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import styles from './style'

export const NotificationsCard = (props) => {
    return(
        <View style={{padding:'1%'}}>

        <View style={styles.cardShadow}>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.cardHeading}>{props.title}</Text>
                <Text numberOfLines={2}
                style={[styles.cardHeading,{fontFamily:'MuseoSlab-300',fontSize:14,fontWeight:'400', marginTop:5}]}>
                    {props.description}</Text>
            
            </TouchableOpacity>
        </View>
        </View>

    )
}