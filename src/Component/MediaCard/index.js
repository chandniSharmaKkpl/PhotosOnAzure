import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import styles from "../../Screen/HomeScreen/style";
import { Avatar, Headline, Text, useTheme } from "react-native-paper";
import FastImage from "react-native-fast-image";
import VideoCard from "../../Component/VideoCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";

import { AppColor } from "../../Theme";

export const MediaCard = (props) => {
  const theme = useTheme();
  const [isCheck, setIsCheck] = React.useState(false);
  // const [isLongPress, setIsLongPress] = React.useState(false);
  const {
    imageUrl,
    item,
    index,
    setIsImageFullScreen,
    setUrlZoom,
    setIsVideoFullScreen,
    isLongPress,
    setIsLongPress,
    isSelectAll,
    setIsSelectAll,
    arrayCheckMarks,
    setItemZoom,
    isImageFullScreen, 
    isVideoFullScreen,
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
        if (!item.isCheck) {
          // Remove false indexes check
          const index = arrayCheckMarks.indexOf(item);
          if (index > -1) {
            arrayCheckMarks.splice(index, 1);
          }
        } else {
          arrayCheckMarks[tempIndex] = item;
        }
      } else {
        // New item checked
        item.isCheck = !isCheck;
        arrayCheckMarks.push(item);
      }
    } else {
      //New item push first time when no object
      item.isCheck = !isCheck; //change the change mark
      arrayCheckMarks.push(item);
    }
    if(arrayCheckMarks.length === 0){
      setIsLongPress(!isLongPress);
    }
    isSelectAll ? setIsSelectAll(!isSelectAll) : setIsCheck(!isCheck);
  };

  
  return (
    <View
      key={index}
      style={[styles.cellView, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.imageView}>
        {item.file_type && item.file_type.includes("image") ? (
          <Pressable
            style={styles.imageView}
            onLongPress={() => setIsLongPress(!isLongPress)}
            onPress={() => {
              setItemZoom(item),
                setIsImageFullScreen(true),
                setUrlZoom(item.uri ? item.uri : imageUrl);
            }}
          >
            <FastImage
              style={styles.image}
              source={{
                uri: item.uri ? item.uri : imageUrl,
                //headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Pressable>
        ) : (
          <View
            style={[
              styles.image,
              { justifyContent: "center" },
            ]}
           
          >
            <View style={styles.video}>
              <VideoCard
                videoUrl={item.uri ? item.uri : imageUrl}
                volume={0}
              ></VideoCard>
            </View>
            {/* This button is added above on video card to implement click of video */}
            <TouchableOpacity
              onLongPress={() => setIsLongPress(!isLongPress)}
              style={[
                {
                  justifyContent: "center",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                },
              ]}
              onPress={() => {
                setIsVideoFullScreen(true),
                  setUrlZoom(item.uri ? item.uri : imageUrl);
                setItemZoom(item);
              }}
            />
          </View>
        )}
      </View>
      {isLongPress ? (
        <TouchableOpacity
          style={styles.buttonTransparant}
          onLongPress={() => {
            item.isCheck = false;
            setIsCheck(false);
            setIsLongPress(!isLongPress)
          }}
        >
          <View style={styles.cellViewTransparant} />
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
