import { PlusIcon, ViewListIcon, ViewGridIcon } from '@heroicons/react/outline';
import NewTask from './NewTask';
import Modal from '../common/Modal';
import OutlineButton from '../common/OutlineButton';
import Layout from '../Layout';
import { useState } from 'react';
import { useGlobalTasks } from '../../utils';
import TaskCard from './TaskCard';
import Loader from '../common/Loader';

const todoSort = (a: ITask, b: ITask) => {
  if (a.completed === b.completed) return 0;
  if (!a.completed && b.completed) return -1;
  return 1;
};

const Todos = () => {
  const [filter, setFilter] = useState('today');
  const { data: tasks, isLoading } = useGlobalTasks(filter);
  const [gridMode, setGridMode] = useState(true);
  const [newModalOpen, setNewModalOpen] = useState(false);

  if (isLoading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className='flex justify-between items-center pb-5'>
        <h1 className='py-2 text-4xl font-semibold text-gray-700'>To Do</h1>
        <OutlineButton
          icon={<PlusIcon className='w-4 h-4' />}
          label='New Task'
          onClickCB={() => {
            setNewModalOpen(true);
          }}
        />
      </div>
      <div className='pb-4 flex justify-between items-center'>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='rounded-xl focus:outline-none focus:ring-0 border-2 bg-inherit border-neutral-500 font-semibold focus:border-neutral-800 text-neutral-600 py-2 pr-9 text-lg'>
          <option value='today'>today</option>
          <option value='tomorrow'>tomorrow</option>
          <option value='n_week'>next week</option>
          <option value='overdue'>overdue</option>
        </select>
        <div className='text-neutral-500 flex'>
          <button
            onClick={() => setGridMode(true)}
            className={`border-neutral-500 hover:text-neutral-300 border-2 border-r-0 p-1 rounded-l-xl ${
              gridMode ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
            <ViewGridIcon className='w-7 h-7' />
          </button>
          <button
            onClick={() => setGridMode(false)}
            className={`border-neutral-500 hover:text-neutral-300 border-2 p-1 rounded-r-xl ${
              !gridMode ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
            <ViewListIcon className='w-7 h-7' />
          </button>
        </div>
      </div>
      {tasks && tasks.length !== 0 ? (
        <div
          className={
            gridMode
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex flex-col gap-4 mx-auto'
          }>
          {[...tasks].sort(todoSort).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className='h-full -mt-28 w-full flex justify-center items-center text-2xl text-neutral-400'>
          No Tasks Scheduled
        </div>
      )}
      <Modal closeModalCB={() => setNewModalOpen(false)} open={newModalOpen}>
        <NewTask closeModalCB={() => setNewModalOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default Todos;
