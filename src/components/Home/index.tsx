import { useGlobalTasks, useUser } from '../../utils';
import Layout from '../Layout';
import Loader from '../common/Loader';

const Home = () => {
  const userQuery = useUser();
  const tasksQuery = useGlobalTasks('none');
  const tasks = tasksQuery.data ?? [];

  if (userQuery.isLoading || tasksQuery.isLoading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  const username = userQuery.data?.username;
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const currCount = totalCount - completedCount;

  return (
    <Layout>
      <h1 className='py-2 text-4xl font-semibold text-gray-700 capitalize text-center'>
        Welcome back,{' '}
        <span className='normal-case font-bold'>{username} !</span>
      </h1>
      <div className='flex flex-col justify-center items-center gap-8 mt-11'>
        <div className='w-1/3 p-11 rounded-xl border-2 border-neutral-400 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-600'>Pending Tasks</div>
          <div className='font-bold'>{currCount}</div>
        </div>
        <div className='w-1/3 p-11 rounded-xl border-2 border-neutral-400 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-600'>Completed Tasks</div>
          <div className='font-bold'>{completedCount}</div>
        </div>
        <div className='w-1/3 p-11 rounded-xl border-2 border-neutral-400 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-600'>Total Tasks</div>
          <div className='font-bold'>{totalCount}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
