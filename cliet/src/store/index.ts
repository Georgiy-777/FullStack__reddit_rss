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

export default store;
