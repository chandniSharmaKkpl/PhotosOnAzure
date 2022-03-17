import React from 'react'
import { Text, View, Image } from 'react-native'
// import {TextField}from '@material-ui/core'
import { TextInput } from 'react-native-paper';
import styles from "./styles";
const TextInputView = (props) => {
    const {
        placeholder,
        textChange,
        secureTextEntry,
        keyboardType,
        maxLength,
        placeHolderColor,
        onSubmitEditing,
        icon,
        left,
        costomStyle

    } = props
    return (
        <View style={[styles.container,costomStyle]}>

            {left==false?null:<View style={styles.iconContainer}>
                <Image resizeMode='contain' style={styles.iconStyle} source={icon} />
            </View>}

            <TextInput
                {...props}
                // onKeyPress={props.onKeyPress}
                style={styles.textInputStyle}
                
                // theme={theme}
                // theme={{roundness:77}}
                ref={props.onRef ? (input) => props.onRef(input) : null}
                // underlineColor={underlineColor}
                onChangeText={textChange}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor={placeHolderColor?placeHolderColor:'white'}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                // editable={editable}
                //  autoCapitalize={false}
                underlineColorAndroid={'rgba(0,0,0,0)'}

                maxLength={maxLength}
            />
            {props.error && <Text style={{ color: 'red' }}>{props.error}</Text>}
        </View>
    )

}
export default TextInputView