/**
 * The function exports selectors for retrieving a single article and multiple articles from the state.
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    article: null,
    articles: null 
  };

const articlesSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, { payload }) => {
      state.article = payload;
    },
    
    setArticles: (state: any, { payload }) => {
        state.articles = payload.length > 0 ? [...payload] : null;
      },
 
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice.reducer;
