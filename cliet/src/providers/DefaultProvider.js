'use client';

import store, { persistor } from '@/store';
import '@/styles/global.css';
import theme from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RouteProvider from './RouteProvider';

const DefaultProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <ChakraProvider theme={theme}>
            <RouteProvider>
              {children}
            </RouteProvider>
          </ChakraProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default DefaultProvider;
