import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request, useBoards, useStages } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const NewTask = (props: { closeModalCB: () => void }) => {
  const queryClient = useQueryClient();
  const { data } = useBoards();
  const [board, setBoard] = useState(-1);
  const { data: stages } = useStages(board);
  const boards = data?.results ?? [];

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = new FormData(e.target as HTMLFormElement);
      return request<ITask>(
        `boards/${input.get('board')}/tasks`,
        'POST',
        input
      );
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
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='board'>Board</label>
        <select
          name='board'
          id='board'
          value={board}
          onChange={(e) => setBoard(parseInt(e.target.value))}
          required={true}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'>
          <option value='-1' disabled={true}>
            select board
          </option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col justify-between py-2 gap-1 pb-4'>
        <label htmlFor='status'>Status</label>
        <select
          name='status'
          id='status'
          required
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'>
          {stages &&
            stages.map((status) => (
              <option key={status.id} value={status.id}>
                {status.title}
              </option>
            ))}
        </select>
      </div>
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
