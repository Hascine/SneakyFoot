import { useState } from 'react';
import dataProducts from '../products.json';
import ProductCard from './ProductCard';

export default function ListProducts(props) {
  const { changePageApp } = props;
  const [products, setProducts] = useState(dataProducts);
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
