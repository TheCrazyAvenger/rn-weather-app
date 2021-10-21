import axios from 'axios';
import {Dispatch} from 'redux';
import {getWeather} from '../../utitlites/utilities';
import {
  CLEAR_ERROR,
  FETCH_WEATHER,
  SHOW_ERROR,
  TOGGLE_LOADING,
} from './actionTypes';

export const fetchWeather = (lat: number = 51.5073, lon: number = -0.1277) => {
  return async (dispatch: Dispatch) => {
    dispatch(clearError());
    try {
      const responce = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7fb17b0400480080f824b5827af64eca`,
      );

      const data: any = await responce.data;

      const weekWeather = getWeather(data.list, 15, 'time');
      const nightWeather = getWeather(data.list, 3, 'time');

      const {lat: latitude, lon: longitude} = data.city.coord;

      dispatch({
        type: FETCH_WEATHER,
        data,
        latitude,
        longitude,
        weekWeather,
        nightWeather,
      });
    } catch (e) {
      dispatch(showError('Something went wrong...'));
      console.log(e);
    } finally {
      dispatch(toggleLoading());
    }
  };
};

export const toggleLoading = () => {
  return {type: TOGGLE_LOADING};
};

const showError = (error: string) => {
  return {type: SHOW_ERROR, error};
};

const clearError = () => {
  return {type: CLEAR_ERROR};
};
