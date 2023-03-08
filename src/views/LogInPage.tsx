import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

function LogInPage(): JSX.Element {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<any>();

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
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("UserPage")}>
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
  loginButton: {
    backgroundColor: "#6e4b4b",
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
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7'
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  textHeader: {
    fontSize: 22,
    color: "#6e4b4b",
    fontWeight: "bold",
    paddingVertical: 20
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    fontSize: 20,
    padding: 15,
  },
  textInputPassword: {
    flexGrow: 1,
    fontSize: 22
  },
  buttonAreaView: {
    padding: 25,
    alignItems: "center"
  },
  buttonArea: {
    alignItems: "center",
    backgroundColor: "#00000000",
    width: "100%"
  },
  textLogIn: {
    color: "#6e4b4b",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  page: {
    flexDirection: "row",
    marginLeft:80,
  },

  passwordArea: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    padding: 15,

  },

});
export default LogInPage;

