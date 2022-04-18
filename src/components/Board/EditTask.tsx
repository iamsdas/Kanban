import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request, useStages } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const EditTaskForm = (props: { closeModalCB: () => void; task: ITask }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.task.title);
  const [description, setDesc] = useState(props.task.description);
  const [status, setStatus] = useState(props.task.status);
  const { data } = useStages(props.task.board);
  const stages = data;

  const newTask = {
    ...props.task,
    title,
    description,
    status,
  };

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return request<ITask>(
        `boards/${props.task.board}/tasks/${props.task.id}`,
        'PATCH',
        newTask
      );
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries('boards');
        const prev = queryClient.getQueryData('boards');
        queryClient.setQueryData(
          ['tasks', props.task.board, props.task.id],
          (_) => newTask
        );
        return { prev };
      },
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  return (
    <form onSubmit={mutation.mutate}>
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'
        />
      </div>
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='desc'>Description</label>
        <textarea
          name='description'
          id='desc'
          cols={30}
          rows={2}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></textarea>
      </div>
      <div className='flex flex-col justify-between py-2 gap-1 pb-4'>
        <label htmlFor='status'>Description</label>
        <select
          name='status'
          id='status'
          value={status}
          onChange={(e) => setStatus(parseInt(e.target.value))}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'>
          {stages &&
            stages.map((status) => (
              <option value={status.id}>{status.title}</option>
            ))}
        </select>
      </div>
      <OutlineButton
        onClickCB={() => {
          props.closeModalCB();
        }}
        label={'Update'}
      />
    </form>
  );
};

export default EditTaskForm;
