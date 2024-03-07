  
'use client'
import * as React from 'react';
import { PaletteMode, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../../../components/common/AppAppBar';
import Hero from '@/components/common/Hero';
import { useSelector } from 'react-redux';
import adminSelectors from '@/store/auth/auth.selector';



const layout = ({ children }: { children: React.ReactNode }) => {
    const isAdmin = useSelector(adminSelectors.getIsAdmin());
    return (
        <>
        <AppAppBar />
         {
          !isAdmin ? <Hero /> : null
         }
         <main>{children}</main>
        </>
    );
};

export default layout;