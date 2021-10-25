import {BOOK_HANDLER} from '../actions/actionTypes';

export interface IBookmarks {
  name: string;
  id: number;
  lat: number;
  lon: number;
}

export interface IBooksState {
  bookmarks: Array<IBookmarks> | null;
}

interface AddBook {
  type: typeof BOOK_HANDLER;
  bookmarks: Array<IBookmarks> | null;
}

export type BooksAction = AddBook;
