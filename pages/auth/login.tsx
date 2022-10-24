import {ChangeEvent, useState} from 'react';
import { useRouter } from 'next/router';
import {useSessionContext} from "@supabase/auth-helpers-react";
import {Box, Input} from "@techstack/components";

const Login = () => {
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

    const { data: { session }, error } = response

    if (!error && session?.access_token) {
      await router.push('/');
    }
  };

  return (
    <Box<"form"> as="form" onSubmit={handleSubmit}>
      <label>
        Email address
        <Input
          type='email'
          name='email'
          onChange={handleFieldUpdate}
        />
      </label>
      <label>
        Password
        <Input
          type='password'
          name='password'
          onChange={handleFieldUpdate}
        />
      </label>
      <button>login</button>
    </Box>
  );
};

export default Login;
