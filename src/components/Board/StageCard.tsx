import OutlineButton from '../common/OutlineButton';
import { TrashIcon } from '@heroicons/react/outline';
import { useMutation, useQueryClient } from 'react-query';
import { request, useTasks } from '../../utils';
import TaskCard from './TaskCard';

const StageCard = ({ stage }: { stage: IStage }) => {
  const queryClient = useQueryClient();
  const { data } = useTasks(stage.board);
  const tasks = data?.results?.filter(
    (item) => item.status === stage.id && item.completed === false
  );

  const mutation = useMutation(
    () => {
      return request<{}>(`boards/${stage.board}/status/${stage.id}`, 'DELETE');
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('stages');
      },
    }
  );

  return (
    <div className='p-6 bg-white rounded-xl text-gray-600'>
      <div className='flex justify-between items-center mb-3 border-b-4 border-neutral-500'>
        <div className='font-semibold capitalize text-2xl'>{stage.title}</div>
        <div className='flex gap-1 flex-nowrap'>
          <OutlineButton
            icon={<TrashIcon className='w-5 h-5' />}
            noBorder={true}
            onClickCB={mutation.mutate}
          />
        </div>
      </div>
      {tasks ? (
        tasks.length !== 0 ? (
          tasks.map((task) => <TaskCard task={task} key={task.id} />)
        ) : (
          <div className='py-8 text-center text-xl text-neutral-400'>
            No Tasks
          </div>
        )
      ) : (
        <div className='py-8 text-center text-xl text-neutral-400'>
          Loading...
        </div>
      )}
    </div>
  );
};

export default StageCard;
