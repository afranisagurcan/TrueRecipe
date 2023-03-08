import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import auth from "@react-native-firebase/auth";
import styles from '../styles/login'
import ILogin from "../utils/types/login.type";

function LogInPage(): JSX.Element {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<any>();

  const loginUser =  ({email, password}: ILogin.LoginKey) => {

    auth().signInWithEmailAndPassword(email, password).then( () =>
      navigation.navigate("UserPage")
    ).catch(error => {
      console.error(error);
    });

  };

  return (
    <View>
      <Text style={styles.textLogIn}>LOGIN</Text>
      <View style={styles.inputArea}>
        <Text style={styles.textHeader}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={newValue => setEmail(newValue)}
        />
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
          <Pressable onPress={handlePasswordVisibility} >
            <Icon name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>


      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => loginUser({ email, password })}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.page}>
        <Text>Don't have an account?  </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("SignUpPage")}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
    );
}

export default LogInPage;

