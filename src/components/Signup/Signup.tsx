import { FormEvent } from 'react';
import { request } from '../../utils';

export default function Signup() {
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = new FormData(e.target as HTMLFormElement);
    const parsedInput = JSON.stringify(Object.fromEntries(input));
    try {
      localStorage.removeItem('token');
      const res = await request('auth/registration', 'POST', parsedInput);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-screen bg-neutral-100'>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-3xl'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Create a new account
            </h2>
          </div>
          <form
            className='mt-8 space-y-6'
            action='#'
            method='POST'
            onSubmit={onSubmitHandler}>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Enter Email'
                />
              </div>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Username
                </label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Enter Username'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password1'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Enter Password'
                />
              </div>
              <div>
                <label htmlFor='password2' className='sr-only'>
                  Password
                </label>
                <input
                  id='password2'
                  name='password2'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Enter Password Again'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
