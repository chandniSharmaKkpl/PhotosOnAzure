import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
  Alert,
  Keyboard,
  Platform,
} from "react-native";
import styles from "../../Screen/HomeScreen/style";
import { Avatar, Headline, Text, useTheme } from "react-native-paper";
import FastImage from "react-native-fast-image";
import VideoCard from "../../Component/VideoCard";
const { height, width } = Dimensions.get("screen");
import AppConstants from "../../Theme/AppConstant";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../Theme";
import { notifyMessage } from "../AlertView";

export const AlbumCard = (props) => {
  const theme = useTheme();
  const [isCheck, setIsCheck] = React.useState(false);
  const {
    imageUrl,
    item,
    index,
    isLongPress,
    setIsLongPress,
    isSelectAll,
    setIsSelectAll,
    arrayCheckMarks,
    moveToAlbumDetail,
    isSharedAlbum,
  } = props;

  const onClickMarks = () => {
    // Assigning reverse value of isCheck because state is updating on after render

    if (arrayCheckMarks && arrayCheckMarks.length > 0) {
      let tempIndex = arrayCheckMarks.findIndex(
        (x) => x.file_name === item.file_name
      );

      ////If already exist
      if (tempIndex > -1) {
        item.isCheck = !isCheck;
        arrayCheckMarks[tempIndex] = item;
      } else {
        // New item checked
        item.isCheck = !isCheck;
        arrayCheckMarks.push(item);
      }
    } else {
      //New item push
      item.isCheck = !isCheck; //change the change mark
      arrayCheckMarks.push(item);
    }

    isSelectAll ? setIsSelectAll(!isSelectAll) : setIsCheck(!isCheck);
  };

  return (
    <View
      key={index}
      style={[
        styles.cellViewAlbumShare,
        { backgroundColor: theme.colors.primary },
      ]}
    >
      <TouchableOpacity
        key={index}
        onLongPress={() =>
          isSharedAlbum
            ? notifyMessage(AppConstants.constant.YOU_CAN_DELETE_ONLY_OWN_ALBUMS)
            : setIsLongPress(!isLongPress)
              // setIsCheck(false)
        }
        onPress={moveToAlbumDetail}
        style={[
          styles.cellViewAlbumShare,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <View style={styles.imageView}>
          <FastImage
            style={styles.imageAllbumCard}
            source={{
              uri: imageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.albumBottomViewShare}>
          <Text style={[styles.albumBottomText, { width: width * 0.4 }]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
      {isLongPress ? (
        <TouchableOpacity
          style={styles.buttonTransparantShare}
          onLongPress={() => {
          //Always open non selected checkbox in long press 

            setIsCheck(false); 
            item.isCheck = false;

            setIsLongPress(!isLongPress);
          }}
        >
          <View style={styles.cellViewTransparantShare} />
        </TouchableOpacity>
      ) : null}

      {isLongPress ? (
        <TouchableOpacity
          onPress={() => onClickMarks()}
          color={AppColor.colors.RED}
          size={24}
          style={{
            position: "absolute",
            top: 5,
            width: 30,
            height: 30,
            left: 5,
          }}
        >
          {/*  If select all condition then show all selected / deselection manage with isSelectAll otherwise manage with check for single selection */}
          {isCheck ? (
            <AntDesign
              name="checksquareo"
              size={25}
              color="white"
              style={{ alignSelf: "flex-end", margin: "3.5%" }}
            />
          ) : (
            <IconIonicons
              name="square-outline"
              size={25}
              color="white"
              style={{ alignSelf: "flex-end", margin: "3.5%" }}
            />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const stylesMedia = {
  rememberIcon: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
};
