import { createBrowserRouter, redirect } from 'react-router-dom';
import BaseLayout from '../views/baselayout';
import ListProducts from '../views/ListProducts';
import ProductDetail from '../views/ProductDetail';
const url = 'https://shoes.hascine.xyz';

const Router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <ListProducts url={url} />,
      },
      {
        path: '/detail/:id',
        element: <ProductDetail url={url} />,
      },
    ],
  },
]);

export default Router;
