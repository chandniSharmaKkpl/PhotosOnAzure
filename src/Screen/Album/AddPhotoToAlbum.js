import React from "react";
import {
  StatusBar,
  Text,
  View,
} from "react-native";
import styles from "./style";
import TitleView from "../../Component/TitleView";
import Search from "../../Component/Search";

const AddPhotoToAlbum = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#0E365D"} />

      <View style={{ flex: 1, backgroundColor: "#f0f4f9" }}>
        <TitleView title="Add Photo to Album" />
        <Search
          onClickCalendar={() => {}}
          onClickSearch={() => {}}
          onChangeText={() => {}}
          placeholder={"Search Album Here"}
          isCalendar={true}
          searchTxt = {""}

        />
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
