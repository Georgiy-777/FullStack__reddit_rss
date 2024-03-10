/**
 * The above TypeScript code defines two selector functions for retrieving a single article and
 * multiple articles from the state object.
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { redditArticleApi } from './apiService/redditArticApi';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
import articleSlice from './article/article.slice';
import authSlice from './auth/auth.slice';

const authPersistConfig = {
    key: "admin",
    storage,
    whitelist: ["isAdmin"],

  };


  const rootReducer = combineReducers({
    admin: persistReducer(authPersistConfig, authSlice),
    article: articleSlice,
        [redditArticleApi.reducerPath]: redditArticleApi.reducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(redditArticleApi.middleware),
    devTools: true,
  });


  export const persistor = persistStore(store);
/* The line `import { createSlice } from '@reduxjs/toolkit';` is importing the `createSlice` function
from the Redux Toolkit library. This function is used to create a slice of the Redux state, which
includes the initial state, reducers, and actions related to a specific part of the state. It helps
in simplifying the process of defining Redux logic by providing a more concise syntax compared to
traditional Redux. */

export default store;
