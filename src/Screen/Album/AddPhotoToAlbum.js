import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";
import TextInputView from "../../Component/TextInputView";
import { AppConstant } from "../../Theme";
import { Header } from "../../Component/Header";
import TitleView from "../../Component/TitleView";
import Search from "../../Component/Search";

const AddPhotoToAlbum = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <View style={{ flex: 1, backgroundColor: "#f0f4f9" }}>
        {/* <Header
                    leftIcon={require('../../assets/images/Menu.png')}
                    leftClick={() => { props.navigation.goBack() }}
                    titleIcon={require('../../assets/images/Logo_Icon.png')}
                    rightBackIcon={require('../../assets/images/Back.png')}
                    rightBackIconClick={() => props.navigation.goBack() }
                    rightViewLeftIcon={require('../../assets/images/Notification.png')}
                    notificationsClick = {() => props.navigation.navigate('Notifications')}

                /> */}

        <TitleView title="Add Photo to Album" />
        <Search
          onClickCalendar={() => {}}
          onClickSearch={() => {}}
          onChangeText={() => {}}
          placeholder={"Search Album Here"}
          isCalendar={true}
          searchTxt = {""}

        />
        {/* <Search placeholder={"Search Album Here"} isCalendar={true}/> */}

        <View style={styles.album}>
          <Text style={[styles.albumText, { fontWeight: "400" }]}>
            Select Ablum to Store Photo
          </Text>
        </View>
      </View>
    </>
  );
};

export default AddPhotoToAlbum;
