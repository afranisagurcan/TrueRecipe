import ILogin from '../utils/types/login.type';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IRecipe from '../utils/types/recipe.type';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ListFavorites({ userId }: ILogin.UserKey): JSX.Element {
  const [favs, setFavs] = useState<IRecipe.FavoriteProps[] | []>([]);

  const navigation = useNavigation<any>();

  useEffect(() => {
    firestore()
      .collection('favorites')
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFavs(data);
      });
  }, [favs]);

  const Item = ({ recipeId, recipeName, image }: IRecipe.FavoriteProps) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() =>
        navigation.navigate('DetailRecipe', {
          paramKey: { recipeId },
          userId: userId,
        })
      }>
      <View style={[styles.iconContainer, { backgroundColor: '#9B51E0' }]}>
        <Icon name="heart" size={30} color="#fff" />
      </View>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: '#333' }]}>{recipeName}</Text>
      </View>
      <Icon name="chevron-right" size={30} color="#9B51E0" />
    </TouchableOpacity>
  );

  const EmptyListMessage = () => {
    return (
      <Text style={styles.emptyList}>
        There are no recipes in your favorites yet.
      </Text>
    );
  };

  return (
    <View>
      <FlatList
        data={favs}
        renderItem={({ item }) => (
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
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10
  },
  emptyList: {
    padding: 40,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "black"
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 30,
    color: "#9B51E0"
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  iconContainer: {
    borderRadius: 20,
    padding: 10,
    marginRight: 20
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  itemDescription: {
    fontSize: 16,
    color: "#666"
  }
});
export default ListFavorites;
