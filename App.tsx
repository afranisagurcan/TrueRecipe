/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import auth from "@react-native-firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage from "./src/views/SignUpPage";
import WelcomePage from "./src/views/WelcomePage";
import UserPage from "./src/views/UserPage";

const Stack = createNativeStackNavigator();
function App(): JSX.Element {

    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="WelcomePage">
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
              headerTransparent: true,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="WelcomePage"
            component={WelcomePage}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
              headerTransparent: true,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="SignUpPage"
            component={SignUpPage}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerShown: false,
              headerTransparent: true,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="UserPage"
            component={UserPage}
          />

          </Stack.Navigator>
      </NavigationContainer>

    )

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default App;
