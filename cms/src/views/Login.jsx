import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login({ url }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const addedData = { email, password };

      const { data } = await axios.post(`${url}/login`, addedData);

      localStorage.setItem('access_token', data.access_token);

      toast.success('Successfully logged in', { position: 'bottom-right' });

      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    document.title = 'Login | Sneaky Foot';
  }, []);

  if (Loading) return <img src="/walking.gif" alt="loading" width={100} />;

  return (
    <>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in and autocomplete your order with your personal data, or
              sign up to enjoy all the benefits of an IDEA account.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img src="/BG.jpg" width="350px" alt="sofa" />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form">
                    <h1 className="h3 mb-3 display-1">
                      Log in to your account
                    </h1>
                    <span>
                      Log in on your profile to autocomplete your purchase order
                      with your personal data.
                    </span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        required
                        onChange={emailOnChange}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        required
                        onChange={passwordOnChange}
                      />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="login-remember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="login-remember"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
