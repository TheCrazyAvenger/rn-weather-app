import {BOOK_HANDLER} from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import {IBookmarks} from '../types/bookmarks';

export const addBookmarks = (
  name: string,
  id: number,
  lat: number,
  lon: number,
) => {
  return async (dispatch: Dispatch) => {
    try {
      let names: any = await AsyncStorage.getItem('names');

      if (!names) {
        names = [];
      } else {
        names = JSON.parse(names);
      }

      const city = {name, id, lat, lon};

      names.push(city);

      await AsyncStorage.setItem('names', JSON.stringify(names));

      dispatch({
        type: BOOK_HANDLER,
        bookmarks: names,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchBooks = () => {
  return async (dispatch: Dispatch) => {
    try {
      let names: any = await AsyncStorage.getItem('names');

      if (names) {
        names = JSON.parse(names);
        dispatch({
          type: BOOK_HANDLER,
          bookmarks: names,
        });
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeBookmark = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let names: any = await AsyncStorage.getItem('names');

      names = JSON.parse(names);

      const newList = names.filter((item: IBookmarks) => item.name !== name);

      await AsyncStorage.setItem('names', JSON.stringify(newList));

      dispatch({
        type: BOOK_HANDLER,
        bookmarks: newList,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
