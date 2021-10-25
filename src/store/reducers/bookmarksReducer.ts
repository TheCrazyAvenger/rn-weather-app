import {BOOK_HANDLER} from '../actions/actionTypes';
import {BooksAction, IBooksState} from '../types/bookmarks';

const initialState: IBooksState = {
  bookmarks: null,
};

export const bookmarksReducer = (
  state = initialState,
  action: BooksAction,
): IBooksState => {
  switch (action.type) {
    case BOOK_HANDLER:
      return {
        ...state,
        bookmarks: action.bookmarks,
      };
    default:
      return state;
  }
};
