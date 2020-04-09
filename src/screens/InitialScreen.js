import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';

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
  return (
    <View style={styles.container}>
      <Text h1 style={styles.text}>
        COVID Community Action
      </Text>
      <Button
        style={styles.button}
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        style={styles.button}
        title="sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}
