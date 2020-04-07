import React, {useState, useContext} from 'react';
import {Context as authContext} from './../context/AuthContext';
import {Input, Button, Text} from 'react-native-elements';
import {styles} from './InitialScreen';

export default function SignInScreen() {
  const {state, signIn} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Text h2 style={styles.text}>
        Sign In
      </Text>
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
      <Button
        style={styles.button}
        title="Sign In"
        onPress={() => signIn({email, password})}
      />
      <Text>{state.errorMsg}</Text>
    </>
  );
}
