import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Card } from 'react-native-paper';
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

  const [recipeName, setRecipeName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [publisherId, setPublisherId] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    firestore()
      .collection("recipes")
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
      .collection("users")
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
      {image != "" && (
        <Card>
          <Card.Content style={{ height: "100%",marginTop:80 }}>
              <Card.Cover source={{ uri: image }} />

            <View style={styles.favButton}>
              <FavoriteStatus recipeId={recipeId} userId={userId} recipeName={recipeName} image={image} />
            </View>

            <DetailCard title={recipeName}>
              <Text style={styles.publisherName}>By {name} {surname}</Text>
              <View style={{ flexDirection: "row" }}>
                <DetailGroup title={time + "'"} iconName={"access-alarm"} />
                <DetailGroup title={rating} iconName={"star"} />
              </View>
            </DetailCard>

            <DetailCard title="Ingredients" iconName="local-grocery-store">
              <Text style={{ fontWeight: "bold", paddingVertical:15}}>{ingredients}</Text>
            </DetailCard>

            <DetailCard title="Description" iconName="takeout-dining">
              <Text style={{ fontWeight: "bold", paddingVertical:15 }}>{description}</Text>
            </DetailCard>


          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const DetailCard = ({ title, iconStyle, iconName, children }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerBox}>
        {iconName && <Icon style={{ marginRight: 12 }} name={iconName} size={20} />}
        <Text style={{ fontWeight: "600", fontSize: 20,  }}>{title}</Text>
      </View>
      <View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  favButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    flexDirection:"row",
  },
  header: {
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  card: {

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: "white",
    marginVertical: 12,
    borderRadius: 6,
    padding:20
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomColor: "#cecece",
    borderBottomWidth: 1
  },
  area: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "green",
    padding: 20
  },
  publisherName: {
    fontWeight: "400",
    fontStyle: "italic",
    paddingVertical: 15,


  }

});

export default DetailRecipe;
