import { Tab } from "../utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchPage from "./SearchPage";
import AddRecipe from "./AddRecipe";
import FavoritesPage from "./FavoritesPage";
import ProfilePage from "./ProfilePage";
import React from "react";
import { useRoute } from "@react-navigation/native";
import MyRecipes from "./MyRecipes";

function TabBottom(): JSX.Element {

  const route = useRoute<any>();
  const email = route.params.email;
  const userId = route.params.userId;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="search" color={color} size={size} />)
        }}
        name="SearchPage" component={SearchPage} initialParams={{ userId: userId }} />

      <Tab.Screen
        options={{
          tabBarLabel: "Add Recipe",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="add" color={color} size={size} />)
        }}
        name="AddRecipe" component={AddRecipe} initialParams={{ userId: userId }} />

      <Tab.Screen options={{
        tabBarLabel: "My Recipes",
        tabBarIcon: ({ color, size }) =>
          (<Icon name="food-bank" color={color} size={size} />)
      }} name="MyRecipes" component={MyRecipes} initialParams={{ userId: userId }} />
      <Tab.Screen
        options={{
          headerTransparent: true,
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) =>
            (<Icon name="favorite" color={color} size={size} />)
        }} name="FavoritesPage" component={FavoritesPage} initialParams={{ userId: userId }} />

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
