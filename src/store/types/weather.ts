import {
  CLEAR_ERROR,
  FETCH_WEATHER,
  SHOW_ERROR,
  TOGGLE_LOADING,
} from '../actions/actionTypes';

export interface IWeatherState {
  data: any;
  loader: boolean;
  error: string | null;
  latitude: number;
  longitude: number;
}

interface FetchWeather {
  type: typeof FETCH_WEATHER;
  data: any;
  loader: boolean;
  latitude: number;
  longitude: number;
}

interface ToggleLoading {
  type: typeof TOGGLE_LOADING;
  loader: boolean;
}

interface ShowError {
  type: typeof SHOW_ERROR;
  error: string;
}

interface ClearError {
  type: typeof CLEAR_ERROR;
  error: null;
}

export type WeatherAction =
  | FetchWeather
  | ToggleLoading
  | ShowError
  | ClearError;
