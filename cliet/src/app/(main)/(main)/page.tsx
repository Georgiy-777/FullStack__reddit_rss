'use client';
import AdminPanel from '@/components/common/AdminPanel';
import ArticleList from '@/components/common/ArticleList';
import SelectSmall from '@/components/common/SelectSmall';
import adminSelectors from '@/store/auth/auth.selector';
import { Box, Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Home() {
    const isAdmin = useSelector(adminSelectors.getIsAdmin());
    return (
        <Container maxWidth="lg">
            
         
            
            <Grid
                width={'100%'}
                container
                mt={isAdmin ? '120px' : '0px'}
                columnGap={{ xs: 1, sm: 2, md: 3 }}
            >
                {isAdmin && <AdminPanel />}
                <ArticleList />
            </Grid>
        </Container>
    );
}
