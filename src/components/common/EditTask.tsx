import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request, useStages } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const EditTaskForm = (props: { closeModalCB: () => void; task: ITask }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.task.title);
  const [description, setDesc] = useState(props.task.description);
  const [status, setStatus] = useState(props.task.status);
  const [date, setDate] = useState(props.task.due_date ?? '');
  const { data } = useStages(props.task.board);
  const stages = data;

  const newTask = {
    ...props.task,
    title,
    description,
    status,
    due_date: date,
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
        props.closeModalCB();
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
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='date'>Due Date</label>
        <input
          name='due_date'
          id='date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></input>
      </div>
      <div className='flex flex-col justify-between py-2 gap-1 pb-4'>
        <label htmlFor='status'>Stage</label>
        <select
          name='status'
          id='status'
          value={status}
          onChange={(e) => setStatus(parseInt(e.target.value))}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'>
          {stages &&
            stages.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
        </select>
      </div>
      <OutlineButton onClickCB={() => {}} label={'Update'} />
    </form>
  );
};

export default EditTaskForm;
