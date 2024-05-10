import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../views/BaseLayout';
import Login from '../views/Login';
import Register from '../views/Register';
const url = 'https://shoes.hascine.xyz';

const Router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default Router;
