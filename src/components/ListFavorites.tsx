import ILogin from "../utils/types/login.type";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import IRecipe from "../utils/types/recipe.type";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


function ListFavorites({ userId }: ILogin.UserKey): JSX.Element {

  const [favs, setFavs] = useState<IRecipe.FavoriteProps[] | []>([]);

  const navigation = useNavigation<any>();

  useEffect(
    () => {
      firestore().collection("favorites")
        .where("userId", "==", userId)
        .get().then(querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setFavs(data);
      });
    }
    , [favs]);

  const Item = ({ recipeId, recipeName, image }: IRecipe.FavoriteProps) => (

    <Card style={{ margin: 15 }}
          onPress={() => navigation.navigate("DetailRecipe", { paramKey: { recipeId }, userId: userId })}>
      <Card.Cover source={{ uri: image }} />
      <Card.Content>
        <Text style={styles.header}>{recipeName}</Text>
      </Card.Content>
    </Card>

  );

  const EmptyListMessage = () => {
    return <Text style={styles.emptyList}>There are no recipes in your favorites yet :(</Text>;
  };

  return (
    <View>
      <FlatList
        data={favs}
        renderItem={({ item }) =>
          <Item
            recipeName={item.recipeName}
            recipeId={item.recipeId}
            image={item.image}
          />}
        keyExtractor={(item, index) => "item-" + index}
        ListEmptyComponent={EmptyListMessage}
      />
    </View>

  );
}

const styles = StyleSheet.create(
  {
    header: {
      fontWeight: "bold",
      fontSize: 20,
      paddingTop: 10
    },
    emptyList: {
      padding: 40,
      fontSize: 20,
      fontWeight: "500",
      textAlign: "center",
      color: "black"
    }

  }
);
export default ListFavorites;
