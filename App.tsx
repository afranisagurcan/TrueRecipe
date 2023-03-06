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

const Stack = createNativeStackNavigator();
function App(): JSX.Element {

    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="SignUpPage">
          <Stack.Screen

            options={{

              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'grey',
              headerTransparent: true,
              headerTitleStyle: {

                fontWeight: 'bold',
              },
            }}
            name=" "
            component={SignUpPage}
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

/*
   const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user: any) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {

      auth()
        .createUserWithEmailAndPassword("jane.doe@example.com", "SuperSecretPassword!")
        .then(() => {
          console.log("User account created & signed in!");
        })
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }

          console.error(error);
        });

      auth()
        .signOut()
        .then(() => console.log("User signed out!"));
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing)
      return (
        <View>
          <Text>BOS</Text>
          <Text>BOS</Text>
          <Text>BOS</Text>
          <Text>BOS</Text>
          <Text>BOS</Text>
        </View>
      );

    if (!user) {
      return (
        <View>
          <Text>Login</Text>
          <Text>Login</Text>
          <Text>Login</Text>
          <Text>Login</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Welcome</Text>
        <Text>Welcome</Text>
        <Text>Welcome</Text>
        <Text>Welcome</Text>
        <Text>Welcome</Text>

      </View>
 */
