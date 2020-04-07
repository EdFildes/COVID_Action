import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-elements';

export default function InitialScreen({navigation}) {
  return (
    <View>
      <Text h1>COVID Community Action</Text>
      <Button
        title="register"
        onPress={() => navigation.navigate('Register')}
      />
      <Text onPress={() => navigation.navigate('SignIn')} h3>
        Already registered? Sign in by clicking this text
      </Text>
    </View>
  );
}
