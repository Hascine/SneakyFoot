import { createBrowserRouter, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseLayout from '../views/BaseLayout';
import Login from '../views/Login';
import Register from '../views/Register';
import HomePage from '../views/HomePage';
import Categories from '../views/Categories';
import AddPage from '../views/AddPage';
import EditPage from '../views/EditPage';
import ImageUpdate from '../views/ImageUpdate';
const url = 'https://shoes.hascine.xyz';

const Router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      if (!localStorage.access_token) {
        toast.error('Pleasre login first', { position: 'bottom-right' });
        return redirect('/login');
      }

      return redirect('/products');
    },
  },
  {
    path: '/login',
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        toast.error('You already logged in', { position: 'bottom-right' });
        return redirect('/products');
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        toast.error('Please login first', { position: 'bottom-right' });
        return redirect('/login');
      }

      return null;
    },
    children: [
      {
        path: '/products',
        element: <HomePage url={url} />,
      },
      {
        path: '/products/add',
        element: <AddPage url={url} />,
      },
      {
        path: '/products/edit/:id',
        element: <EditPage url={url} />,
      },
      {
        path: '/products/img/:id',
        element: <ImageUpdate url={url} />,
      },
      {
        path: '/categories',
        element: <Categories url={url} />,
      },
      {
        path: '/user/add',
        element: <Register url={url} />,
      },
    ],
  },
]);

export default Router;
