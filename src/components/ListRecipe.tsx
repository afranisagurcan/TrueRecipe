import React, { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IRecipe from "../utils/types/recipe.type";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const DetailText = ({ name, item, iconName }: IRecipe.DetailProps) => {
  return (
    <View style={{ flexDirection: "row", margin: 5 }}>
      <Icon name={iconName} size={18} />
      <Text> {name}: {item} </Text>
    </View>
  );
};

const ListRecipe: FC<IRecipe.Props> = ( {recipes }) => {
  const navigation = useNavigation<any>();

  const Item = ({ recipeName, time, image, rating }: IRecipe.RecipeProps) => (

    <Card style={{ margin: 15 }} onPress={()=>navigation.navigate('DetailRecipe')}>
      <Card.Cover source={ require('../../patates.png')} />
      <Card.Content>
        <Text style={styles.header}>{recipeName}</Text>
        <DetailText name={"Time"} iconName={"access-time"} item={time} />
        <DetailText name={"Rating"} iconName={"star"} item={rating} />
      </Card.Content>
    </Card>

  );

  const EmptyListMessage = () => {
    return <Text style={styles.emptyList}>Please search a recipe</Text>;
  };

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
        ListEmptyComponent={EmptyListMessage}
      />
    </View>
  );
}

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
    fontWeight:'500',
    textAlign: 'center',
    color: 'black',
  },

});

export default ListRecipe;
