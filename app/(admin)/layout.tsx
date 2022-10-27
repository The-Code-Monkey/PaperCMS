import { ReactNode } from 'react';
import Nav from './Nav';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {

  return (
    <div className='wrapper'>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
