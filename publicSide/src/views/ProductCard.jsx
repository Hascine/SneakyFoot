import { useNavigate } from 'react-router-dom';
import rupiah from '../helpers/toIdr';

export default function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate();

  function handleDetail(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={product.imgUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <p>{rupiah(product.price)}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleDetail(product.id);
              }}
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
