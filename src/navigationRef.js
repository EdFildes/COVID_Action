import {NavigationActions} from 'react-navigation';

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  const navigationAction = NavigationActions.navigate({
    routeName,
    params,
  });
  navigator.dispatch(navigationAction);
};
