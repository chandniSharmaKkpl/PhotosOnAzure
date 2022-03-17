import axios from 'axios';
import { 
ADD_NEW_ALBUM_REQUEST, ADD_NEW_ALBUM_SUCCESS, ADD_NEW_ALBUM_FAILURE, 
} from '../constant';
import * as globals from "../../Utils/globals";

  export  const addNewAlbumSuccess = data => ({
      type: ADD_NEW_ALBUM_SUCCESS,
      payload: {
        data: data,
      },
    });
    
  //* Getting library Data  *//
  export const addNewAlbum  =(sessionId) =>(dispatch)=>{
    
    let data ={ "sessid":sessionId}

    if (globals.isInternetConnected == true){
      dispatch({ type: ADD_NEW_ALBUM_REQUEST, payload: {} })

      const headers = {
        'Content-Type': 'application/json',
      };
  
      return axios({
        method: 'post',
        url: ADD_NEW_ALBUM,
        headers: headers,
        data: data,
      })
      .then((response) => {
       
         dispatch({ type: ADD_NEW_ALBUM_SUCCESS, payload: response.data })
      })
      .catch((error) => {
          dispatch({ type: ADD_NEW_ALBUM_FAILURE, payload: error })
      })
    }
    else{
      Alert.alert(globals.warning,globals.noInternet)
    }
  }

  //** Geting Album List   **//
  
 

  