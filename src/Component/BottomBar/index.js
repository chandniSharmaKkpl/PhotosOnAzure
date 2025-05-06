import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../../Screen/Album/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Style from "./style";

// BottomBar tab icons
const BottomItem = [
  {
    key: 1,
    no: 1,
    name: "AlbumScreen",
    image1: require("../../assets/images/Folder_Blue.png"),
    image2: require("../../assets/images/Folder_Blue.png"),
  },
  {
    key: 2,
    no: 2,
    name: "Home",
    image1: require("../../assets/images/Camera_Red.png"),
    image2: require("../../assets/images/Camera_Red.png"),
  },
  {
    key: 3,
    no: 3,
    name: "AlredyInviteContact",
    image1: require("../../assets/images/Invite_Blue.png"),
    image2: require("../../assets/images/Invite_Blue.png"),
  },
];
const BottomBar = (props) => {
  const [ScreenName, setScreenName] = useState(2);

  const conditionalNavigate = (tabData) => {
    setScreenName(tabData.no);
    props.navigation.navigate(tabData.name, {
      screen: tabData.name,
      initial: true,
    });
  };
  return (
    <View style={Style.container}>
      <View style={Style.MainWrappper}>
       
        {BottomItem.map((data) =>
          data.no == 2 ? (
            <TouchableOpacity
              key={data.key}
              style={Style.positionIcon}
              onPress={() => props.navigation.navigate("CameraIcon")}
              // onPress={() => alert("ok")}
            >
              <View style={Style.whiteCircle}>
                <Image
                  resizeMode={"contain"}
                  style={Style.addposticon}
                  source={ScreenName == data.no ? data.image2 : data.image1}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={data.key}
              onPress={() => {
                conditionalNavigate(data);
              }}
              activeOpacity={0.4}
            >
              <Image
                resizeMode={"contain"}
                style={data.no == 2 ? Style.addposticon : Style.icon}
                source={ScreenName == data.no ? data.image2 : data.image1}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};
export default BottomBar;

{
  /* <View style={Style.MainWrappper}>
            {BottomItem.map((data) =>
                data.no == 8 ?
                    <TouchableOpacity style={[Style.positionIcon]} onPress={() => { conditionalNavigate(data) }}>
                        <Image resizeMode={"contain"} style={Style.icon2} source={data.image1} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { conditionalNavigate(data) }}>
                        <Image resizeMode={"contain"} style={Style.icon} source={(ScreenName == data.no) ? data.image2 : data.image1} />
                    </TouchableOpacity>
            )}
        </View> */
}
