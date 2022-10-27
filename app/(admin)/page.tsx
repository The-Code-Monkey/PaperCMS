import { use } from 'react';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import {cookies} from "next/headers";

const Page = () => {
  const allCookies = cookies().getAll();

console.log(allCookies)

  use(withPageAuth({ redirectTo: '/auth/login' })({ req: {
    cookies: allCookies
    }} as any));

  return <>Dashboard</>;
};

export default Page;
