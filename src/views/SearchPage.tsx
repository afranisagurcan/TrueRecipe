import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import IRecipe from "../utils/types/recipe.type";
import firestore from "@react-native-firebase/firestore";
import ListRecipe from "../components/ListRecipe";

const SearchPage = () => {
  const [text, setText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IRecipe.RecipeProps[] | null>(null);

  const search = () => {
    firestore()
      .collection("recipes")
      .where("recipeName", "==", text)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        setFilteredData(data);
      });
  };
  return (

    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInputArea}
          value={text}
          onChangeText={newValue => setText(newValue)}
        />
        <View style={{ width: "2%" }} />
        <TouchableOpacity style={styles.searchArea} activeOpacity={0.2} onPress={() => search()}>
          <View>
            <Icon name={"magnifying-glass"} size={22} color="#464444" />
          </View>
        </TouchableOpacity>
      </View>
      {!filteredData && (
        <Text style={styles.emptyList}>Please search a recipe</Text>
      )}
      {filteredData && (
        <ListRecipe recipes={filteredData} />
      )}
    </View>

  );
};

const styles = StyleSheet.create(
  {
    container: {
      height: "100%"
    },
    inputArea: {
      marginLeft: 10,
      marginTop: 80,
      padding: 15,
      flexDirection: "row"
    },
    textInputArea: {
      fontSize: 22,
      width: "80%",
      display: "flex",
      justifyContent: "flex-start",
      borderWidth: 2,
      borderColor: "#f9bc00",
      borderRadius: 15,
      opacity: 0.9,
      color: "black",
      padding: 15
    },
    searchArea: {
      width: "20%",
      borderWidth: 2,
      borderColor: "#f9bc00",
      backgroundColor: "#ffdc6c",
      alignItems: "center",
      paddingTop: 15,
      borderRadius: 15
    },
    emptyList: {
      padding: 40,
      fontSize: 18,
      fontWeight:'500',
      textAlign: 'center',
      color: 'black',
    },

  }
);
export default SearchPage;
