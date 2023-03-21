import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Stack } from "./src/utils";
import WelcomePage from "./src/views/WelcomePage";
import SignInPage from "./src/views/SignInPage";
import TabBottom from "./src/views/TabBottom";

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInPage"
          component={SignInPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabBottom}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>

    </NavigationContainer>


  );
}


export default App;
