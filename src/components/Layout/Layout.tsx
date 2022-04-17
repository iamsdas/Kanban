import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils';
import SideNav from './SideNav';

const Layout = (props: { children: ReactNode }) => {
  const { isError, data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if ((isError || !data?.username) && !isLoading) navigate('/login');
  }, [isError, data]);

  return (
    <div className='flex'>
      <SideNav />
      <div className='p-7 bg-gray-50 flex-grow'>{props.children}</div>
    </div>
  );
};

export default Layout;
