'use client';
import * as React from 'react';
import { PaletteMode, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import getLPTheme from '../../styles/getLPTheme';
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from '../../store/index';
import { PersistGate } from 'redux-persist/integration/react';
import adminSelectors from '@/store/auth/auth.selector';
const defaultTheme = createTheme({});

const layout = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default layout;
