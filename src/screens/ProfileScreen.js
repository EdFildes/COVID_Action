import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Text} from 'react-native-elements';
import {styles} from './InitialScreen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default function ProfileScreen() {
  const ref = firestore().collection('users');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('');
  const [help, setHelp] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    async function initialiseData() {
      let response = await firestore()
        .collection('users')
        .doc(await AsyncStorage.getItem('id'))
        .get();
      setArea(await response.data().area);
      setRole(await response.data().role);
      setHelp(await response.data().help);
      setName(await response.data().name);
    }
    initialiseData();
  }, []);

  async function updateInfo() {
    ref
      .doc(await AsyncStorage.getItem('id'))
      .set({role, area, name, help}, {merge: true});
  }

  return (
    <View style={styles.container}>
      <Text h2 style={styles.text}>
        Edit Profile
      </Text>
      <Text h4>Name</Text>
      <TextInput
        style={pickerSelectStyles.inputIOS}
        autoCapitalize="none"
        autoCorrect={false}
        label="Name"
        value={name}
        onChangeText={(newName) => setName(newName)}
      />
      <Text h4>Role:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        label="Role"
        value={role}
        onValueChange={(newRole) => setRole(newRole)}
        items={[
          {label: 'Helper', value: 'Helper'},
          {label: 'Isolated Person', value: 'Isolated Person'},
        ]}
      />
      <Text h4>Area:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        label="Area"
        value={area}
        onValueChange={(newArea) => setArea(newArea)}
        items={[
          {label: 'BS1', value: 'BS1'},
          {label: 'BS2', value: 'BS2'},
          {label: 'BS3', value: 'BS3'},
          {label: 'BS4', value: 'BS4'},
          {label: 'BS5', value: 'BS5'},
          {label: 'BS6', value: 'BS6'},
        ]}
      />
      <Text h4>Need help with/ will help with:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        label="Help"
        value={help}
        onValueChange={(newHelp) => setHelp(newHelp)}
        items={[
          {label: 'Shopping', value: 'Shopping'},
          {label: 'Conversation', value: 'Conversation'},
        ]}
      />
      <Button style={styles.button} title="Submit" onPress={updateInfo} />
    </View>
  );
}
