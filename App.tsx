/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpPage from "./src/views/SignUpPage";
import WelcomePage from "./src/views/WelcomePage";
import UserPage from "./src/views/UserPage";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">

        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "transparent" },
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: { fontWeight: "bold" }
          }}
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "transparent" },
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: { fontWeight: "bold" }
          }}
          name="SignUpPage"
          component={SignUpPage}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "transparent" },
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: { fontWeight: "bold" }
          }}
          name="UserPage"
          component={UserPage}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default App;
