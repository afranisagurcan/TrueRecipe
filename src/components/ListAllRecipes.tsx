import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IRecipe from "../utils/types/recipe.type";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import ILogin from "../utils/types/login.type";

const DetailText = ({ name, item, iconName }: IRecipe.ListProps) => {
  return (
    <View style={{ flexDirection: "row", margin: 5 }}>
      <Icon name={iconName} size={18} />
      <Text> {name}: {item} </Text>
    </View>
  );
};

const ListAllRecipes = ({ userId }: ILogin.UserKey) => {

  const navigation = useNavigation<any>();

  const [recipes, setRecipes] = useState<IRecipe.RecipeProps[] | null>(null);

  const Item = ({ recipeName, time, image, rating, recipeId }: IRecipe.RecipeProps) => (

    <Card style={{ margin: 15 }}
          onPress={() => navigation.navigate("DetailRecipe", { paramKey: { recipeId }, userId: userId })}>
      <Card.Cover source={{ uri: image }} />
      <Card.Content>
        <Text style={styles.header}>{recipeName}</Text>
        <DetailText name={"Time"} iconName={"access-time"} item={time} />
        <DetailText name={"Rating"} iconName={"star"} item={rating} />
      </Card.Content>
    </Card>

  );
  useEffect(() => {
    firestore()
      .collection("recipes")
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data(), recipeId: doc.id }));
        setRecipes(data);
      });

  }, []);

  const EmptyListMessage = () => {
    return <Text style={styles.emptyList}>Please search a recipe</Text>;
  };


  return (
    <FlatList
      style={{
        flex: 1,
      }}
      data={recipes}
      renderItem={({ item }) =>
        <Item
          recipeName={item.recipeName}
          time={item.time}
          description={item.description}
          ingredients={item.ingredients}
          image={item.image}
          rating={item.rating}
          recipeId={item.recipeId}
        />
      }
      keyExtractor={(item, index) => "item-" + index}
      ListEmptyComponent={EmptyListMessage}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10
  },
  detail: {
    flexDirection: "row",
    margin: 5
  },
  emptyList: {
    padding: 40,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "black"
  }

});

export default ListAllRecipes;
