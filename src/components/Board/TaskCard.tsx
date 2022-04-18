import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils';
import Modal from '../common/Modal';
import OutlineButton from '../common/OutlineButton';
import EditTask from './EditTask';

const TaskCard = ({ task }: { task: ITask }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return request<{}>(`boards/${task.board}/tasks/${task.id}`, 'DELETE');
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  return (
    <div className='p-4 mb-4 bg-neutral-100 rounded-lg'>
      <div className='flex justify-between items-center'>
        <div className='font-semibold text-lg capitalize'>{task.title}</div>

        <div className='flex gap-1 flex-nowrap'>
          <OutlineButton
            icon={<PencilAltIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={() => {
              setModalOpen(true);
            }}
          />
          <OutlineButton
            icon={<TrashIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={mutation.mutate}
          />
        </div>
      </div>
      <div>{task.description}</div>
      <Modal closeModalCB={() => setModalOpen(false)} open={modalOpen}>
        <EditTask task={task} closeModalCB={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TaskCard;
