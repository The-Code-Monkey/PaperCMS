import { useRouter } from 'next/navigation';

import useDB from '../../../db';
import { StyledMain } from '../../(admin)/styled';

const Page = () => {
  const router = useRouter();
  const DB = useDB();

  DB.signOut().then(res => {
    if (!res.error) {
      router.push('/auth/login');
    }
  });

  return <StyledMain>Logging you out...</StyledMain>;
};

export default Page;
