import OutlineButton from '../common/OutlineButton';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const BoardCard = ({ board }: { board: IBoard }) => {
  return (
    <div className='p-6 bg-white rounded-xl text-gray-600'>
      <div className='flex justify-between items-center'>
        <div className='font-semibold capitalize text-lg'>
          <Link to={`/boards/${board.id}`}>{board.title}</Link>
        </div>
        <div className='flex gap-1 flex-nowrap'>
          <OutlineButton
            icon={<PencilAltIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={() => {}}
          />
          <OutlineButton
            icon={<TrashIcon className='w-4 h-4' />}
            noBorder={true}
            onClickCB={() => {}}
          />
        </div>
      </div>
      <div>{board.description}</div>
    </div>
  );
};

export default BoardCard;
