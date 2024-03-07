import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosService } from '../apiService/axiosService';
import { redditArticleApi } from '../apiService/redditArticApi';
import articlesSelectors from './article.selector';
import { articlesActions } from './article.slice';


const article = redditArticleApi.injectEndpoints({
    endpoints: builder => ({

        getAllArticles: builder.query({
            queryFn: async (sort=null, { dispatch }) => {
                try {
                  let url = `/article`
                  if(sort) {
                     url = `/article?sort=${sort}`
                    
                  }
                  const { data } = await axiosService.get(url);

                    if (data) {
                        dispatch(articlesActions.setArticles(data));
                    } else {
                        dispatch(articlesActions.setArticles(null));
                    }
                    return { data };
                } catch (error) {
                    return {
                        error: error.message || 'An unknown error occurred',
                    };
                }
            },
            providesTags: ['article'],
        }),

        createArticle: builder.mutation({
            async queryFn(incomeData, { dispatch }) {
                try {
                    const { data } = await axiosService.post(
                        `/article`,
                        incomeData,
                    );
                    if (data) {
                        dispatch(articlesActions.setArticle(data));
                    }
                    return { data };
                } catch (error) {
                    return {
                        error: error?.message || 'An unknown error occurred',
                    };
                }
            },
            invalidatesTags: ['article'],
        }),

        updateArticle: builder.mutation({
            async queryFn(incomeData, { dispatch }) {
                try {
                    const { data } = await axiosService.put(
                        `/article/${incomeData._id}`,
                        incomeData,
                    );

                    return { data };
                } catch (error) {
                    return {
                        error: error?.message || 'An unknown error occurred',
                    };
                }
            },
            invalidatesTags: ['article'],
        }),

        deleteArticle: builder.mutation({
            async queryFn(incomeData, { dispatch }) {
                try {
                    const { data } = await axiosService.delete(
                        `/article/${incomeData.id}`,
                    );

                    return { data: true };
                } catch (error) {
                    return {
                        error: error?.message || 'An unknown error occurred',
                    };
                }
            },
            invalidatesTags: ['article'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateArticleMutation,
    useLazyGetAllArticlesQuery,
    useDeleteArticleMutation,
    useUpdateArticleMutation,
} = article;

export default article;
