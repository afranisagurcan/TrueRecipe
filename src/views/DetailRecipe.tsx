import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Card, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FavoriteStatus from '../components/FavoriteStatus';
import IGroupInput from '../utils/types/input.type';

const DetailGroup: FC<IGroupInput.DetailGroupProps> = ({
                                                         title,
                                                         iconName,
                                                         iconStyle,
                                                         textStyle,
                                                       }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {iconStyle ? (
        <Icon style={iconStyle} name={iconName} size={20} />
      ) : (
        <Icon name={iconName} size={20} />
      )}
      {textStyle ? (
        <Text style={textStyle}> {title} </Text>
      ) : (
        <Text style={{ fontSize: 18 }}> {title} </Text>
      )}
    </View>
  );
};

const DetailRecipe = () => {
  const route = useRoute<any>();

  const recipeId = route.params.paramKey.recipeId;
  const userId = route.params.userId;

  const [recipeName, setRecipeName] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');
  const [publisherId, setPublisherId] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    firestore()
      .collection('recipes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === recipeId) {
            setRecipeName(doc.data().recipeName);
            setTime(doc.data().time);
            setDescription(doc.data().description);
            setIngredients(doc.data().ingredients);
            setImage(doc.data().image);
            setRating(doc.data().rating);
            setPublisherId(doc.data().publisherId);
          }
        });
      });
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === publisherId) {
            setName(doc.data().name);
            setSurname(doc.data().surname);
          }
        });
      });
  }, []);

  return (
    <ScrollView>
      {image != '' && (
        <Card>
          <Card.Cover source={{ uri: image }} />
          <Card.Content style={{ height: '100%' }}>

            <View style={styles.favButton}>
              <FavoriteStatus recipeId={recipeId} userId={userId} recipeName={recipeName} image={image} />
            </View>

            <View style={styles.area}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.header}>{recipeName}</Text>
              </View>
              <Text style={styles.publisherName}>By {name} {surname}</Text>
              <View style={{ flexDirection: "row" }}>
                <DetailGroup title={time + "'"} iconName={"access-alarm"} />
                <DetailGroup title={rating} iconName={"star"} />
              </View>
            </View>

            <View style={styles.area}>
              <DetailGroup title={" Ingredients"} iconStyle={{ padding: 3 }}
                           textStyle={{ fontWeight: "bold", fontSize: 25 }}
                           iconName={"local-grocery-store"} />
              <Divider />
              <Text style={{ fontWeight: "bold", padding: 10 }}>{ingredients}</Text>
            </View>

            <View style={styles.area}>
              <DetailGroup title={" Description"} iconStyle={{ padding: 3 }}
                           textStyle={{ fontWeight: "bold", fontSize: 25 }}
                           iconName={"takeout-dining"} />

              <Divider />
              <Text style={{ fontWeight: "bold", padding: 10 }}>{description}</Text>
            </View>


          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  favButton: {
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'green',
    marginTop: 10
  },
  header: {
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  area: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'green',
    padding: 20
  },
  publisherName: {
    fontWeight: '400',
    fontStyle: 'italic',
    paddingVertical: 7,
  },

});

export default DetailRecipe;
