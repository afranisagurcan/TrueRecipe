import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from "react-native-paper";
import ListFavorites from '../components/ListFavorites';
import {useRoute} from '@react-navigation/native';

function FavoritesPage(): JSX.Element {

  const route = useRoute<any>();
  const userId = route.params.userId;

  return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <View>
          <ListFavorites userId={userId} />
        </View>
      </View>

  );
}

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
    marginVertical:40
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9B51E0',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 10,
    padding: 10,
  },
  iconContainer: {
    borderRadius: 20,
    padding: 10,
    marginRight: 20,
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
    color: '#333',
  },

});

export default FavoritesPage;
