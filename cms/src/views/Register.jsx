import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/assets/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register({ url }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  async function handleSubmit(e, username, email, password, phone, address) {
    e.preventDefault();
    try {
      const dataAdded = {
        username: username,
        email: email,
        password: password,
        phoneNumber: phone,
        address: address,
      };
      await axios.post(`${url}/add-user`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      toast.success('Successfully added new staff', {
        position: 'bottom-right',
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-right' });

      if (error.response.data.statusCode === 500) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    document.title = 'Add Staff | Sneaky Foot';
  }, []);

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-user-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form
                id="register-form"
                onSubmit={(e) =>
                  handleSubmit(e, username, email, password, phone, address)
                }
              >
                <h1 className="h3 mb-3 display-1">Register User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-username">Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    placeholder="Enter username ..."
                    autoComplete="off"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    placeholder="Enter email address ..."
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    placeholder="Enter password ..."
                    autoComplete="off"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-phone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-phone"
                    placeholder="Enter phone number (optional) ..."
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-address">Address</label>
                  <textarea
                    id="register-address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter address (optional) ..."
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                <Button title="Sign Up" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
