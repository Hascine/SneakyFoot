import axios from 'axios';
import { useEffect, useState } from 'react';
// import dataProducts from '../products.json';
import ProductCard from './ProductCard';

export default function ListProducts(props) {
  const { changePageApp, url } = props;
  const [products, setProducts] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios.get(`${url}/pub/products`);
      console.log(data);
      setProducts(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    console.log('Fetch data');
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id || index}
            product={product}
            changePageList={changePageApp}
          />
        ))}
      </div>
    </>
  );
}
