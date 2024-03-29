/**
 * The `ArticleList` component in TypeScript React renders a list of articles with options for editing
 * and displays a message if no articles are available.
 * @param {string} iso - The `iso` parameter in the `diffTime` function represents a date string in ISO
 * format. The function calculates the time difference between the provided ISO date and the current
 * date and returns a formatted string indicating how long ago the provided date was compared to the
 * current date.
 * @returns The `ArticleList` component is being returned. This component fetches a list of articles,
 * displays them in a grid layout, and includes functionality for editing articles if the user is an
 * admin. It also calculates and displays the time difference between the publication date of each
 * article and the current date. If there are articles in the list, they are displayed with their
 * title, content, publication date, and
 */
import { useLazyGetAllArticlesQuery } from '@/store/article/article.api';
import articlesSelectors from '@/store/article/article.selector';
import adminSelectors from '@/store/auth/auth.selector';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useSelector } from 'react-redux';
import ArticleEdit from '../../components/common/ArticleEdit';
import SelectSmall from './SelectSmall';

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
            <Box sx={{ textAlign: 'right' }}>
                <SelectSmall />
            </Box>
            {articleList && articleList?.length > 0 ? (
                articleList?.map((item: IArticle) => (
                    <Box
                        key={item?._id}
                        borderTop={'1px solid #ddd'}
                        py={'10px'}
                    >
                        <Stack
                            direction={'column'}
                            // spacing={'2'}
                            flexGrow={1}
                            alignItems={'start'}
                            position={'relative'}
                            height={'153px'}
                            pr={'30px'}
                            justifyContent={'space-between'}
                        >
                            {isAdmin && <ArticleEdit item={item} />}

                            <Typography
                                target="_blank"
                                component={'a'}
                                href={item?.link}
                                sx={{
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: 'black',
                                    ':hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                {item?.title}
                            </Typography>

                            <Typography
                                component={'div'} 
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    color: 'black',
                                    my: '10px',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: item?.content,
                                }}
                            />

                            <Typography
                                variant="subtitle1"
                                component={'span'}
                                color={'#faa957'}
                            >
                                {diffTime(item?.pubDate)}
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
