import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FavoriteStatus from '../components/FavoriteStatus';
import IGroupInput from '../utils/types/input.type';
import auth from '@react-native-firebase/auth';
import IRecipe from '../utils/types/recipe.type';

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

  const [user, setUser] = useState(auth().currentUser);
  const [recipe, setRecipe] = useState<IRecipe.RecipeDetailsProps | null>(null)

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    firestore()
      .collection("recipes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          if (doc.id === recipeId) {
            setRecipe(doc.data() as IRecipe.RecipeDetailsProps)
          }
        });
      });
  }, []);

  useEffect(() => {
    if (recipe?.publisherId) {
      firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.id === recipe?.publisherId) {
              setName(doc.data().name);
              setSurname(doc.data().surname);
            }
          });
        });
    }
  }, [recipe?.publisherId])


  return (
    <ScrollView>
      {recipe?.image && (
        <Card>
          <Card.Content style={{ height: "100%", marginTop: 80 }}>
            <Card.Cover source={{ uri: recipe?.image }} />

            {recipe?.recipeName &&
              <View style={styles.favButton}>
                <FavoriteStatus recipeId={recipeId} userId={user?.uid} recipeName={recipe.recipeName}
                                image={recipe.image} />
              </View>
            }

            {recipe?.recipeName &&
              <DetailCard title={recipe.recipeName}>
                <Text style={styles.publisherName}>By {name} {surname}</Text>
                <View style={{ flexDirection: "row" }}>
                  {recipe.time && <DetailGroup title={recipe.time + "'"} iconName={"access-alarm"} />}
                  {recipe.rating && <DetailGroup title={recipe.rating} iconName={"star"} />}
                </View>
              </DetailCard>
            }

            {recipe?.description &&
              <DetailCard title="Ingredients" iconName="local-grocery-store">
                <Text style={{ fontWeight: "bold", paddingVertical: 15 }}>{recipe.ingredients}</Text>
              </DetailCard>
            }

            {recipe?.description &&
              <DetailCard title="Description" iconName="takeout-dining">
                <Text style={{ fontWeight: "bold", paddingVertical: 15 }}>{recipe.description}</Text>
              </DetailCard>
            }

          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const DetailCard = ({ title , iconName, children }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerBox}>
        {iconName && <Icon style={{ marginRight: 12 }} name={iconName} size={20} />}
        <Text style={{ fontWeight: "600", fontSize: 20, }}>{title}</Text>
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
    flexDirection: "row",
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
    padding: 20
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
