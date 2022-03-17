import React from "react";
import { StatusBar, ScrollView, Text, View, Keyboard, BackHandler, ProgressViewIOSBase } from "react-native";
import styles from "./style";
import { Header } from "../../Component/Header";
import { AppImages, AppColor } from "../../Theme";
import {WebView} from 'react-native-webview';
import {PRIVACY, TERMS} from '../../Redux-api/endPoints'
import Spinner from "../../Component/auth/Spinner";

export default PrivacySecurity = (props) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {   
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
 
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
        {/* <View style={styles.album}>
          <Text style={styles.albumText}>Privacy & Security</Text>
        </View> */}

        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
        
      <WebView
        onLoad={() => hideSpinner()}
        style={styles.webview}
        source={{
          uri: PRIVACY
        }}></WebView>
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollview}
          >
            <Text style={styles.titleText}>Nulla mattis feugiat egestas</Text>

            <Text style={styles.descriptionText}>
              Vivamus sit amet posuere justo, vel iaculis ante. Sed elementum
              pretium justo, sit amet pharetra risus tristique ac. Pellentesque
              porta libero eu lorem vulputate, vel malesuada metus tempus. Morbi
              dapibus lorem ut viverra ornare. Etiam vel ligula et magna
              volutpat posuere. Duis nisi lacus, venenatis scelerisque tempus
              at, ornare et odio. Aenean tristique mollis posuere. Integer
              faucibus massa nec leo blandit commodo. Etiam rhoncus tincidunt
              justo sit amet dignissim. Fusce eu est tellus. Nulla vel aliquam
              turpis. Integer volutpat purus id sagittis mattis. Phasellus
              laoreet purus tempor odio interdum, a placerat velit euismod.
              Vivamus egestas purus sed urna convallis, vitae pellentesque eros
              faucibus. Proin in velit sit amet arcu condimentum pulvinar
              laoreet eget neque.
            </Text>

            <Text style={[styles.titleText, { paddingTop: "5%" }]}>
              Nulla mattis feugiat egestas
            </Text>

            <Text style={styles.descriptionText}>
              Vivamus sit amet posuere justo, vel iaculis ante. Sed elementum
              pretium justo, sit amet pharetra risus tristique ac. Pellentesque
              porta libero eu lorem vulputate, vel malesuada metus tempus. Morbi
              dapibus lorem ut viverra ornare. Etiam vel ligula et magna
              volutpat posuere. Duis nisi lacus, venenatis scelerisque tempus
              at, ornare et odio. Aenean tristique mollis posuere. Integer
              faucibus massa nec leo blandit commodo. Etiam rhoncus tincidunt
              justo sit amet dignissim. Fusce eu est tellus. Nulla vel aliquam
              turpis.
            </Text>

            <Text style={[styles.titleText, { paddingTop: "5%" }]}>
              Nulla mattis feugiat egestas
            </Text>

            <Text style={styles.descriptionText}>
              Vivamus sit amet posuere justo, vel iaculis ante. Sed elementum
              pretium justo, sit amet pharetra risus tristique ac. Pellentesque
              porta libero eu lorem vulputate, vel malesuada metus tempus. Morbi
              dapibus lorem ut viverra ornare. Etiam vel ligula et magna
              volutpat posuere. Duis nisi lacus, venenatis scelerisque tempus
              at, ornare et odio. Aenean tristique mollis posuere. Integer
              faucibus massa nec leo blandit commodo. Etiam rhoncus tincidunt
              justo sit amet dignissim. Fusce eu est tellus. Nulla vel aliquam
              turpis.
            </Text>
          </ScrollView>
         */}
          {/* <View style={{flex:0.03   }}/> */}
        </View>
        {loading ? <Spinner /> : null}

      </View>
    </>
  );
};
//export default PrivacySecurity;
