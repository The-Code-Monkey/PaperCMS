'use client'

import {FormEvent} from 'react';
import { useRouter } from 'next/navigation';

import useDB from '../db';

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

      console.log(data, error)

    if (error === null) {
      await router.push('/admin');
    }
  };

  return (
    <form
      // as='form'
      onSubmit={handleSubmit}
      // flex='1'
      // d='flex'
      // gap='4'
      // flexDirection='column'
    >
      <label>
        Email address
        <input type='email' name='email' />
      </label>
      <label>
        Password
        <input type='password' name='password' />
      </label>
      <button>login</button>
    </form>
  );
};

export default Form;
