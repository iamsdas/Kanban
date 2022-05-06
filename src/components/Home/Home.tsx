import { useGlobalTasks, useUser } from '../../utils';
import Loader from '../common/Loader';

const Home = () => {
  const userQuery = useUser();
  const tasksQuery = useGlobalTasks('none');
  const tasks = tasksQuery.data ?? [];

  if (userQuery.isLoading || tasksQuery.isLoading) return <Loader />;

  const username = userQuery.data?.username;
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const currCount = totalCount - completedCount;

  return (
    <div className='h-full py-7'>
      <h1 className='py-2 text-4xl font-semibold text-gray-700 capitalize text-center'>
        Welcome back,{' '}
        <span className='normal-case font-bold'>{username} !</span>
      </h1>
      <div className='flex flex-col justify-center items-center gap-4 sm:gap-10 mt-12'>
        <div className='w-4/5 sm:w-2/3 lg:w-1/3 p-8 rounded-xl border-2 border-neutral-300 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-500'>Pending Tasks</div>
          <div className='font-bold text-5xl'>{currCount}</div>
        </div>
        <div className='w-4/5 sm:w-2/3 lg:w-1/3 p-8 rounded-xl border-2 border-neutral-300 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-500'>Completed Tasks</div>
          <div className='font-bold text-5xl'>{completedCount}</div>
        </div>
        <div className='w-4/5 sm:w-2/3 lg:w-1/3 p-8 rounded-xl border-2 border-neutral-300 text-neutral-600 font-semibold text-2xl flex flex-col justify-center items-center'>
          <div className='text-neutral-500'>Total Tasks</div>
          <div className='font-bold text-5xl'>{totalCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
