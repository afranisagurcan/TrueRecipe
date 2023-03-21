import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/addrecipe_css";

function AddRecipe(): JSX.Element {

  const [recipeName, setRecipeName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");

  const ref = firestore().collection("recipes");

  async function addRecipe() {
    await ref.add({
      recipeName: recipeName,
      time: time,
      description: description,
      ingredients: ingredients,
      image: image,
      rating: rating
    });
  }


  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.container}>
      <View style={styles.headerBox}>
        <Icon name={"restaurant-menu"} size={25} color="#084149" />
        <Text style={styles.headerText}> NEW RECIPE</Text>
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.inputHeader}>Recipe's Name{"\n"}</Text>
        <TextInput style={styles.inputText} value={recipeName} onChangeText={setRecipeName} />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.inputHeader}>Recipe's Description{"\n"}</Text>
        <TextInput style={styles.inputText} value={description} onChangeText={setDescription} />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.inputHeader}>Recipe's Ingredients{"\n"}</Text>
        <TextInput style={styles.inputText} value={ingredients} onChangeText={setIngredients} />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.inputHeader}>Recipe's Image{"\n"}</Text>
        <TextInput style={styles.inputText} value={image} onChangeText={setImage} />
      </View>

      <View style={styles.inputArea2}>
        <View style={{ width: "50%" }}>
          <Text style={styles.inputHeader2}>Recipe's Rating</Text>
          <TextInput style={styles.inputText} value={image} onChangeText={setRating} />
        </View>

        <View style={{ paddingLeft: 10, width: "50%" }}>
          <Text style={styles.inputHeader2}>Recipe's Time</Text>
          <TextInput style={styles.inputText} value={image} onChangeText={setTime} />
        </View>
      </View>

      <TouchableOpacity onPress={() => addRecipe()}>
        <View style={styles.button}>
          <Icon name={"add-box"} size={25} />
          <Text style={styles.buttonText}> SHARE YOUR RECIPE </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>

  );
}

export default AddRecipe;

