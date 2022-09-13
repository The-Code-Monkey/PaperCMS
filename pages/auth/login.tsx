import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleFieldUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { session, error } = await supabaseClient.auth.signIn({
      email: form.email,
      password: form.password,
    });

    if (!error && session?.access_token) {
      await router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email address
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleFieldUpdate}
        />
      </label>
      <label>
        Password
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleFieldUpdate}
        />
      </label>
      <button>login</button>
    </form>
  );
};

export default Login;
