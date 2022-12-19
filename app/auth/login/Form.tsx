'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Input, Button } from '@techstack/components';

import useDB from '../../../db';

export interface AuthEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    elements: {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
  };
}

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const DB = useDB();

  const handleSubmit = async (event: AuthEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const { data, error } = await DB.signIn({
      email,
      password,
    });

    if (!error && data.session) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Box<'form'>
      as='form'
      onSubmit={handleSubmit}
      flex='1'
      d='flex'
      gap='6'
      flexDirection='column'
      maxW='17'
    >
      <label>
        Email address
        <Input type='email' name='email' />
      </label>
      <label>
        Password
        <Input type='password' name='password' />
      </label>
      <Button mt='3' variant='primary' disabled={isLoading}>
        {isLoading ? 'logging in' : 'login'}
      </Button>
    </Box>
  );
};

export default Form;
