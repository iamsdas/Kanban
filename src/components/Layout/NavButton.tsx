import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = (props: { to: string; children: ReactNode }) => {
  return (
    <li>
      <NavLink
        to={props.to}
        className={(link) =>
          'flex flex-nowrap items-center text-md py-4 px-4 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ' +
          (link.isActive ? 'bg-neutral-100' : '')
        }>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavButton;
