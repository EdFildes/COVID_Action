import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from './../navigationRef';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const authReducer = (state, actions) => {
  switch (actions.type) {
    case 'add_Error': {
      return {...state, errorMsg: actions.payload};
    }
    case 'add_Token': {
      return {token: actions.payload, errorMsg: ''};
    }
    default:
      return state;
  }
};

const clearError = (dispach) => () => {
  dispach({type: 'add_Error', payload: ''});
};

const register = (dispach) => async ({email, password}) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);

    const idTokenResult = await auth().currentUser.getIdTokenResult();
    await AsyncStorage.setItem('token', idTokenResult.token);
    dispach({type: 'add_Token', payload: idTokenResult.token});
    // add a database entry for this user to create a profile with
    firestore()
      .collection('users')
      .doc(idTokenResult.claims.user_id)
      .set({id: idTokenResult.claims.user_id});
    await AsyncStorage.setItem('id', idTokenResult.claims.user_id);

    navigate('userFlow');
  } catch (err) {
    dispach({type: 'add_Error', payload: err.message});
  }
};

const signIn = (dispach) => async ({email, password}) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);

    const idTokenResult = await auth().currentUser.getIdTokenResult();
    await AsyncStorage.setItem('token', idTokenResult.token);
    dispach({type: 'add_Token', payload: idTokenResult.token});
    await AsyncStorage.setItem('id', idTokenResult.claims.user_id);
    navigate('userFlow');
  } catch (err) {
    dispach({type: 'add_Error', payload: err.message});
  }
};

const signOut = (dispach) => {
  return () => {};
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {register, signIn, signOut, clearError},
  {token: null, errorMsg: ''},
);
