import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {Context as authContext} from './../context/AuthContext';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  text: {
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 50,
  },
  button: {
    paddingTop: 50,
  },
  input: {
    textAlignVertical: 'top',
    paddingTop: 50,
  },
  warning: {
    color: 'red',
  },
});

export default function InitialScreen({navigation}) {
  const {clearError} = useContext(authContext);
  return (
    <View style={styles.container}>
      <Text h1 style={styles.text}>
        COVID Community Action
      </Text>
      <Button
        style={styles.button}
        title="Register"
        onPress={() => {
          clearError();
          navigation.navigate('Register');
        }}
      />
      <Button
        style={styles.button}
        title="sign In"
        onPress={() => {
          clearError();
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
}
