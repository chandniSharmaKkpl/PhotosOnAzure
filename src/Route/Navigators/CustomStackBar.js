import * as React from "react";

import { Image, StyleSheet, View } from "react-native";

import { Appbar } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export default CustomStackBar = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="cover"
          source={require("../../assets/icons/appbar-icon.png")}
          style={styles.appLogo}
        />
      </View>
      <Appbar.Action icon="menu" color="transparent" />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appLogo: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
});
