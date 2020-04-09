import firebaseAPI from './../api/firebase';
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from './../navigationRef';
import firestore from '@react-native-firebase/firestore';

const authReducer = (state, actions) => {
  switch (actions.type) {
    case 'add_Error': {
      return {...state, errorMsg: actions.payload};
    }
    case 'register': {
      return {token: actions.payload, errorMsg: ''};
    }
    case 'signIn': {
      return {token: actions.payload, errorMsg: ''};
    }
    default:
      return state;
  }
};

const register = (dispach) => async ({email, password}) => {
  try {
    const response = await firebaseAPI.post('/accounts:signUp', {
      email,
      password,
    });
    await AsyncStorage.setItem('token', response.data.idToken);
    dispach({type: 'register', payload: response.data.idToken});
    console.log(response.data.localId);
    firestore()
      .collection('users')
      .doc(response.data.localId)
      .set({id: response.data.localId});
    await AsyncStorage.setItem('id', response.data.localId);
    navigate('userFlow');
  } catch (err) {
    dispach({type: 'add_Error', payload: err.message});
  }
};

const signIn = (dispach) => async ({email, password}) => {
  try {
    const response = await firebaseAPI.post('/accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    await AsyncStorage.setItem('token', response.data.idToken);
    dispach({type: 'signIn', payload: response.data.idToken});
    await AsyncStorage.setItem('id', response.data.localId);
    navigate('userFlow');
  } catch (err) {
    dispach({type: 'add_Error', payload: 'Invalid email/password combination'});
  }
};

const signOut = (dispach) => {
  return () => {};
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {register, signIn, signOut},
  {token: null, errorMsg: ''},
);
