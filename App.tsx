import React from 'react';
import {WeatherHeader} from './src/components/WeatherHeader';
import {WeatherInfo} from './src/components/WeatherInfo';
import {Layout} from './src/hoc/Layout';

import {MainScreen} from './src/Screens/MainScreen';

const App = () => {
  return (
    <Layout>
      <WeatherHeader />
      <WeatherInfo />
    </Layout>
  );
};

export default App;
