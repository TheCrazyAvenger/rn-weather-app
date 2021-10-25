import {combineReducers} from 'redux';
import {bookmarksReducer} from './bookmarksReducer';
import {weatherReducer} from './weatherReducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  bookmarks: bookmarksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
