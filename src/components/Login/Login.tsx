import { FormEvent, useEffect } from 'react';
import { request, useUser } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export default function Login() {
  const navigate = useNavigate();
  const { data, isError } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.username && !isError) navigate('/');
  }, [data]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    const input = new FormData(e.target as HTMLFormElement);
    try {
      const res = await request<{ token: string }>('auth-token', 'POST', input);
      localStorage.setItem('token', res.token);
      queryClient.invalidateQueries('user');
      navigate('/');
    } catch (error) {
      localStorage.removeItem('token');
      console.error(error);
    }
  };

  return (
    <div className='h-screen bg-neutral-100'>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-3xl'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-neutral-800'>
              Sign in to your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={onSubmitHandler}>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Email address
                </label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Username'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10'
                  placeholder='Password'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
