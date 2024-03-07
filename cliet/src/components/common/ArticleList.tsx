import * as React from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { CardMedia, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArticleEdit from '../../components/common/ArticleEdit';
import adminSelectors from '@/store/auth/auth.selector';
import articlesSelectors from '@/store/article/article.selector';
import { useLazyGetAllArticlesQuery } from '@/store/article/article.api';
import { ST } from 'next/dist/shared/lib/utils';

type IArticle = {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    content: string;
    contentSnippet: string;
    _id: string;
    isoDate: string;
};
const diffTime = (iso: string) => {
    const isoDate = new Date(iso);
    const dayIsoDate = isoDate.getDate();
    const hoursIsoDate = isoDate.getHours();
    const dateNow = new Date();
    let diffDay = dateNow.getDate() - dayIsoDate;
    let diffHours = dateNow.getHours() - hoursIsoDate;

    if (diffHours <= 0) {
        return `${diffDay} days ago`;
    } else if (diffDay <= 0) {
        return `${diffHours} hour ago`;
    } else {
        return `${diffHours} hour ${diffDay} days ago`;
    }
};

const ArticleList = () => {
    const [getAllArticles] = useLazyGetAllArticlesQuery();
    const articleList = useSelector(articlesSelectors.getArticles());
    React.useEffect(() => {
        getAllArticles(null, true);
    }, []);
    const isAdmin = useSelector(adminSelectors.getIsAdmin());
    return (
        <Grid item mb={'50px'} xs={12} md={!isAdmin ? 12 : 7}>
            {articleList && articleList?.length > 0 ? (
                articleList?.map((item: IArticle) => (
                    <Box
                        key={item?._id}
                        borderTop={'1px solid #ddd'}
                        py={'10px'}
                    >
                        <Stack
                            direction={'column'}
                            spacing={'2'}
                            flexGrow={1}
                            alignItems={'start'}
                            position={'relative'}
                            height={'133px'}
                            pr={'30px'}
                        >
                            {isAdmin && <ArticleEdit item={item} />}
                            <Stack direction={'row'} gap={2} mb={'20px'}>
                                <Typography
                                    variant="overline"
                                    component={'span'}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item?.author}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component={'span'}
                                    color={'#faa957'}
                                >
                                    {diffTime(item?.pubDate)}
                                </Typography>
                            </Stack>

                            <Typography
                                target="_blank"
                                component={'a'}
                                href={item?.link}
                                sx={{
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    color: 'black',
                                    ':hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                {item?.title}
                            </Typography>
                        </Stack>
                    </Box>
                ))
            ) : (
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100%'}
                    spacing={3}
                >
                    <Typography
                        variant="h1"
                        color={'#faa957'}
                        fontSize={'2rem'}
                    >
                        {' '}
                        Some waiting...
                    </Typography>
                </Stack>
            )}
        </Grid>
    );
};

export default ArticleList;
