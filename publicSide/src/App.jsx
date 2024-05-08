// import './App.css'

import { useState } from 'react';
import Navbar from './components/navbar';
import ListProducts from './components/listProducts';
import ProductDetail from './components/ProductDetail';

function App() {
  const url = 'https://shoes.hascine.xyz';
  const [page, setPage] = useState('home');
  const [productDetail, setProductDetail] = useState({});

  const changePage = (newPage = '', product) => {
    setPage(newPage);
    setProductDetail(product);
  };
  return (
    <>
      <Navbar changePage={changePage} />
      <main>
        {page == 'home' && (
          <>
            {/* Product */}
            <ListProducts url={url} changePageApp={changePage} />
          </>
        )}

        {page == 'detail' && <ProductDetail dataProduct={productDetail} />}
      </main>
    </>
  );
}

export default App;
