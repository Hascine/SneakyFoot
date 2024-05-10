import { Outlet } from 'react-router-dom';
import Nav from '../components/assets/Nav';

export default function BaseLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
