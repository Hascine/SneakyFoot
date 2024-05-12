import { Outlet } from 'react-router-dom';
import Nav from '../components/assets/Nav';
import SidePanel from '../components/assets/SidePanel';

export default function BaseLayout() {
  return (
    <>
      <Nav />
      <SidePanel />
      <Outlet />
    </>
  );
}
