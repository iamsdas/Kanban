import { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const NewBoardForm = (props: { closeModalCB: () => void }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = new FormData(e.target as HTMLFormElement);
      return request<IBoard>('boards', 'POST', input);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('boards');
        props.closeModalCB();
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
          required={true}
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
          required={true}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></textarea>
      </div>
      <OutlineButton onClickCB={() => {}} label={'Add'} />
    </form>
  );
};

export default NewBoardForm;
