import React from 'react'
import { Text, View,TouchableOpacity, Picker } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import {TextField}from '@material-ui/core'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MetIcon from 'react-native-vector-icons/Ionicons'
const TouchableFolder = (props) => {
    const {
        label,
        // textChange,
        // secureTextEntry,
        // keyboardType,
        // maxLength,
        // underlineColor,
        // theme,
        // placeHolderColor,
        // onSubmitEditing,
        // editable,right,left
    } = props
    return (
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <TouchableOpacity
                {...props}
                // onKeyPress={props.onKeyPress}
                style={{backgroundColor: 'transparent',paddingHorizontal:15, height: 50,justifyContent:'space-between',flexDirection:'row', maxHeight: 80,borderBottomWidth:0.5,borderBottomColor:'gray' }}
                
            >
             <View><Text style={{ color:'gray' }}>{label}</Text></View>
             {props.selectedValue?
             <Picker mode='dropdown' selectedValue={props.selectedValue} style={{height:30,width:'60%'}}>
                <Picker.Item color='gray' label={props.selectedValue}value={props.selectedValue} />
                </Picker>
                :
                <View style={{height:50,width:'30%',justifyContent:props.number?'flex-end':'flex-start'}}>
                    <Text style={{textAlign:props.number?'right':'left',color:props.number?'gray':'silver'}}>{props.text}</Text>
                </View>
                }
             </TouchableOpacity>
        </View>
    )

}
export default TouchableFolder