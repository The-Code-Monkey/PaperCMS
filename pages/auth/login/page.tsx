import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Box, Button, Input } from '@techstack/components';

const Page = () => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleFieldUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await supabaseClient.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    const {
      data: { session },
      error,
    } = response;

    if (!error && session?.access_token) {
      await router.push('/admin');
    }
  };

  return (
    <Box
      w={['3/4', '3/4', '1/2', '1/2']}
      d='flex'
      placeContent='center'
      mx='auto'
      flex='1'
      h='full'
    >
      <Box<'form'>
        as='form'
        onSubmit={handleSubmit}
        flex='1'
        d='flex'
        gap='4'
        flexDirection='column'
      >
        <label>
          Email address
          <Input type='email' namme='email' onChange={handleFieldUpdate} />
        </label>
        <label>
          Password
          <Input type='password' name='password' onChange={handleFieldUpdate} />
        </label>
        <Button>login</Button>
      </Box>
    </Box>
  );
};

export default Page;
