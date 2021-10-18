import React from 'react';
import {WeatherHeader} from '../components/WeatherHeader';
import {WeatherInfo} from '../components/WeatherInfo';

export const MainScreen: React.FunctionComponent = () => {
  return (
    <>
      <WeatherHeader />
      <WeatherInfo />
    </>
  );
};
