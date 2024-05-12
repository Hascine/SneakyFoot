import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Router from './routers';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  );
}

export default App;
