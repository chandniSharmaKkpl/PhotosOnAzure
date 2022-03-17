import React from 'react'
import { Text, View, Image, } from 'react-native';
import {AppColor} from '../../Theme'; 

const TitleView = (props) => {

    return (
        <View>
            <Text style={{
                color: AppColor.colors.TITLE_BLUE,
                fontWeight: 'bold',
                fontSize: 22,
                fontFamily: 'MuseoSlab-700',
            }}>{props.title}</Text>
        </View>
    )
}

export default TitleView;