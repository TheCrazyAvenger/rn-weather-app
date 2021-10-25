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

const handlers = {
  [FETCH_WEATHER]: (
    state: IWeatherState,
    {data, latitude, longitude, weekWeather, nightWeather}: any,
  ) => ({
    ...state,
    data,
    latitude,
    longitude,
    weekWeather,
    nightWeather,
  }),
  [TOGGLE_LOADING]: (state: IWeatherState) => ({
    ...state,
    loader: !state.loader,
  }),
  [SHOW_ERROR]: (state: any, {error}: {error: string}) => ({
    ...state,
    error,
  }),
  [CLEAR_ERROR]: (state: IWeatherState) => ({
    ...state,
    error: null,
  }),

  DEFAULT: (state: IWeatherState) => state,
};

export const weatherReducer = (
  state = initialState,
  action: WeatherAction,
): IWeatherState => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
