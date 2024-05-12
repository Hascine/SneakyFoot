import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormProduct({ url, product, handleSubmit, propName }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImgUrl(product.imgUrl);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${url}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        setCategories(data.data);
      } catch (error) {
        toast.error(error.response.data.message);

        if (error.response.status === 500) {
          localStorage.removeItem('access_token');
          navigate('/login');
        }
      }
    };

    fetchCategories();
  }, [navigate]);

  return (
    <>
      <form
        id="product-form"
        onSubmit={(e) =>
          handleSubmit(e, name, description, price, imgUrl, stock, categoryId)
        }
      >
        <div className="mb-3">
          <label htmlFor="product-name">
            Name <span className="text-danger fw-bold">*</span>
          </label>
          <input
            htmlFor="name"
            type="text"
            className="form-control"
            id="product-name"
            placeholder="Enter product name"
            autoComplete="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product-category">
            Category <span className="text-danger fw-bold">*</span>
          </label>
          <select
            id="product-category"
            className="form-select"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" select="true" disabled>
              -- Select Category --
            </option>
            {categories.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="product-desc">
            Description
            <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="product-desc"
            placeholder="Enter product description"
            autoComplete="off"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="product-stock">
                Stock <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="product-stock"
                placeholder="Enter product stock"
                autoComplete="off"
                required
                value={stock || ''}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="product-price">
                Price <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="product-price"
                placeholder="Enter product price"
                autoComplete="off"
                required
                value={price || ''}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="product-image">Image</label>
          <input
            type="text"
            className="form-control"
            id="product-image"
            placeholder="Enter product image url"
            autoComplete="off"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className="row mt-5 mb-3">
          <div className="col-6">
            <button
              className="btn btn-lg btn-light rounded-pill w-100 p-2"
              accent="secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-lg btn-primary rounded-pill w-100 p-2"
              type="submit"
            >
              {propName}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
