/* The code provided is a TypeScript React component that sets up a layout for a web application. Here
is a breakdown of what the code is doing: */
'use client';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../../store/index';

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
