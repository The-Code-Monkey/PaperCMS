'use client';

import { Box, Button, Input } from '@techstack/components';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

import useDB from '../db';

const Form = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const DB = useDB();

  const handleFieldUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await DB.signIn({
      email: form.email,
      password: form.password,
    });

    const {
      data: { session },
      error,
    } = response;

    if (!error && session?.access_token) {
      await router.push('/');
    }
  };

  return (
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
        <Input type='email' name='email' onChange={handleFieldUpdate} />
      </label>
      <label>
        Password
        <Input type='password' name='password' onChange={handleFieldUpdate} />
      </label>
      <Button>login</Button>
    </Box>
  );
};

export default Form;
