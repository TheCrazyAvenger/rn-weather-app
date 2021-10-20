import axios from 'axios';
import {Dispatch} from 'redux';
import {
  CLEAR_ERROR,
  FETCH_WEATHER,
  SHOW_ERROR,
  TOGGLE_LOADING,
} from './actionTypes';

export const fetchWeather = (lat?: number, lon?: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(clearError());
    try {
      const responce = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=51.5073&lon=-0.1277&units=metric&appid=7fb17b0400480080f824b5827af64eca`,
      );

      const data: any = responce.data;
      const {list} = data;

      const weekWeather = getWeather(list, 12);
      const nightWeather = getWeather(list, 3);

      dispatch({
        type: FETCH_WEATHER,
        data,
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

const getWeather = (list: Array<any>, time: number) => {
  const newList: Array<object> = [];
  const days = list;

  days.map(item => {
    const date = new Date(item['dt_txt']);
    const hour = date.getHours();
    if (hour === time) newList.push(item);
  });

  return newList;
};
