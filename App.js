import React from 'react';

import Navigation from './lib/navigation/Navigation';

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import store from './lib/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
