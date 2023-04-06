import React, {FC, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';
import IInput from '../utils/types/input.type';

const InputGroup: FC<IInput.InputGroupProps> = ({
  label,
  contentContainerStyle,
  ...props
}) => {
  return (
    <View style={contentContainerStyle}>
      {label ? <Text style={styles.inputHeader}>{label}</Text> : null}
      <TextInput
        style={styles.inputText}
        mode={'outlined'}
        activeOutlineColor={'#003c4c'}
        {...props}
      />
    </View>
  );
};

function AddRecipe(): JSX.Element {
  const [recipeName, setRecipeName] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');

  const ref = firestore().collection('recipes');

  const route = useRoute<any>();
  const userId = route.params.userId;

  async function addRecipe() {
    await ref.add({
      recipeName: recipeName,
      time: time,
      description: description,
      ingredients: ingredients,
      image: image,
      rating: rating,
      publisherId: userId,
    });
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}>
      <View style={styles.headerBox}>
        <Icon name={'restaurant-menu'} size={25} color="#084149" />
        <Text style={styles.headerText}> NEW RECIPE</Text>
      </View>

      <View style={{alignContent: 'center'}}>
        <View style={styles.inputArea}>
          <InputGroup
            contentContainerStyle={{paddingLeft: 10}}
            label="Recipe's Name"
            value={recipeName}
            onChangeText={setRecipeName}
            multiline={true}
          />

          <InputGroup
            contentContainerStyle={{paddingLeft: 10}}
            label="Recipe's Description"
            value={description}
            onChangeText={setDescription}
          />

          <InputGroup
            contentContainerStyle={{paddingLeft: 10}}
            label="Recipe's Ingredients"
            value={ingredients}
            onChangeText={setIngredients}
          />

          <InputGroup
            contentContainerStyle={{paddingLeft: 10}}
            label="Recipe's Image"
            value={image}
            onChangeText={setImage}
          />
        </View>

        <View style={styles.inputArea2}>
          <InputGroup
            contentContainerStyle={{width: '50%'}}
            label="Recipe's Rating"
            value={rating}
            mode={'outlined'}
            onChangeText={setRating}
            activeOutlineColor={'#003c4c'}
          />
          <InputGroup
            contentContainerStyle={{paddingLeft: 10, width: '50%'}}
            label="Recipe's Time"
            value={time}
            mode={'outlined'}
            onChangeText={setTime}
            activeOutlineColor={'#003c4c'}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => addRecipe()}>
        <View style={styles.button}>
          <Icon name={'add-box'} size={25} />
          <Text style={styles.buttonText}> SHARE YOUR RECIPE </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  headerBox: {
    borderColor: '#003c4c',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#a0d1d7',
    borderRadius: 15,
    padding: 25,
    alignSelf: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    fontStyle: 'italic',
    color: '#003c4c',
  },
  inputArea: {
    margin: 20,
    width: '90%',
  },
  inputHeader: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#003c4c',
  },
  inputText: {
    backgroundColor: '#dcd8d8',
    color: 'black',
    fontSize: 15,
  },
  inputArea2: {
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
    width: '90%',
    flex: 2,
    flexDirection: 'row',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#a0d1d7',
    borderRadius: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#003c4c',
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
    color: '#084149',
    paddingTop: 3,
  },
});

export default AddRecipe;

