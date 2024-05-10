export default function Register() {
  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-user-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form id="register-form">
                <h1 className="h3 mb-3 display-1">Register User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label for="register-username">Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    placeholder="Enter username ..."
                    autocomplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label for="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    placeholder="Enter email address ..."
                    autocomplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label for="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    placeholder="Enter password ..."
                    autocomplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="register-phone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-phone"
                    placeholder="Enter phone number (optional) ..."
                    autocomplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label for="register-address">Address</label>
                  <textarea
                    id="register-address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter address (optional) ..."
                    autocomplete="off"
                  ></textarea>
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
