import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {styles} from './InitialScreen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default function LinkScreen() {
  const [profile, setProfile] = useState('');
  async function getOwnData() {
    let response = await firestore()
      .collection('users')
      .doc(await AsyncStorage.getItem('id'))
      .get()
      .catch((err) => console.log(err));
    let {area, help, role} = response.data();
    firestore()
      .collection('users')
      .where('role', '==', 'Isolated Person')
      .where('area', '==', area)
      .where('help', '==', help)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          if (!profile) {
            setProfile(doc.data());
          }
        });
      })
      .catch((err) => console.log(err));
  }
  getOwnData();
  let {area, name, help} = profile;
  return (
    <View style={styles.container}>
      <Text style={styles.text} h3>
        {profile
          ? `${name} in ${area} needs help with ${help}`
          : 'No one in your area needs help right now!'}
      </Text>
      {profile ? <Button style={styles.button} title="Contact?" /> : null}
    </View>
  );
}
