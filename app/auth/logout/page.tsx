'use client';

import { useRouter } from 'next/navigation';

import useDB from '../../../db';

const Page = () => {
  const router = useRouter();
  const DB = useDB();

  DB.signOut().then(res => {
    if (!res.error) {
      router.push('/auth/login');
    }
  });

  return <div className='wrapper'>Logging you out...</div>;
};

export default Page;
