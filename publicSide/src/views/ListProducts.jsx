import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { toast } from 'react-toastify';

export default function ListProducts(props) {
  const { url } = props;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${url}/pub/products?filter=${filter}&sort=${sort}&page[size]=10&page[number]=${page}&search=${search}`
      );
      const categories = await axios.get(`${url}/pub/categories`);

      setProducts(data.data);
      setCategory(categories.data.data);
      setPagination(data.totalPage);
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('Fetch data');
    fetchData();
  }, [search, filter, sort, page]);

  if (loading) return <img src="/walking.gif" alt="Loading" width={200} />;

  return (
    <>
      <br />
      {/* start of pagination section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <section className="flex justify-center">
            <div className="flex w-auto flex-col md:flex-row md:space-x-2 items-center">
              <span className="font-medium text-black">Filter by :</span>
              <select
                className="select select-bordered"
                name="filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Select Categories</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* pembatas */}
          <section className="flex justify-center">
            <div className="relative flex items-center w-auto h-12 border border-gray-500 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <form
                  className="w-auto"
                  action=""
                  method="get
          "
                >
                  <input
                    className="peer h-full w-full outline-none text-sm border-gray-600 text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </section>

          <section className="flex justify-center">
            <div className="flex w-auto flex-col md:flex-row md:space-x-2 items-center">
              <select
                className="select select-bordered"
                name="filter"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort by:</option>
                <option value="-createdAt">Latest</option>
                <option value="createdAt">Oldest</option>
              </select>
            </div>
          </section>
        </div>
      </div>
      {/* end of pagination section */}

      {/* start of product section */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
      {/* end of product section */}
      <br />

      {/* start of page number section */}
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {[...Array(pagination)].map((e, i) => (
              <li>
                <button
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => {
                  if (page < pagination) setPage(page + 1);
                }}
                max={pagination}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* end of page number section */}
      <br />
    </>
  );
}
