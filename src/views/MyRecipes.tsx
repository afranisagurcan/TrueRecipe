import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IRecipe from '../utils/types/recipe.type';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const MyRecipesPage = () => {
  const [user, setUser] = useState(auth().currentUser)
  const [recipes, setRecipes] = useState<IRecipe.FavoriteProps[] | []>([]);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  useEffect(() => {
    firestore()
      .collection('recipes')
      .where('publisherId', '==', user?.uid)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          recipeId: doc.id,
        }));
        setRecipes(data);
      });
  }, []);

  const Item = ({ recipeId, recipeName, image }: IRecipe.FavoriteProps) => (
    <TouchableOpacity style={styles.recipeItem}
                      onPress={() => navigation.navigate('DetailRecipe', {
                        paramKey: { recipeId },
                        userId: user?.uid,
                      })}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>

        <Text style={[styles.itemName, { color: '#003c4c' }]}>
          {recipeName}
        </Text>
      </View>
      <Icon name="chevron-right" size={30} color="#F9A602" />
    </TouchableOpacity>
  );

  const EmptyListMessage = () => {
    return (
      <Text style={styles.emptyList}>
        You haven't published any recipes yet
      </Text>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="menu-book" size={40} color="#F9A602" />
        <Text style={styles.title}>My Recipes</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#F9A602',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#003c4c',
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5BC0EB',
  },
  itemDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  itemTags: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  emptyList: {
    padding: 40,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },

});

export default MyRecipesPage;
