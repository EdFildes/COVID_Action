import React, {createContext, useReducer} from 'react';

export default (reducer, actions, defaultVal) => {
  const Context = createContext();

  const Provider = ({children}) => {
    const [state, dispach] = useReducer(reducer, defaultVal);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispach);
    }

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};
