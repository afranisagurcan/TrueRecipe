import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import ListRecipe from "../components/ListRecipe";
import { Avatar, Button, Card,  } from 'react-native-paper';

function SearchPage(): JSX.Element {
  const [text, setText] = useState<string>("");

  return (

    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInputPassword}
          value={text}
          onChangeText={newValue => setText(newValue)}
        />
        <View style={{ width: "2%" }} />
        <View style={styles.searchArea}>
          <TouchableOpacity activeOpacity={0.2} onPress={() => console.log("rec")}>
            <Icon name={"magnifying-glass"} size={22} color="#464444" />
          </TouchableOpacity>
        </View>

      </View>
      <ListRecipe />

    </View>

  );
}

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
    searchArea: {
      width: "20%",
      borderWidth: 2,
      borderColor: "#f9bc00",
      backgroundColor: "#ffdc6c",
      alignItems: "center",
      paddingTop: 15,
      borderRadius: 15

    },
    textInputPassword: {
      fontSize: 22,
      width: "80%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      borderWidth: 2,
      borderColor: "#f9bc00",
      borderRadius: 15,
      opacity: 0.9,
      color: "black",
      padding: 15
    }
  }
);
export default SearchPage;
