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
    <div className='flex flex-col p-6 bg-white rounded-xl text-gray-600 w-1/4 flex-grow max-w-lg flex-shrink-0 overflow-y-auto'>
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
      <div className='flex-grow overflow-y-auto'>
        {tasks ? (
          tasks.length !== 0 ? (
            tasks.map((task) => <TaskCard task={task} key={task.id} />)
          ) : (
            <div className='-mt-4 py-8 text-center text-xl text-neutral-400 flex w-full justify-center items-center h-full'>
              No Tasks
            </div>
          )
        ) : (
          <div className='py-8 pb-14 text-center text-xl text-neutral-400 flex w-full justify-center items-center h-full'>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default StageCard;
