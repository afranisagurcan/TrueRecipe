import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import auth from '@react-native-firebase/auth';
import ILogin from '../utils/types/login.type';

function LogInForm(): JSX.Element {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  const loginUser = ({ email, password }: ILogin.LoginKey) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        navigation.navigate('Home', {
          email: cred.user.email,
          userId: cred.user.uid,
        });
      })
      .catch(error => {
      });
  };

  const handleEmailChange = () => {
    if (email.trim() === '') {
      setEmailError('Email is required.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required.');
    } else if (password.trim().length < 8) {
      setPasswordError('Password must be at least 8 characters.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <View>
      <Text style={styles.textLogIn}>LOGIN</Text>
      <View style={styles.inputArea}>
        <Text style={styles.textHeader}>Email</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
          value={email}
          onChangeText={newValue => setEmail(newValue)}
          onBlur={handleEmailChange}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.textHeader}>Password</Text>

        <View style={styles.passwordArea}>
          <TextInput
            style={styles.textInputPassword}
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            value={password}
            onChangeText={newValue => setPassword(newValue)}
            onBlur={() => {
              handlePasswordChange();
            }}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <Icon name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>
        {passwordError && <Text style={styles.error}> {passwordError}</Text>}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => loginUser({ email, password })}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.page}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SignInPage')}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLogIn: {
    color: '#6e4b4b',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  textHeader: {
    fontSize: 22,
    color: '#6e4b4b',
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.9,
    color: 'black',
    fontSize: 20,
    padding: 15,
  },
  passwordArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.9,
    color: 'black',
    padding: 15,
  },
  textInputPassword: {
    flexGrow: 1,
    fontSize: 22,
  },
  loginButton: {
    backgroundColor: '#6e4b4b',
    padding: 20,
    borderRadius: 15,
    width: '50%',
    alignSelf: 'center',
    margin: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  page: {
    flexDirection: 'row',
    marginLeft: 80,
  },
  error: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
    padding: 5,
  },
});

export default LogInForm;

