import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import IRecipe from "../utils/types/recipe.type";
import firestore from "@react-native-firebase/firestore";
import ListRecipe from "../components/ListRecipe";
import { useRoute } from "@react-navigation/native";
import ListAllRecipes from "../components/ListAllRecipes";

const SearchPage = () => {

  const [text, setText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IRecipe.RecipeProps[] | null>(null);

  const route = useRoute<any>();
  const userId = route.params.userId;

  const search = () => {
     firestore()
      .collection("recipes")
       .orderBy('recipeName')
       .startAt(text)
       .endAt(text + '\uf8ff')
       .get()
       .then(querySnapshot => {
         const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data(), recipeId: doc.id }));
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
      { (!filteredData || text =='')  && (
        <ListAllRecipes userId={userId}/>
      )}
      {filteredData && (
        <ListRecipe recipes={filteredData} userId={userId} />
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
      borderColor: "#F9A602",
      borderRadius: 15,
      opacity: 0.9,
      color: "black",
      padding: 15
    },
    searchArea: {
      width: "20%",
      borderWidth: 2,
      borderColor: "#F9A602",
      backgroundColor: "#ffcb3b",
      alignItems: "center",
      paddingTop: 15,
      borderRadius: 15
    },
    emptyList: {
      padding: 40,
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
      color: "black"
    }

  }
);
export default SearchPage;
