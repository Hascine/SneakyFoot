import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SidePanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(`access_token`);
    toast.success('Logged out', { position: 'bottom-right' });

    navigate('/login');
  };

  return (
    <>
      <nav
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        id="sidebar-menu"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/products" id="nav-product">
                <span className="icon material-symbols-outlined me-2">
                  shopping_bag
                </span>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categories" id="nav-category">
                <span className="icon material-symbols-outlined me-2">
                  category
                </span>
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user/add" id="nav-category">
                <span className="icon material-symbols-outlined me-2">
                  account_circle
                </span>
                Add User
              </a>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Account</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
                id="nav-logout"
                onClick={handleLogout}
              >
                <span className="icon material-symbols-outlined me-2">
                  logout
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
