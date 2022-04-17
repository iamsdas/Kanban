import Layout from '../Layout';
import OutlineButton from '../common/OutlineButton';
import { PlusIcon } from '@heroicons/react/outline';
import { useBoards } from '../../utils';
import BoardCard from './BoardCard';
import Modal from '../common/Modal';
import { useState } from 'react';

const Boards = () => {
  const { data, isLoading } = useBoards();
  const [newModalOpen, setNewModalOpen] = useState(true);
  if (isLoading) return <div>loading...</div>;

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
        <Modal closeModalCB={() => setNewModalOpen(false)} open={newModalOpen}>
          <div>hello world</div>
        </Modal>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.results &&
          data.results.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
      </div>
    </Layout>
  );
};

export default Boards;
