import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import InitialScreen from './src/screens/InitialScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SignInScreen from './src/screens/SignInScreen';
import LinkScreen from './src/screens/LinkScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';

const switchNavigator = createSwitchNavigator({
  userFlow: createBottomTabNavigator({
    Link: LinkScreen,
    Profile: ProfileScreen,
  }),
  loginFlow: createStackNavigator({
    Initial: InitialScreen,
    Register: RegisterScreen,
    SignIn: SignInScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
