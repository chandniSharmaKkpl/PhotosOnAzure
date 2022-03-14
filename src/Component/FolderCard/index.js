import React from 'react'
import { View, Image, TouchableOpacity, Text} from 'react-native'
import styles from "./style";
const FolderCard = (props) => {
    const {
        renderImage,
        selectIcon
    } = props
    return (
        <View style={styles.container}>

            <View style={{flex:1}}>
            <Image style = {styles.cardStyle}  resizeMode='cover' source = {renderImage}/>
           <TouchableOpacity style={styles.selectIconView}>
              
           </TouchableOpacity>
            </View>

            <View style={styles.bottomView}>
                <View style={{flex:0.3,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#FFF',fontSize:10}}> UserName</Text>
                </View>
             <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
             <Image style={{width:17, height:17,justifyContent:'center', alignItems:'center'}}  resizeMode='cover' source={selectIcon}/>

             </View>
            </View>
          
        </View> 
    )
}
export default FolderCard

