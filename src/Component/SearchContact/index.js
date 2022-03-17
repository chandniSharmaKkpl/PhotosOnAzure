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
import styles from "../Search/styles";
import AppConstants from "../../Theme/AppConstant";
import { notifyMessage } from "../AlertView";

const SearchContact = (props) => {
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
  } = props;

  const onClickSearch = () => {
    props.onClickSearch();
  };
  const onChangeText = (val) => {

    props.onChangeText(val);

    // if (props.isClearSearchText) {
    //     setSearchTxt("")
    //     props.onChangeText("")
    // } else {
    //     setSearchTxt(txt)
    //     props.onChangeText(txt)
    // }
  };

  const onClickRedButtonSearch = () => {
    if (searchTxt) {
      if (searchTxt.trim().length < 1) {
        notifyMessage(AppConstants.constant.ENTER_ALBUM_NAME_TO_SEARCH);
        return;
      }
      onClickSearch();
    }else{
      notifyMessage(AppConstants.constant.ENTER_ALBUM_NAME_TO_SEARCH);
    }
    
  };

  return (
    <View style={styles.searchView}>
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
            onPress={onClickRedButtonSearch}
            style={styles.SearchIconStyle}
          >
            <Image
              source={require("../../assets/images/Search.png")}
              resizeMode={"contain"}
              style={styles.leftIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SearchContact;
