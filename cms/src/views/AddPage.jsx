import FormProduct from '../components/assets/FormProduct';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddPage({ url }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    e.preventDefault();
    try {
      setLoading(true);

      const dataAdded = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };

      const { data } = await axios.post(`${url}/products`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      toast.success('Successfully add data', { position: 'bottom-right' });

      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });

      if (error.response.status === 500) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <img src="/walking.gif" alt="Loading" width={120} />;

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">New Product</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <FormProduct
              url={url}
              handleSubmit={handleSubmit}
              propName={'Add Product'}
            />
          </div>
        </div>
      </section>
    </>
  );
}
