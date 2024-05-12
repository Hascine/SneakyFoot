import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/assets/Button';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ImageUpdate({ url }) {
  const [file, setFile] = useState();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${url}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setProduct(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { position: 'bottom-right' });

        if (error.response.status === 500) {
          localStorage.removeItem('access_token');
          navigate('/login');
        }
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);

      await axios.patch(`${url}/products/${id}/img`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      toast.success('Successfully update image', { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Update Image ${product?.id || ''} | Sneaky Foot`;
  }, [product?.id]);

  if (loading) return <img src="/walking.gif" alt="Loading" width={120} />;

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="update-product-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form id="register-form" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                <div className="mb-3">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      filename={file}
                      className="form-control pb-2"
                      id="inputGroupFile02"
                      autoComplete="off"
                      required
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <Button title="Update Image" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
