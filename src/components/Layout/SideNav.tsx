import {
  HomeIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

import NavButton from './NavButton';

const SideNav = () => {
  return (
    <div className='w-60 h-screen shadow-md bg-white py-3'>
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
    </div>
  );
};

export default SideNav;
