import rupiah from '../helpers/toIdr';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ProductTable({ url }) {
  const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setproduct(data.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      toast.success('Successfully delete data', { position: 'bottom-right' });

      fetchProducts();
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
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" width="180px">
              Image
            </th>
            <th scope="col" width="250px">
              Description
            </th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Author</th>
            <th scope="col" width="50px"></th>
          </tr>
        </thead>
        <tbody id="table-product">
          {!loading ? (
            product.map((e, index) => (
              <tr key={e.id}>
                <td scope="row">#{index + 1}</td>
                <td className="fw-bold">{e.name}</td>
                <td>
                  <img src={e.imgUrl} className="img-fluid" />
                </td>
                <td>{e.description}</td>
                <td>{e.stock}</td>
                <td className="fw-bold">{rupiah(e.price)}</td>
                <td>{e.User.email}</td>
                <td>
                  <span className="d-flex">
                    <Link>
                      <div
                        href=""
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                        className="ms-3"
                      >
                        <span className="icon material-symbols-outlined text-danger">
                          delete
                        </span>
                      </div>
                    </Link>
                    <a href={`/products/edit/${e.id}`} className="ms-3">
                      <span className="icon material-symbols-outlined text-danger">
                        edit
                      </span>
                    </a>
                    <a href={`/products/img/${e.id}`} className="ms-3">
                      <span className="icon material-symbols-outlined text-danger">
                        image
                      </span>
                    </a>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                <img src="/walking.gif" alt="Loading" width={120} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
