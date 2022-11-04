'use client';

import { FormEvent } from 'react';
import useDB from '../../../db';
import {useRouter} from "next/navigation";
import {Box, Input, Button} from "@techstack/components";

export interface AuthEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    elements: {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
  };
}

const Form = () => {
  const router = useRouter();

  const DB = useDB();

  const handleSubmit = async (event: AuthEvent) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const { data, error } = await DB.signIn({
      email,
      password,
    });

    if (!error) {
      router.push('/')
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
        <Input type='email' name='email' />
      </label>
      <label>
        Password
        <Input type='password' name='password' />
      </label>
      <Button mt="3" variant="primary">login</Button>
    </Box>
  );
};

export default Form;
