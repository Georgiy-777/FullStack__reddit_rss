import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const redditArticleApi = createApi({
  reducerPath: 'redditArticleApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: [
    'article',  
    'admin'  
  ],
  endpoints: builder => ({})
});


