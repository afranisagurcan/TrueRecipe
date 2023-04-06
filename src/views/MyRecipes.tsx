import React, {useEffect, useState} from 'react';
import IRecipe from '../utils/types/recipe.type';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Card} from 'react-native-paper';
import {FlatList, StyleSheet, Text, View} from 'react-native';

function MyRecipes(): JSX.Element {
  const [recipes, setRecipes] = useState<IRecipe.FavoriteProps[] | []>([]);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userId = route.params.userId;

  useEffect(() => {
    firestore()
      .collection('recipes')
      .where('publisherId', '==', userId)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecipes(data);
      });
  }, []);

  const Item = ({recipeId, recipeName, image}: IRecipe.FavoriteProps) => (
    <Card
      style={{margin: 15}}
      onPress={() =>
        navigation.navigate('DetailRecipe', {
          paramKey: {recipeId},
          userId: userId,
        })
      }>
      <Card.Cover source={{uri: image}} />
      <Card.Content>
        <Text style={styles.textHeader}>{recipeName}</Text>
      </Card.Content>
    </Card>
  );

  const EmptyListMessage = () => {
    return (
      <Text style={styles.emptyList}>
        You haven't published any recipes yet
      </Text>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>My Recipes</Text>
      </View>
      <FlatList
        data={recipes}
        renderItem={({item}) => (
          <Item
            recipeName={item.recipeName}
            recipeId={item.recipeId}
            image={item.image}
          />
        )}
        keyExtractor={(item, index) => 'item-' + index}
        ListEmptyComponent={EmptyListMessage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 80,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingBottom: 20,
    color: '#e00a0a',
  },
  emptyList: {
    padding: 40,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
});

export default MyRecipes;
