import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
// import {TextField}from '@material-ui/core'
import TextInputView from "../TextInputView";
import styles from "./styles";
import AppConstants from "../../Theme/AppConstant";
import { notifyMessage } from "../AlertView";

const Search = (props) => {
  const {
    placeholder,
    // onChangeText,
    secureTextEntry,
    keyboardType,
    maxLength,
    placeHolderColor,
    onSubmitEditing,
    icon,
    left,
    costomStyle,
    isCalendar,
    searchTxt,
    viewName,
    selectedDate,
    onClickRedBtnFromView
  } = props;

  const onClickSearch = () => {
    props.onClickSearch();
  };
  const onChangeText = (val) => {

    props.onChangeText(val);

  };

  const onClickRedButtonSearch = () => {
    if (viewName === 'AlbumDetailScreen') {
      if (searchTxt.trim().length < 1) {
        notifyMessage(AppConstants.constant.PLEASE_SELECT_DATE);
        return;
      }
      onClickSearch();
    } else {
     if (searchTxt) {
      if (searchTxt.trim().length < 1) {
        notifyMessage(AppConstants.constant.ENTER_ALBUM_NAME_TO_SEARCH);
        return;
      }
      onClickSearch();
    }else{
      notifyMessage(AppConstants.constant.ENTER_ALBUM_NAME_TO_SEARCH);
    }
  }
  };

  return (
    <View style={styles.searchView}>
    {viewName === 'AlbumDetailScreen'? 
     <Pressable
     onPress={props.onClickCalendar}
     style={styles.textInputButton}
     //   costomStyle={{width:'70%',alignSelf:'flex-start',borderWidth:0,backgroundColor:'transparent'}} left={false}
   >
    {searchTxt? <Text style={styles.textCalendarInput}>{searchTxt}</Text>: <Text style={styles.textCalendarEmpty}>Search Date</Text>}
     </Pressable>:
     <TextInput
        value={searchTxt}
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={onClickSearch}
        onChangeText={(val) => onChangeText(val)}
        placeholderTextColor={"gray"}
        placeholder={placeholder}
        style={styles.inputStyle}
        //   costomStyle={{width:'70%',alignSelf:'flex-start',borderWidth:0,backgroundColor:'transparent'}} left={false}
      /> 
     }


      {/* <TextInputView placeHolderColor={'gray'} placeholder={'Search Album Here'}
             costomStyle={{width:'70%',alignSelf:'flex-start',borderWidth:0,backgroundColor:'transparent'}} left={false}/> */}
      <View style={styles.searchIconsView}>
        <View style={styles.leftIconView}>
          {isCalendar ? (
            <Pressable
              style={styles.leftIconView}
              onPress={props.onClickCalendar}
            >
              <Image
                source={require("../../assets/images/Calendar.png")}
                resizeMode={"contain"}
                style={styles.leftIcon}
              />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.SearchIconStyle}>
          <TouchableOpacity
            onPress={viewName && viewName === 'AlbumDetailScreen'? props.onClickCalendar: viewName && viewName === 'HomeScreen'? onClickRedBtnFromView:  onClickRedButtonSearch}
            style={styles.SearchIconStyle}
          >
           {viewName && viewName === 'AlbumDetailScreen'? <Image
                source={require("../../assets/images/Calendar.png")}
                resizeMode={"contain"}
                style={[styles.leftIcon, {tintColor:'white'}]}
              />: <Image
              source={require("../../assets/images/Search.png")}
              resizeMode={"contain"}
              style={styles.leftIcon}
            />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Search;
