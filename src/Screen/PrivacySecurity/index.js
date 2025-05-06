import React from "react";
import { StatusBar, View, Keyboard, BackHandler } from "react-native";
import styles from "./style";
import { Header } from "../../Component/Header";
import { AppImages, AppColor } from "../../Theme";
import { WebView } from "react-native-webview";
import { PRIVACY } from "../../Redux-api/endPoints";
import Spinner from "../../Component/auth/Spinner";

export default PrivacySecurity = (props) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return function cleanup() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }
  const hideSpinner = () => {
    setLoading(false);
  };

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={AppColor.colors.TITLE_BLUE}
      />

      <View style={{ flex: 1 }}>
        <Header
          leftIcon={require("../../assets/images/Menu.png")}
          leftClick={() => {
            Keyboard.dismiss();
            props.navigation.toggleDrawer();
          }}
          titleIcon={require("../../assets/images/Logo_Icon.png")}
          test={"hello"}
          rightBackIcon={AppImages.images.backIcon}
          rightBackIconClick={() => props.navigation.goBack()}
          notificationsClick={() => props.navigation.navigate("Notifications")}
        />

        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <WebView
            onLoad={() => hideSpinner()}
            style={styles.webview}
            source={{
              uri: PRIVACY,
            }}
          ></WebView>
        </View>
        {loading ? <Spinner /> : null}
      </View>
    </>
  );
};
