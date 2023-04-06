import { StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import IRecipe from '../utils/types/recipe.type';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Octicons';
import IGroupInput from '../utils/types/input.type';

const FavoriteGroup: FC<IGroupInput.FavoriteGroupProps> = ({
                                                             icon,
                                                             ...props
                                                           }) => {
  return (
    <Icon.Button
      style={styles.iconButton}
      name={icon.toString()}
      size={22}
      backgroundColor={'green'}
      color={'white'}
      {...props}
    />
  );
};

function FavoriteStatus({
                          recipeId,
                          userId,
                          recipeName,
                          image,
                        }: IRecipe.FavRecipe_User) {
  const [favorite, setFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState('');

  const ref = firestore().collection('favorites');

  useEffect(() => {
    ref
      .where('userId', '==', userId)
      .where('recipeId', '==', recipeId)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          favoriteId: doc.id,
        }));
        if (data.length !== 0) {
          setFavorite(true);
          setFavoriteId(data[0].favoriteId);
        }
      });
  }, []);

  const addFavorite = () => {
    ref.add({
      recipeId: recipeId,
      userId: userId,
      recipeName: recipeName,
      image: image,
    });

    setFavorite(true);
  };

  const deleteFavorite = () => {
    ref.doc(favoriteId).delete();
    setFavorite(false);
  };

  return (
    <View>
      {!favorite && (
        <FavoriteGroup icon={'plus'} onPress={() => addFavorite()} title={''} />)}
      {favorite && (<FavoriteGroup icon={'check'} onPress={() => deleteFavorite()} title={''} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  c2: {
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'green',
  },
  iconButton: {
    paddingLeft: 15,
    paddingVertical: 10,
    backgroundColor: 'green',
  },
});


export default FavoriteStatus;
