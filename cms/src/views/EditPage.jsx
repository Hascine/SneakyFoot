import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormProduct from '../components/assets/FormProduct';

export default function EditPage({ url }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      setProduct(data.data);
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

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    document.title = `Edit Product ${product?.id || ''} | Sneaky Foot`;
  }, [product?.id]);

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
      const dataAdded = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };

      await axios.put(`${url}/products/${id}`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      toast.success('Data updated successfully', { position: 'bottom-right' });

      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });

      if (error.response.status === 500) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    }
  }

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Update Product</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            {!loading ? (
              <FormProduct
                url={url}
                handleSubmit={handleSubmit}
                product={product}
                propName="Edit Product"
              />
            ) : (
              <img src="/walking.gif" alt="Loading" width={120} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
