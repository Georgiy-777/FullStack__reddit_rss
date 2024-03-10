/* The code snippet provided is a TypeScript React component that defines a layout for a web
application. Here's a breakdown of what the code is doing: */
'use client'
import Hero from '@/components/common/Hero';
import adminSelectors from '@/store/auth/auth.selector';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AppAppBar from '../../../components/common/AppAppBar';


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