/* This code snippet is a TypeScript React component called `AppAppBar`. It is a functional component
that represents the top app bar of a web application. Here's a breakdown of what the code is doing: */
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import adminSelectors from '@/store/auth/auth.selector';
import { adminActions } from '@/store/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/common/Logo';
interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar() {
    const dispatch = useDispatch();
    const isAdmin = useSelector(adminSelectors.getIsAdmin());
    const handleLogout = () => {
        dispatch(adminActions.setIsAdmin(false));
        localStorage.removeItem('token');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    variant="regular"
                    sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: `0 0 1px rgba(246,99,14, 0.1), 1px 1.5px 2px -1px rgba(246,99,14, 0.15), 4px 4px 12px -2.5px rgba(246,99,14, 0.15)`,
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        <Logo />
                        <Typography
                            color={'#FF4500'}
                            fontWeight={'900'}
                            letterSpacing={'.73px'}
                            fontSize={'1.2rem'}
                            ml={'10px'}
                        >
                            REDDIT
                        </Typography>
                    </Box>

                    {isAdmin && (
                        <Button
                            type="button"
                            onClick={handleLogout}
                            variant="outlined"
                            sx={{ borderRadius: '10px', color: '#FF4500' }}
                        >
                            Sign out
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppAppBar;
