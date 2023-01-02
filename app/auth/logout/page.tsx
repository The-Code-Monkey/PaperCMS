'use client'

import { useRouter } from 'next/navigation';

import useDB from '../../../db';
import { StyledMain } from '../../(admin)/styled';

const Page = () => {
  const router = useRouter();
  const DB = useDB();

  DB.signOut().then(res => {
    console.log(res);

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
