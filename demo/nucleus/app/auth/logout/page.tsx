'use client';

import { useRouter } from 'next/navigation';

import { StyledMain } from '../../(admin)/styled';
import {useDB} from "@nucleus-cms/utils";

const Page = () => {
  const router = useRouter();
  const DB = useDB();

  DB.signOut().then(res => {
    if (!res.error) {
      router.push('/auth/login');
    }
  });

  return (
    <StyledMain
      w={['3/4', '3/4', '1/2', '1/2']}
      justifyContent='center'
      alignItems='center'
    >
      Logging you out...
    </StyledMain>
  );
};

export default Page;