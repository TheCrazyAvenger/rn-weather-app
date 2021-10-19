import React from 'react';
import {WeatherHeader} from './src/components/WeatherHeader';
import {WeatherInfo} from './src/components/WeatherInfo';
import {Layout} from './src/hoc/Layout';

const App = () => {
  return (
    <Layout>
      <WeatherHeader />
      <WeatherInfo />
    </Layout>
  );
};

export default App;
