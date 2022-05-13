import React from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";

export const Verify = (props) => {
  Alert.alert("ok");
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

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/BackgroundDark.png")}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              justifyContent: "center",
              flex: 0.35,
            }}
          >
            <Image
              style={{ height: 70, width: "100%", alignSelf: "center" }}
              resizeMode="contain"
              source={require("../../assets/Logo.png")}
            />
          </View>
          <View
            style={{
              height: "100%",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              marginTop: "50%",
              backgroundColor: "rgba(0,0,0,0.5)",
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
              borderTopLeftRadius: 20,
              borderWidth: 1,
              zIndex: 1,
            }}
          >
            <Text
              style={{
                marginTop: "10%",
                fontWeight: "bold",
                fontSize: 27,
                color: "#fff",
              }}
            >
              Verify Mobile Number
            </Text>
            <Text style={{ marginTop: "1%", fontSize: 16, color: "#fff" }}>
              Please confirm your mobile number
            </Text>
            <Text
              style={{
                marginTop: "1%",
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
              }}
            >
              0476163910
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <View
              style={{
                height: 50,
                width: "80%",
                borderColor: "lightgray",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(211,211,211,0.3)",
                borderRadius: 50,
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "#fff",
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={require("../../assets/Swipe.png")}
                />
              </View>
              <TextInput
                textAlign="center"
                placeholder="Enter Email or Username"
                placeholderTextColor="#fff"
                style={{ height: "100%", marginLeft: 10, width: "70%" }}
              />
            </View>
            <View
              style={{
                height: 50,
                marginTop: "15%",
                width: "80%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "rgba(211,211,211,0.3)",
                }}
              >
                <TextInput
                  textAlign="center"
                  value={"2"}
                  placeholderTextColor="#fff"
                  style={{ flex: 1, color: "#fff" }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  marginLeft: 10,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "rgba(211,211,211,0.3)",
                }}
              >
                <TextInput
                  textAlign="center"
                  value={"8"}
                  placeholderTextColor="#fff"
                  style={{ flex: 1, color: "#fff" }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  marginLeft: 10,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "rgba(211,211,211,0.3)",
                }}
              >
                <TextInput
                  textAlign="center"
                  value={"5"}
                  placeholderTextColor="#fff"
                  style={{ flex: 1, color: "#fff" }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "rgba(211,211,211,0.3)",
                }}
              >
                <TextInput
                  textAlign="center"
                  value={"1"}
                  placeholderTextColor="#fff"
                  style={{ flex: 1, color: "#fff" }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  backgroundColor: "rgba(211,211,211,0.3)",
                }}
              >
                <TextInput
                  textAlign="center"
                  value={"3"}
                  placeholderTextColor="#fff"
                  style={{ flex: 1, color: "#fff" }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Welcome")}
              style={{
                height: 50,
                justifyContent: "center",
                marginTop: 50,
                width: "80%",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 50,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 22, color: "red" }}>
                Verify
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              bottom: 20,
              alignItems: "center",
            }}
          >
            <Text
              onPress={() => props.navigation.goBack()}
              style={{ color: "#fff" }}
            >
              Back to Login
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};
