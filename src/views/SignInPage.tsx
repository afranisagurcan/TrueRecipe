import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import ISignIn from "../utils/types/signin.type";
import firestore from "@react-native-firebase/firestore";


const ref = firestore().collection("users");

function authAndStoreUser({ name, surname, email, password }: ISignIn.SignInKey) {
  auth().createUserWithEmailAndPassword(email, password).then(
    cred => {
      return ref.doc(cred.user.uid).set({
        name: name,
        surname:surname,
        email:email,
        password:password
      });
    }
  ).then(() => {
    console.log("User account created & signed in!");
  })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });

}


function SignInPage(): JSX.Element {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const image = require("../../Food.png");
  const navigation = useNavigation<any>();

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }} style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.background}>

          <View style={styles.inputArea}>
            <Text style={styles.textHeader}>Name</Text>
            <TextInput style={styles.inputText} mode={"outlined"} activeOutlineColor={"#439b3e"} value={name}
                       onChangeText={newValue => setName(newValue)} />
            <Text style={styles.textHeader}>Surname</Text>
            <TextInput style={styles.inputText} mode={"outlined"} activeOutlineColor={"#439b3e"} value={surname}
                       onChangeText={newValue => setSurname(newValue)} />
            <Text style={styles.textHeader}>Email</Text>
            <TextInput style={styles.inputText} mode={"outlined"} activeOutlineColor={"#439b3e"} value={email}
                       onChangeText={newValue => setEmail(newValue)} />
            <Text style={styles.textHeader}>Password</Text>
            <TextInput style={styles.textInputPassword} mode={"outlined"} activeOutlineColor={"#439b3e"}
                       secureTextEntry={passwordVisibility} value={password} right={<TextInput.Icon icon="eye" />}
                       onChangeText={newValue => setPassword(newValue)} />
          </View>


          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            authAndStoreUser({ name, surname, email, password });
          }}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.page}>
            <Text>Already a member? </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("WelcomePage")}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </ImageBackground>

    </ScrollView>);

}

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "35%"
  },
  background: {
    height: "65%",
    backgroundColor: "#00000000"
  },
  inputText: {
    backgroundColor: "#00000000",
    color: "black",
    fontSize: 15
  },
  inputArea: {
    marginLeft: 10,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  textHeader: {
    paddingTop: 20,
    fontSize: 15,
    color: "#439b3e",
    fontWeight: "bold"
  },
  text: {
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    fontSize: 22,
    padding: 15
  },
  passwordArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 15,
    opacity: 0.9,
    padding: 15
  },
  textInputPassword: {
    backgroundColor: "#00000000",
    flexGrow: 1,
    fontSize: 22
  },
  loginButton: {
    backgroundColor: "#439b3e",
    padding: 20,
    borderRadius: 15,
    width: "50%",
    alignSelf: "center",
    margin: 20
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  page: {
    flexDirection: "row",
    alignSelf: "center"
  }

});


export default SignInPage;
