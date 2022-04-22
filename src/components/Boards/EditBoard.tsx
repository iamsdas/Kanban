import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../../utils';
import OutlineButton from '../common/OutlineButton';

const EditBoardForm = (props: { closeModalCB: () => void; board: IBoard }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.board.title);
  const [description, setDesc] = useState(props.board.description);

  const newBoard = {
    ...props.board,
    title,
    description,
  };

  const mutation = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return request<IBoard>(`boards/${props.board.id}`, 'PATCH', newBoard);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries('boards');
        const prev = queryClient.getQueryData('boards');
        queryClient.setQueryData(['boards', props.board.id], (old) => newBoard);
        return { prev };
      },
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
          value={title}
          required={true}
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
          required={true}
          onChange={(e) => setDesc(e.target.value)}
          className='rounded-md focus:outline-none focus:ring-0 border border-neutral-300 focus:border-neutral-500'></textarea>
      </div>
      <OutlineButton onClickCB={() => {}} label={'Update'} />
    </form>
  );
};

export default EditBoardForm;
