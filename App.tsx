import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Stack } from './src/utils';
import WelcomePage from './src/views/WelcomePage';
import SignInPage from './src/views/SignInPage';
import TabBottom from './src/views/TabBottom';
import DetailRecipe from './src/views/DetailRecipe';
import auth from '@react-native-firebase/auth';
import Icon from "react-native-vector-icons/MaterialIcons";

const Main = ({ isLoggedIn }: any) => {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "WelcomePage":"Home"}>
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
      <Stack.Screen
        name={'DetailRecipe'}
        component={DetailRecipe}
        options={{
          headerTitle: '',
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTransparent:true,
          headerBackTitleVisible: false,
          headerBackTitle:'AFRA'
        }}
      />
    </Stack.Navigator>
  );
};

function App() {

  return (
    <NavigationContainer>
      <Main isLoggedIn={auth().currentUser} />
    </NavigationContainer>
  );
}


export default App;
