import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils';
import Loader from '../common/Loader';
import SideNav from './SideNav';

const Layout = (props: { children: ReactNode }) => {
  const { isError, data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if ((isError || !data?.username) && !isLoading) navigate('/login');
  }, [isError, data]);

  if (isLoading) return <Loader />;

  return (
    <div className='flex h-screen'>
      <SideNav />
      <div className='px-7 bg-neutral-100 flex-grow overflow-y-auto'>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
