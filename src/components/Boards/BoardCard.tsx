import OutlineButton from '../common/OutlineButton';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils';
import Modal from '../common/Modal';
import { useState } from 'react';
import EditBoardForm from './EditBoard';

const BoardCard = ({ board }: { board: IBoard }) => {
  const queryClient = useQueryClient();
  const [newModalOpen, setNewModalOpen] = useState(false);

  const mutation = useMutation(
    () => {
      return request<{}>(`boards/${board.id}`, 'DELETE');
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('boards');
      },
    }
  );

  return (
    <div className='p-6 bg-white rounded-xl text-gray-600'>
      <div className='flex justify-between items-center'>
        <div className='font-semibold capitalize text-lg'>
          <Link to={`/boards/${board.id}`}>{board.title}</Link>
        </div>
        <div className='flex gap-1 flex-nowrap'>
          <OutlineButton
            icon={<PencilAltIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={() => {
              setNewModalOpen(true);
            }}
          />
          <OutlineButton
            icon={<TrashIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={mutation.mutate}
          />
        </div>
      </div>
      <div>{board.description}</div>

      <Modal closeModalCB={() => setNewModalOpen(false)} open={newModalOpen}>
        <EditBoardForm
          board={board}
          closeModalCB={() => setNewModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default BoardCard;
