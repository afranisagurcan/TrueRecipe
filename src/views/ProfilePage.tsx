import React, { FC, useState } from 'react';
import { Avatar, Divider, List } from 'react-native-paper';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IGroupInput from '../utils/types/input.type';
import auth from '@react-native-firebase/auth';

const ListGroup: FC<IGroupInput.ProfileListProps> = ({
                                                       title,
                                                       iconName,
                                                       ...props
                                                     }) => {
  return (
    <View>
      <List.Item
        titleStyle={styles.listItem}
        title={title}
        left={() => <Icon size={30} name={iconName} />}
        {...props}
      />
      <Divider />
    </View>
  );
};


function ProfilePage() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const email = route.params.email;

  const logoutAlert = () => {
    Alert.alert("Are you sure?", "", [
      {
        text: "No",
        onPress: () => navigation.navigate("ProfilePage")
      },
      {
        text: "YES",
        onPress: () => {
          auth().signOut().then(()=>{
            navigation.navigate("WelcomePage")
          })
        }
      }
    ]);
  };

  const MyComponent = () => {
    const mail = email.charAt(0).toUpperCase();
    const sonMail = mail + email.substring(1);

    firestore()
      .collection("users")
      .where("email", "==", sonMail)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          userId: doc.id
        }));
        setUserId(data[0].userId);
        setName(data[0].name);
        setSurname(data[0].surname);
      });

    const label = name.charAt(0) + surname.charAt(0);
    name.charAt(0);
    return (
      <View style={styles.avatar}>
        <Avatar.Text
          style={{ backgroundColor: "#6e4b4b" }}
          size={100}
          label={label}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Image style={styles.icon} source={require('../../recipeIcon.png')} />
          <Text style={styles.header}> TrueRecipe</Text>
        </View>
        <MyComponent />
      </View>

      <View>
        <List.Section style={styles.list}>
          <ListGroup title={'Favorites'} iconName={'star'}
                     onPress={() => navigation.navigate('FavoritesPage', { paramKey: userId })} />
          <ListGroup title={'My Recipes'} iconName={'food-variant'}
                     onPress={() => navigation.navigate('MyRecipes', { userId: userId })} />
          <ListGroup title={'Add A New Recipe'} iconName={'plus'}
                     onPress={() => navigation.navigate('AddRecipe', { paramKey: userId })} />
          <ListGroup title={'Logout'} iconName={'logout'}
                     onPress={() => logoutAlert()} />
        </List.Section>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "45%"
  },
  list: {
    paddingTop: 50,
    height: "55%",
    width: "90%",
    paddingLeft: 30
  },
  listItem:
    {
      fontSize: 22,
      fontWeight: "bold"
    },
  headerCard: {
    flexDirection: "row",
    paddingTop: 80,
    paddingLeft: 30
  },
  icon: {
    width: 40,
    height: 40
  },
  header: {
    fontWeight: "bold",
    paddingTop: 7,
    fontSize: 23,
    color: "#6e4b4b"
  },
  avatar: {
    alignItems: "center",
    paddingTop: 80
  }
});

export default ProfilePage;

