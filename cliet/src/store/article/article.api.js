import { axiosService } from '../apiService/axiosService';
import { redditArticleApi } from '../apiService/redditArticApi';
import { articlesActions } from './article.slice';

const article = redditArticleApi.injectEndpoints({
    endpoints: builder => ({
                /* The `getAllArticles` function is defining a query endpoint using the `builder.query` method. This
        endpoint is responsible for fetching all articles, optionally sorted based on the `sort` parameter,
        by sending a GET request to the `/article` endpoint. Here's a breakdown of what the function is
        doing: */
        getAllArticles: builder.query({
            queryFn: async (sort = null, { dispatch }) => {
                try {
                    let url = `/article`;
                    if (sort) {
                        url = `/article?sort=${sort}`;
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

                /* The `createArticle` function is defining a mutation endpoint using the `builder.mutation` method.
        This endpoint is responsible for creating a new article by sending a POST request to the `/article`
        endpoint with the provided `incomeData`. Here's a breakdown of what the function is doing: */
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

                /* This code snippet defines an endpoint called `updateArticle` in the `article` API. It is using the
        `builder.mutation` method to create a mutation function that allows updating an article. */
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
            /* The `deleteArticle` function is defining a mutation endpoint using the `builder.mutation` method.
This endpoint is responsible for deleting an article based on the provided `incomeData`, which
likely contains the ID of the article to be deleted. */
        }),

                /* The `deleteArticle` function is defining a mutation endpoint using the `builder.mutation` method.
        This endpoint is responsible for deleting an article based on the provided `incomeData`, which
        likely contains the ID of the article to be deleted. */
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
