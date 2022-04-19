import Layout from '../Layout';
import OutlineButton from '../common/OutlineButton';
import { PlusIcon } from '@heroicons/react/outline';
import { useBoards } from '../../utils';
import BoardCard from './BoardCard';
import Modal from '../common/Modal';
import { useState } from 'react';
import NewBoardForm from './NewBoard';
import Loader from '../common/Loader';

const Boards = () => {
  const { data, isLoading } = useBoards();
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
        <h1 className='py-2 text-4xl font-semibold text-gray-700'>My Boards</h1>
        <OutlineButton
          icon={<PlusIcon className='w-4 h-4' />}
          label='New Board'
          onClickCB={() => {
            setNewModalOpen(true);
          }}
        />
      </div>
      {data?.results && data.results.length !== 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.results.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className='h-full -mt-16 w-full flex justify-center items-center text-2xl text-neutral-400'>
          No Boards Available
        </div>
      )}
      <Modal closeModalCB={() => setNewModalOpen(false)} open={newModalOpen}>
        <NewBoardForm closeModalCB={() => setNewModalOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default Boards;
