export default function ProductCard(props) {
  const { product, changePageList } = props;
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={product.imgUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.price}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                changePageList('detail', product);
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
