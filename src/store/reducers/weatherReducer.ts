import {
  CLEAR_ERROR,
  FETCH_WEATHER,
  SHOW_ERROR,
  TOGGLE_LOADING,
} from '../actions/actionTypes';
import {IWeatherState, WeatherAction} from '../types/weather';

const initialState: IWeatherState = {
  data: null,
  loader: true,
  error: null,
  latitude: 0,
  longitude: 0,
  weekWeather: null,
  nightWeather: null,
};

export const weatherReducer = (
  state = initialState,
  action: WeatherAction,
): IWeatherState => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        data: action.data,
        latitude: action.latitude,
        longitude: action.longitude,
        weekWeather: action.weekWeather,
        nightWeather: action.nightWeather,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loader: !state.loader,
      };
    case SHOW_ERROR:
      return {...state, error: action.error};
    case CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};
