import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import ListFavorites from "../components/ListFavorites";
import { useRoute } from "@react-navigation/native";

function FavoritesPage(): JSX.Element {

  //<Icon name={'favorite'} style={{padding:3}} color={'#e00a0a'} size={21} />

  const route = useRoute<any>();
  const userId = route.params.userId;

  return (
    <View  >
      <View style={styles.container}>
        <Text style={styles.header}>My Favorites</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <ListFavorites userId={userId} />
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {

    flexDirection: "row",
    alignSelf: "center",
    marginTop: 80,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingBottom: 20,
    color: "#e00a0a",

  }
});

export default FavoritesPage;

