'use client'

import Form from '../../../components/Form';
import theme from "../../../theme";

import { ConfigContext, ThemeProvider, Context, Box } from '@techstack/components';
import config from "../../../orchard.theme.config.json";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const Page = () => {
  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SessionContextProvider supabaseClient={createBrowserSupabaseClient()}>
    <ThemeProvider theme={theme}>
    <Box
      w={['3/4', '3/4', '1/2', '1/2']}
      d='flex'
      placeContent='center'
      mx='auto'
      flex='1'
      h='full'
    >
      <Form />
    </Box>
    </ThemeProvider>
      </SessionContextProvider>
    </ConfigContext.Provider>
  );
};

export default Page;
