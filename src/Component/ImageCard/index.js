import React from 'react'
import { View, Image, TouchableOpacity} from 'react-native'
import styles from "./style";
const ImageCard = (props) => {
    const {
        renderImage,
        selectIcon
    } = props
    return (
        <View style={styles.imageView}>
           <Image style = {styles.cardStyle}  resizeMode='cover' source = {renderImage}/>
           <TouchableOpacity style={styles.selectIconView}>
               <Image style={{width:20, height:20}} source={selectIcon}/>
           </TouchableOpacity>
        </View>
    )
}
export default ImageCard

