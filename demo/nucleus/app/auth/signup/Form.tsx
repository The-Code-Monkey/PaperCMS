'use client';

import { useDB } from '@nucleus-cms/components';
import { Box, Input, Button } from '@techstack/components';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

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
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const DB = useDB();

  const handleSubmit = async (event: AuthEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIncorrectLogin(false);

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const code = event.target.elements.code.value;

    const { data: codeData, error: codeError } = await DB.dbFunction<
      Record<string, string>
    >('get_auth_code', { email_data: email, code_data: parseInt(code, 10) });

    if (!codeData || codeError) {
      setMessage(
        'The code you have attempted to use does not exist or has been used please try again, or contact an admin'
      );
      setIsLoading(false);
      return;
    }

    const { error } = await DB.signUp({
      email,
      password,
    });

    if (!error) {
      setSuccess(true);
      await DB.put(
        'authCode',
        {
          used: true,
        },
        codeData.id
      );
    } else {
      setIncorrectLogin(true);
      setIsLoading(false);
      return;
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
  ) : success ? (
    <>
      <span>
        Please check your email for an activation link, you can then login.
      </span>
      <Button mt='3' variant='primary' onClick={() => router.push('/')}>
        Login
      </Button>
    </>
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
        <Input type='email' name='email' required />
      </label>
      <label>
        Password
        <Input type='password' name='password' required />
      </label>
      <label>
        Code
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
