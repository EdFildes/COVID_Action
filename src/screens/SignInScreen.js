import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SignInScreen({navigation}) {
  return (
    <View>
      <Text>Sign in please...</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('User')} />
    </View>
  );
}
