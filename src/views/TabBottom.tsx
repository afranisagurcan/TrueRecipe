import { Tab } from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchPage from './SearchPage';
import AddRecipe from './AddRecipe';
import FavoritesPage from './FavoritesPage';
import ProfilePage from './ProfilePage';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MyRecipes from './MyRecipes';
import auth from '@react-native-firebase/auth';


function TabBottom(): JSX.Element {
  const [user, setUser] = useState(auth().currentUser);
  const route = useRoute<any>();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
        name="SearchPage"
        component={SearchPage}
        initialParams={{ userId: user?.uid }}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Add Recipe',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" color={color} size={size} />
          ),
        }}
        name="AddRecipe"
        component={AddRecipe}
        initialParams={{ userId: user?.uid }}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'My Recipes',
          tabBarIcon: ({ color, size }) => (
            <Icon name="food-bank" color={color} size={size} />
          ),
        }}
        name="MyRecipes"
        component={MyRecipes}
        initialParams={{ userId: user?.uid }}
      />
      <Tab.Screen
        options={{
          headerTransparent: true,
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="favorite" color={color} size={size} />
          ),
        }}
        name="FavoritesPage"
        component={FavoritesPage}
        initialParams={{ userId: user?.uid }}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
        name="ProfilePage"
        component={ProfilePage}
        initialParams={{ email: user?.email }}
      />
    </Tab.Navigator>
  );
}

export default TabBottom;
