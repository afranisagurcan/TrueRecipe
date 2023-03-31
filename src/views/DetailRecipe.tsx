import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { Card, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

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

  useEffect(
    () => {
      firestore()
        .collection("recipes").get().then(
        querySnapshot => {
          querySnapshot.forEach((doc) => {
            if (doc.id === recipeId) {
              setRecipeName(doc.data().recipeName);
              setTime(doc.data().time);
              setDescription(doc.data().description);
              setIngredients(doc.data().ingredients);
              setImage(doc.data().image);
              setRating(doc.data().rating);
            }
          });
        });
      }
    , []);

  const addFavorite = () => {
    const ref = firestore().collection("favorites");

    ref.add({
      recipeId: recipeId,
      userId: userId,
      recipeName:recipeName,
      image:image
    });

  };


  return (

    <ScrollView style={{height:'100%'}}>
      {image != "" &&
        <Card style={styles.c3}>
          <Card.Cover source={{ uri: image }} style={styles.image} />
          <Card.Content>
            <View style={styles.text}>

              <View style={styles.c2}>
                <Icon.Button onPress={() => addFavorite()}
                             name={"favorite"}
                             size={22}
                             style={{ paddingLeft: 15, paddingVertical: 10 }}
                             color={"red"}
                             backgroundColor={"white"}>
                </Icon.Button>
              </View>
              <Card style={styles.card}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.header}>{recipeName}</Text>

                </View>

                <View style={styles.subheader}>
                  <Icon name={"access-alarm"} size={20} />
                  <Text style={{ fontSize: 18 }}> {time}' </Text>
                  <Icon name={"star"} size={23} color={"#ffc400"} />
                  <Text style={{ fontSize: 18 }}> {rating}</Text>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.subheader}>
                  <Icon name={"local-grocery-store"} style={{ padding: 3 }} size={25} />
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}> Ingredients</Text>
                </View>
                <Divider />
                <Text style={{ fontWeight: "bold", padding: 10 }}>{ingredients}</Text>
              </Card>

              <Card style={styles.card}>
                <View style={styles.subheader}>
                  <Icon name={"takeout-dining"} style={{ padding: 3 }} size={25} />
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}> Description</Text>
                </View>
                <Divider />
                <Text style={{ fontWeight: "bold", padding: 10 }}>{description}</Text>
              </Card>

            </View>


          </Card.Content>


        </Card>

      }

    </ScrollView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  c2: {
    alignItems: "flex-end"
  },
  c3: {
    height:'80%'
  },
  image: {
    height: "50%",
    flex: 1,
    justifyContent: "flex-end"
  },
  text: {
    padding: 30,
    height: "60%"
  },
  card: {
    marginTop: 20,
    padding: 20
  },
  header: {
    textAlign: "right",
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
    paddingTop: 10
  },
  subheader: {
    flexDirection: "row"
  },
  icon: {
    width: "20%",
    alignSelf: "flex-end",
    backgroundColor: "red"

  }

});


export default DetailRecipe;
