import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import IRecipe from "../utils/types/recipe.type";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Octicons";
import ListFavorites from "./ListFavorites";

function FavoriteStatus({ recipeId, userId, recipeName, image }: IRecipe.FavRecipe) {

  const [favorite, setFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");

  const ref = firestore().collection("favorites");


  useEffect(() => {

    ref.where("userId", "==", userId)
      .where("recipeId", "==", recipeId)
      .get().then(
      querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data(), favoriteId:doc.id}));
        if (data.length !== 0){
          setFavorite(true);
          setFavoriteId(data[0].favoriteId)
        }
      }
    );


  }, []);


  const addFavorite = () => {

    ref.add({
      recipeId: recipeId,
      userId: userId,
      recipeName: recipeName,
      image: image
    });

    setFavorite(true);

  };

  const deleteFavorite = () => {
    ref.doc(favoriteId)
      .delete()
    setFavorite(false);
  };


  return (
    <View>
      {!favorite &&
        <Icon.Button
          onPress={() => addFavorite()}
          name={"plus"}
          size={22}
          style={{ paddingLeft: 15, paddingVertical: 10, backgroundColor:'green' }}
          color={"white"}
        />
      }
      {favorite &&
        <Icon.Button
          onPress={() => deleteFavorite()}
          name={"check"}
          size={22}
          style={{ paddingLeft: 15, paddingVertical: 10, backgroundColor:'green' }}
          color={"white"}
        />

      }
    </View>
  );
};


const styles = StyleSheet.create({

  c2: {
    alignSelf: "flex-end",
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "green"
  }
});


export default FavoriteStatus;
