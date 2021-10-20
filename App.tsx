import React from 'react';
import {WeatherHeader} from './src/components/WeatherHeader';
import {WeatherInfo} from './src/components/WeatherInfo';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {MainScreen} from './src/screens/MainScreen';
import {AppNavigator} from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
