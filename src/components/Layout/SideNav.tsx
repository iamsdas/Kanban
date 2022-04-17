import {
  HomeIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { useQueryClient } from 'react-query';
import { useUser } from '../../utils';

import NavButton from './NavButton';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const { data, isLoading } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries('user');
    navigate('/login');
  };

  return (
    <div className='w-60 h-screen shadow-md bg-white py-3 flex flex-col justify-between'>
      <nav>
        <div className='border-b py-2 px-6 text-4xl font-semibold text-gray-700'>
          Kanban
        </div>
        <ul className='pt-3 px-2 flex flex-col gap-2'>
          <NavButton to='/'>
            <HomeIcon
              aria-hidden='true'
              focusable='false'
              className='w-5 h-5 mr-3'
              role='img'></HomeIcon>
            <span>Home</span>
          </NavButton>
          <NavButton to='/boards'>
            <ViewBoardsIcon
              aria-hidden='true'
              focusable='false'
              className='w-5 h-5 mr-3'
              role='img'></ViewBoardsIcon>
            <span>Boards</span>
          </NavButton>
          <NavButton to='/todo'>
            <ViewListIcon
              aria-hidden='true'
              focusable='false'
              className='w-5 h-5 mr-3'
              role='img'></ViewListIcon>
            <span>Todo</span>
          </NavButton>
        </ul>
      </nav>
      <div className='text-center border-t text-gray-600'>
        {isLoading ? (
          'loading..'
        ) : (
          <div>
            <div className='font-bold text-lg'>{data?.username}</div>
            <button onClick={logout} className='hover:text-red-500'>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
