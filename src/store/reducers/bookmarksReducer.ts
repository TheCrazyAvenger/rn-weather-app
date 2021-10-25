import {BOOK_HANDLER} from '../actions/actionTypes';
import {BooksAction, IBookmarks, IBooksState} from '../types/bookmarks';

const initialState: IBooksState = {
  bookmarks: null,
};

const handlers = {
  [BOOK_HANDLER]: (
    state: IBooksState,
    {bookmarks}: {bookmarks: Array<IBookmarks> | null},
  ) => ({
    ...state,
    bookmarks,
  }),
  DEFAULT: (state: IBooksState) => state,
};

export const bookmarksReducer = (
  state = initialState,
  action: BooksAction,
): IBooksState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
