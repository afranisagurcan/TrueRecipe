import { View } from "react-native";
import React from "react";
import IRecipe from "../utils/types/recipe.type";
import firestore from "@react-native-firebase/firestore";

function FavoriteStatus ({ recipeId, userId}: IRecipe.RecipeId)  {

  return (<View style={{ backgroundColor: "red" }} />);
};


export default FavoriteStatus;
