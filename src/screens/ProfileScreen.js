import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen() {
  //  may need to create a new context for later ...  obviously not this exact one but similar
  // const { state, register } = useContext(authContext)
  const ref = firestore().collection('users');
  const [test, setTest] = useState('');

  function addUser() {
    ref.add({
      test,
    });
    console.log(test);
    setTest('');
  }

  return (
    <View>
      <Text h2>Edit Profile</Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Test"
        value={test}
        onChangeText={(newTest) => setTest(newTest)}
      />
      <Button title="Submit" onPress={addUser} />
    </View>
  );
}
