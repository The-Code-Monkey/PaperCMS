'use client';

import { FormEvent, useState } from 'react';
import { Box, Input, Button } from '@techstack/components';

import useDB from '../../../db';

export interface AuthEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    elements: {
      email: HTMLInputElement;
      password: HTMLInputElement;
      code: HTMLInputElement;
    };
  };
}

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<false | string>(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const DB = useDB<{
    id: string;
    code: string;
    used: boolean;
    email: string;
  }>();

  const handleSubmit = async (event: AuthEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIncorrectLogin(false);

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const code = event.target.elements.code.value;

    const { data: codeDataArray, error: codeError } = await DB.get(
      'auth-code',
      {
        where: ['code', code],
      }
    );

    console.log(codeDataArray, codeError);

    const codeData = codeDataArray?.[0];

    if (codeData === undefined) {
      setMessage(
        'The code you have attempted to use does not exist try again, or contact an admin'
      );
    } else if (!codeError && !codeData.used && codeData.email === email) {
      const { error: updateCodeError } = await DB.put(
        'auth-code',
        {
          used: true,
        },
        codeData.id
      );

      const { data, error } = await DB.signUp({
        email,
        password,
      });

      if (!error) {
        setMessage(
          'Please check your email for an activation link, you can then login.'
        );
      } else {
        setIncorrectLogin(true);
      }
    } else {
      if (codeData.used)
        setMessage(
          'Code has already been used please try again, or contact an admin'
        );
    }
    setIsLoading(false);
  };

  return message ? (
    <Box
      d='flex'
      gap='6'
      flexDirection='column'
      w={['11/12', '11/12', '3/4', '1/2', '1/3']}
    >
      {message}
      <Button
        mt='3'
        variant='primary'
        onClick={() => {
          setIsLoading(false);
          setMessage(false);
          setIncorrectLogin(false);
        }}
      >
        Try again
      </Button>
    </Box>
  ) : (
    <Box<'form'>
      as='form'
      onSubmit={handleSubmit}
      d='flex'
      gap='6'
      flexDirection='column'
      w={['11/12', '11/12', '3/4', '1/2', '1/3']}
      p='0'
    >
      <label>
        Email address
        {/*// @ts-ignore*/}
        <Input type='email' name='email' required />
      </label>
      <label>
        Password
        {/*// @ts-ignore*/}
        <Input type='password' name='password' required />
      </label>
      <label>
        Code
        {/*// @ts-ignore*/}
        <Input type='password' name='code' required />
      </label>
      <Button mt='3' variant='primary' disabled={isLoading}>
        {isLoading ? 'loading...' : 'Sign up'}
      </Button>
      {incorrectLogin && (
        <span>Your email or password was incorrect please try again.</span>
      )}
    </Box>
  );
};

export default Form;
