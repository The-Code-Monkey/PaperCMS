import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      await router.push('/admin');
    };

    redirect();
  }, [router]);

  return null;
};

export default Index;
