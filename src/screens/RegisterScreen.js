import React, {useState, useContext} from 'react';
import {Context as authContext} from './../context/AuthContext';
import {Input, Button, Text} from 'react-native-elements';

export default function RegisterScreen() {
  const {state, register} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Text h2>Register to volunteer</Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
      />
      <Input
        secureTextEntry
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
      />
      <Button title="Register" onPress={() => register({email, password})} />
      <Text>{state.errorMsg}</Text>
    </>
  );
}
