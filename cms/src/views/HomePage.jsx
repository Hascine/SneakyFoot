import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProductTable from '../components/assets/ProductTable';

export default function HomePage({ url }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Products | Sneaky Foot';
  }, []);

  return (
    <>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <section
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            id="product-section"
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="display-2">Products</h1>
              <button
                className="btn btn-primary rounded-pill"
                id="new-product"
                onClick={() => {
                  navigate('/products/add');
                }}
              >
                <span className="icon material-symbols-outlined">add</span>New
                Product
              </button>
            </div>
            <div className="row">
              <div className="col-12 table-responsive">
                <ProductTable url={url} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
