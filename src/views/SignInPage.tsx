import React, { useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/signin_css";
import Icon from "react-native-vector-icons/Entypo";
import ILogin from "../utils/types/login.type";

function SignInPage(): JSX.Element {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const image = require("../../Food.png");
  const navigation = useNavigation<any>();

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }} style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.background}>

          <View style={styles.inputArea}>
            <Text style={styles.textHeader}>Email</Text>
            <TextInput style={styles.text} value={email} onChangeText={newValue => setEmail(newValue)} />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.textHeader}>Password</Text>
            <View style={styles.passwordArea}>
              <TextInput
                style={styles.textInputPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={password}
                enablesReturnKeyAutomatically
                onChangeText={newValue => setPassword(newValue)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Icon name={rightIcon} size={22} color="#232323" />
              </Pressable>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => (authUser({ email, password }))}>
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

const authUser = ({email, password}: ILogin.LoginKey) => {

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

export default SignInPage;
