import { ReactNode } from 'react';
import SideNav from './SideNav';

const Layout = (props: { children: ReactNode }) => {
  return (
    <div className='flex'>
      <SideNav />
      <div className='p-3 bg-gray-50 flex-grow'>{props.children}</div>
    </div>
  );
};

export default Layout;
