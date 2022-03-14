import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Appconstants from '../Theme/AppConstant'

const getAzureKey = async () => {
    const azureKey = await AsyncStorage.getItem(Appconstants.constant.AZURE_KEY)
   
    return azureKey
}


const setAzureKey = async (data) => {
    await AsyncStorage.setItem(Appconstants.constant.AZURE_KEY, data)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

const getCurrentUser = async () => {
    const temp = await AsyncStorage.getItem(Appconstants.constant.CURRENT_USER)

   let user
    if (temp) {
        user = JSON.parse(temp);
        return user;
    } else {
        
    }
    return user;
}

const removeCurrentUser = async () => {
    const azureKey = await AsyncStorage.removeItem(Appconstants.constant.CURRENT_USER)
   
    return azureKey
}

const setCurrentUser = async (data) => {

    await AsyncStorage.setItem(Appconstants.constant.CURRENT_USER, JSON.stringify(data))
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

const removeToken = async () => {
    const azureKey = await AsyncStorage.removeItem(Appconstants.constant.CURRENT_TOKEN)
   
    return azureKey
}

const setCurrentToken = async (data) => {

    await AsyncStorage.setItem(Appconstants.constant.CURRENT_USER, JSON.stringify(data))
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}



export {
getAzureKey,
setAzureKey,
getCurrentUser, 
setCurrentUser,
removeCurrentUser
}