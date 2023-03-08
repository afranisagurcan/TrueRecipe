import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
function SignUpPage(): JSX.Element {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const image = require("../../Food.png");
  const navigation = useNavigation<any>();

  return (
    <ScrollView  automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }} style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.background}>
          <View style={styles.inputArea}>
            <Text style={styles.textHeader}>Email</Text>
            <TextInput
              style={styles.text}
              value={email}
              onChangeText={newValue => setEmail(newValue)}
            />
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.textHeader}>Password</Text>
            <TextInput
              style={styles.text}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={password}
              enablesReturnKeyAutomatically
              onChangeText={newValue => setPassword(newValue)}
            />

          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => (authUser(email, password))}
                           >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.page}>
            <Text>Already a member?  </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("WelcomePage")}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Login</Text>
              </View>

            </TouchableOpacity>
          </View>


        </View>

      </ImageBackground>

    </ScrollView>);

}

const authUser = (email: any, password: any) => {

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "50%"
  },
  background: {
    height: "50%",
    backgroundColor: "#00000000"
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15
  },
  textHeader: {
    fontSize: 22,
    color: "#439b3e",
    fontWeight: "bold",
    paddingVertical: 20
  },
  text: {
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    fontSize: 22,
    padding: 15
  },
  buttonAreaView: {
    padding: 25,
    alignItems: "center"
  },
  buttonArea: {
    alignItems: "center",
    backgroundColor: "#00000000",
    borderRadius: 15,
    width: "50%",
    padding: 10
  },
  page: {
    flexDirection: "row",
    alignSelf:'center'
  },
  loginButton: {
    backgroundColor: "#439b3e",
    padding: 20,
    borderRadius:15,
    width:'50%',
    alignSelf:'center',
    margin:20,
  },
  loginButtonText:{
    textAlign:'center',
    fontSize: 20,
    fontWeight: "bold",
    color:'white',

  },

});
export default SignUpPage;
