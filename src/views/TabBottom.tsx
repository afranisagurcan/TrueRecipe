import { Tab } from "../utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchPage from "./SearchPage";
import AddRecipe from "./AddRecipe";
import FavoritesPage from "./FavoritesPage";
import ProfilePage from "./ProfilePage";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

function TabBottom(): JSX.Element {
  const route = useRoute<any>();
  const email = route.params.email;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="search" color={color} size={size} />)
        }}
        name="SearchPage" component={SearchPage} />
      <Tab.Screen
        options={{
          tabBarLabel: "Add Recipe",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="add" color={color} size={size} />)
        }}
        name="AddRecipe" component={AddRecipe} />
      <Tab.Screen
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="grade" color={color} size={size} />)
        }} name="FavoritesPage" component={FavoritesPage} />
      <Tab.Screen options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) =>
          (<Icon name="person" color={color} size={size} />)
      }} name="ProfilePage" component={ProfilePage} initialParams={{ email: email }}
      />
    </Tab.Navigator>
  );
}

export default TabBottom;
