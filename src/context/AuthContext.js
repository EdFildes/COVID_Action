import firebaseAPI from './../api/firebase';
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage'

const authReducer = (state, actions) => {
    switch (actions.type){
        case "add_Error": {
            return {...state, errorMsg: actions.payload}
        }
        case "register": {
            return {token: actions.payload, errorMsg: ''}
        }
        default: 
            return state;
    }
}

const register = dispach => async ({email, password}) => {
    console.log({email, password})
    /*
    try{
        const response = await firebaseAPI.post('/accounts:signUp', { email, password })
        await AsyncStorage.setItem('token', response.data.idToken)
        dispach({type: "register", payload: response.data.idToken})
    } catch(err){
        dispach({type: "add_Error", payload: "an error occurred dude..."})
    }
    */
}

const signIn = (dispach) => {
    return () => {
        
    }
}

const signOut = (dispach) => {
    return () => {
        
    }
}

export const {Context, Provider} = createDataContext(
    authReducer, 
    {register, signIn, signOut}, 
    { token: null, errorMsg: '' } 
);


