import { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { request } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const NewStage = (props: { closeModalCB: () => void }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = new FormData(e.target as HTMLFormElement);
      return request<IBoard>(`boards/${id}/status`, 'POST', input);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stages');
        props.closeModalCB();
      },
    }
  );

  return (
    <form onSubmit={mutation.mutate}>
      <div className='flex flex-col justify-between py-2 gap-1'>
        <label htmlFor='title'>Stage Name</label>
        <input
          type='text'
          name='title'
          id='title'
          required={true}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'
        />
        <input type='hidden' name='board' value={id} />
      </div>
      <OutlineButton onClickCB={() => {}} label={'Add Stage'} />
    </form>
  );
};

export default NewStage;
