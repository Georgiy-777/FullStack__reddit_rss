/**
 * The function `getIsAdmin` returns a boolean value indicating whether the user is an admin based on
 * the state object provided.
 */
import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosService } from '../apiService/axiosService';
import { redditArticleApi } from '../apiService/redditArticApi';
import { adminActions } from './auth.slice';

interface Admin {
    nickname: string;
    password: string;
}

interface ResponseType {
    token: string;
    user: {
        nickname: string;
    };
}

const admin = redditArticleApi.injectEndpoints({
    endpoints: builder => ({
        loginAdmin: builder.mutation<Admin, any>({
            queryFn: async (options, { dispatch }) => {
                try {
                    const { data } = await axiosService.post(`/login`, {
                        nickname: options.nickname,
                        password: options.password,
                    });
                    dispatch(adminActions.setIsAdmin(true));
                    localStorage.setItem('token', data.token);
                    return { data: data };
                } catch (error: any) {
                    if (
                        error.response.data.status === 400 ||
                        error.response.data.status === 404
                    ) {
                        alert(error.response.data.message);
                    }
                    return {
                        error: error.message || 'An unknown error occurred',
                    };
                }
            },
            invalidatesTags: ['admin'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginAdminMutation } = admin;

export default admin;
