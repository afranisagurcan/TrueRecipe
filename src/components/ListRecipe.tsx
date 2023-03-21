import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import IRecipe from "../utils/types/recipe.type";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

function ListRecipe(): JSX.Element {
  const [recipes, setRecipes] = useState<IRecipe.RecipeProps[]>([]);

  const navigation = useNavigation<any>();

  useEffect(() => {
    firestore().collection("recipes").get()
      .then(collectionSnapshot => {
        const data: any = collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRecipes(data);
      });
  }, []);

  const Item = ({ recipeName, time, image, rating }: IRecipe.RecipeProps) => (

    <Card style={{ margin: 15 }} onPress={()=>navigation.navigate('ProfilePage')}>
      <Card.Cover source={ require('../../patates.png')} />
      <Card.Content>
        <Text style={styles.header}>{recipeName}</Text>
        <DetailText name={"Time"} iconName={"access-time"} item={time} />
        <DetailText name={"Rating"} iconName={"star"} item={rating} />
      </Card.Content>
    </Card>

  );

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={({ item }) =>
          <Item
            recipeName={item.recipeName}
            time={item.time}
            description={item.description}
            ingredients={item.ingredients}
            image={item.image}
            rating={item.rating}
          />
        }
        keyExtractor={(item, index) => "item-" + index}
      />
    </View>
  );
}


export default ListRecipe;

const DetailText = ({ name, item, iconName }: IRecipe.DetailProps) => {
  return (
    <View style={{ flexDirection: "row", margin: 5 }}>
      <Icon name={iconName} size={18} />
      <Text> {name}: {item} </Text>
    </View>
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
  }

});
