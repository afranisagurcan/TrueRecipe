import React, { useState } from "react";
import { Avatar,Button, Dialog, Divider, List,Portal, Provider } from "react-native-paper";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ProfilePage() {

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [userId,setUserId] = useState<string>("");

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const email = route.params.email;

  const profileName = () => {
    const mail = email.charAt(0).toUpperCase();
    const sonMail = mail + email.substring(1);

    firestore()
      .collection("users").where("email", "==", sonMail)
      .get()
      .then(querySnapshot => {
        const data: any = querySnapshot.docs.map((doc) => ({ ...doc.data(), userId:doc.id }));
        setUserId(data[0].userId);
        setName(data[0].name);
        setSurname(data[0].surname);
      });

  };

  const logoutAlert = () =>
    Alert.alert('Are you sure?' , '',[
      {
        text: 'Yes',
        onPress: () => navigation.navigate('WelcomePage'),
        style: 'cancel',
      },
      {text: 'No', onPress: () => navigation.navigate('ProfilePage')},
    ]);


  const MyComponent = () => {
    profileName();
    const label = name.charAt(0) + surname.charAt(0);
    name.charAt(0);
    return (
      <View style={styles.avatar}>
        <Avatar.Text style={{backgroundColor:"#6e4b4b"}} size={100} label={label} />

      </View>
    );

  };



  //<List.Icon color={MD3Colors.neutral30} icon="equal" />
  // <List.Icon color={MD3Colors.neutral30} icon="calendar" />
  /*
   <View style={{flexDirection:'row', padding:15}}>
            <Icon size={40} color={'black'} name={'star'}/>
            <Text style={{fontSize:24, paddingTop:6}}> Favorites</Text>
    </View>
   */

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Image style={styles.icon} source={require('../../recipeIcon.png')} />
          <Text style={styles.header}> TrueRecipe</Text>
        </View>
        <MyComponent />
      </View>

      <View >
        <List.Section style={{ paddingTop:50,height:'55%',width:'90%',paddingLeft:30}}>
          <List.Item titleStyle={{fontSize:22, fontWeight:'bold'}} title="Favorites"
                     left={() => <Icon size={30}  name="star" />}
                     onPress={()=>navigation.navigate('FavoritesPage' ,{paramKey: userId})} />
          <Divider />
          <List.Item titleStyle={{fontSize:22, fontWeight:'bold'}} title="My Recipes"
                     left={() => <Icon size={30}  name="food-variant" />}
                     onPress={()=>navigation.navigate('MyRecipes')}/>
          <Divider />
          <List.Item titleStyle={{fontSize:22, fontWeight:'bold'}} title="Add A New Recipe"
                     left={() => <Icon size={30}  name="plus" />}
                     onPress={()=>navigation.navigate('AddRecipe')}/>
          <Divider />
          <List.Item titleStyle={{fontSize:22, fontWeight:'bold'}} title="Logout"
                     left={() => <Icon size={30}  name="logout" />}
                     onPress={() => logoutAlert()}/>
          <Divider />
        </List.Section>



      </View>


    </View>

  );
}

const styles = StyleSheet.create(
  {
    container: {
      height: "45%"
    },
    other: {

    },
    headerCard: {
      flexDirection:'row',
      paddingTop:80,
      paddingLeft:30
    },
    icon: {
      width:40,
      height:40
    },
    header: {
      fontWeight: "bold",
      paddingTop: 7,
      fontSize: 23,
      color:"#6e4b4b"
    },
    avatar: {
      alignItems: "center",
      paddingTop: 80
    }
  }
);

export default ProfilePage;

