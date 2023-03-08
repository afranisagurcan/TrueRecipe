import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Circle, G,  Text,TextPath, TSpan } from "react-native-svg";
import LogInPage from "./LogInPage";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

function WelcomePage(): JSX.Element {

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <SvgComponent/>
      </View>
      <View style={styles.logIn}>
        <LogInPage/>
      </View>
    </ScrollView>

 );

}

const SvgComponent = () => (
  <Svg height="100%" width="100%" viewBox="0 -30 300 300">
    <G id="circle">
      <Circle
        r={100}
        x={150}
        y={150}
        fill="none"
        transform="rotate(195)"
      />
    </G>
    <Text fill="#f9bc00" fontWeight={"bold"} fontSize="20">
      <TextPath href="#circle">
        <TSpan>
          WELCOME TO TRUE RECIPE
        </TSpan>
      </TextPath>
    </Text>
    <Image
      style={{
        width: "40%", height: "40%", marginLeft:115,marginTop:120, resizeMode: "contain"
      }}
      source={require("../../recipeIcon.png")}
    />

  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  header: {
    marginTop:30,
    alignItems: "center",
    height:'40%',
  },
  logIn:{
    height:'50%',

  },
  textHeader: {
    fontSize: 22,
    color: "#439b3e",
    fontWeight: "bold",
    paddingVertical: 20
  },
  textLogIn: {
    color:'#6e4b4b'
  }

});
export default WelcomePage;

