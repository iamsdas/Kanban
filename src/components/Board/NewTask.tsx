import { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { request } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const NewTask = (props: { closeModalCB: () => void; stages: IStage[] }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = new FormData(e.target as HTMLFormElement);
      return request<ITask>(`boards/${id}/tasks`, 'POST', input);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  return (
    <form onSubmit={mutation.mutate}>
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='title'>Task Name</label>
        <input
          type='text'
          name='title'
          id='title'
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
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></textarea>
      </div>
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='date'>Due Date</label>
        <input
          name='due_date'
          id='date'
          type='date'
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></input>
      </div>
      <div className='py-2 pb-4'>
        <select
          name='status'
          id='status'
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'>
          {props.stages.map((status) => (
            <option value={status.id}>{status.title}</option>
          ))}
        </select>
      </div>
      <input type='hidden' name='board' value={id} />
      <input type='hidden' name='completed' value={'false'} />
      <OutlineButton
        onClickCB={() => {
          props.closeModalCB();
        }}
        label={'Add Task'}
      />
    </form>
  );
};

export default NewTask;
