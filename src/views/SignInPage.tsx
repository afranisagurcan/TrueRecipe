import React, {FC, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTogglePasswordVisibility} from '../hooks/useTogglePasswordVisibility';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import ISignIn from '../utils/types/signin.type';
import firestore from '@react-native-firebase/firestore';
import IGroupInput from '../utils/types/input.type';

const ref = firestore().collection('users');

function authAndStoreUser({name, surname, email, password}: ISignIn.SignInKey) {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return ref.doc(cred.user.uid).set({
        name: name,
        surname: surname,
        email: email,
        password: password,
      });
    })
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

const InputGroup: FC<IGroupInput.InputGroupProps> = ({
  label,
  contentContainerStyle,
  ...props
}) => {
  return (
    <View style={contentContainerStyle}>
      {label ? <Text style={styles.textHeader}>{label}</Text> : null}
      <TextInput
        autoCorrect={false}
        style={styles.inputText}
        mode={'outlined'}
        activeOutlineColor={'#439b3e'}
        {...props}
      />
    </View>
  );
};

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const image = require('../../Food.png');
  const navigation = useNavigation<any>();

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
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{flex: 1}}
      style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.background}>
          <View style={styles.inputArea}>
            <InputGroup
              label={'Name'}
              value={name}
              onChangeText={newValue => setName(newValue)}
            />

            <InputGroup
              label={'Surname'}
              value={surname}
              onChangeText={newValue => setSurname(newValue)}
            />

            <InputGroup
              label={'Email'}
              value={email}
              autoCapitalize="none"
              onChangeText={newValue => setEmail(newValue)}
              onBlur={handleEmailChange}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}

            <InputGroup
              label={'Password'}
              value={password}
              onChangeText={newValue => setPassword(newValue)}
              onBlur={handlePasswordChange}
              contentContainerStyle={styles.textInputPassword}
              secureTextEntry={passwordVisibility}
              right={
                <TextInput.Icon
                  onPress={handlePasswordVisibility}
                  icon={rightIcon}
                  size={22}
                  color="#232323"
                />
              }
            />
            {passwordError && <Text style={styles.error}> {passwordError}</Text>}

          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              authAndStoreUser({name, surname, email, password});
            }}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.page}>
            <Text>Already a member? </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('WelcomePage')}>
              <View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end',
    height: '35%',
  },
  background: {
    height: '65%',
    backgroundColor: '#00000000',
  },
  inputText: {
    backgroundColor: '#00000000',
    color: 'black',
    fontSize: 15,
  },
  inputArea: {
    paddingHorizontal: 15,
  },
  textHeader: {
    paddingTop: 20,
    fontSize: 15,
    color: '#439b3e',
    fontWeight: 'bold',
  },

  text: {
    borderRadius: 15,
    opacity: 0.9,
    color: 'black',
    fontSize: 22,
    padding: 15,
  },
  passwordArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    opacity: 0.9,
  },
  textInputPassword: {
    backgroundColor: '#00000000',
    flexGrow: 1,
    fontSize: 22,
  },
  loginButton: {
    backgroundColor: '#439b3e',
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
    alignSelf: 'center',
  },
  error: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
    padding: 5,
  },
});

export default SignInPage;
