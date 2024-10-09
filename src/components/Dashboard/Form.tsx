import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from '@/controller/controller';

import lock from '/lock.svg';
import mail from '/mail.svg';
import { Link, useNavigate } from 'react-router-dom';
import { TFormInputs } from '@/types/types';
import Loader from './Loader';

export default function Form() {
  const [signInError, setSignInError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>();

  const navigate = useNavigate();

  const handleSignIn: SubmitHandler<TFormInputs> = async ({
    email,
    password,
  }) => {
    setLoading(true);
    try {
      const response = await signIn(email, password);
      if (response.ok) {
        const { data } = await response.json();
        sessionStorage.setItem('JWT', data.token);
        sessionStorage.setItem('isLogged', 'true');
        navigate('/dashboard');
      } else {
        setSignInError('Invalid email or password');
        setTimeout(() => setSignInError(''), 5000);
      }
    } catch (e) {
      setSignInError('Sign in failed, please try again.');
      setTimeout(() => setSignInError(''), 5000);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="w-1/2 bg-zinc-200 p-6 flex justify-center items-center rounded-md">
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="relative">
            <img
              src={mail}
              className="absolute left-3 top-3 h-5 w-5"
              alt="mail icon"
            />
            <input
              placeholder="Email"
              type="email"
              {...register('email', { required: 'Email Address is required' })}
              className="w-full border-gray-300 border rounded-md py-2 px-10"
            />
            {errors.email && (
              <p role="alert" className="absolute right-0 top-10 text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative self-stretch">
            <img
              src={lock}
              className="absolute left-3 top-3 h-5 w-5"
              alt="mail icon"
            />
            <input
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'Email Address is required',
              })}
              className="w-full border-gray-300 border rounded-md py-2 px-10"
            />
            {errors.password && (
              <p role="alert" className="absolute right-0 top-10 text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className="py-2 rounded bg-accent-purple-300 font-bold text-white hover:bg-accent-purple-500 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader /> : 'SIGN IN'}
          </button>
          <Link
            to="/"
            className="text-gray-500 text-sm underline underline-offset-4 self-center"
          >
            Forgot your password?
          </Link>
        </form>
      </div>
      <p className="text-red-600 min-h-6">{signInError && signInError}</p>
    </div>
  );
}
