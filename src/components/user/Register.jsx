import React, { useEffect } from "react";
import { MDBInput, MDBIcon } from "mdb-react-ui-kit";
import {
  Form,
  useActionData,
  useNavigation,
  useRouteError,
  Link,
  useNavigate,
} from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

function Register() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData();
  const error = useRouteError();
  const isSubmitting = navigation.state === "submitting";
  console.log(actionData);

  useEffect(() => {
    if (actionData?.statusCode === 201) {
      toast.success(actionData.message + " kindly , login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      const timer = setTimeout(() => navigate("/garage/user/login"), 3000);
      return () => clearTimeout(timer);
    }

    if (actionData?.statusCode === 404) {
      toast.warning(actionData.message || "Registration failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (actionData?.statusCode === 409) {
      toast.error(actionData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (actionData?.statusCode === 500) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [actionData, error]);

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>

          <Form method="post" replace>
            <div className="mb-4">
              <MDBInput
                label="Full Name"
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Email address"
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Phone Number"
                id="phone"
                type="tel"
                name="phone"
                required
                autoComplete="tel"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Password"
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              className="btn btn-primary  d-flex justify-content-center align-items-center gap-2 text-decoration-none w-100 mb-4"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <MDBIcon icon="circle-notch" spin className="me-2" />
                  Registering ...
                </>
              ) : (
                <>
                  <MDBIcon icon="sign-in-alt" className="me-2" />
                  Register
                </>
              )}
            </button>

            <div className="text-center mb-4 position-relative">
              <hr className="my-3" />
              <span className="px-2 bg-white position-absolute top-50 start-50 translate-middle">
                or continue with
              </span>
            </div>
          </Form>

          <a
            href="http://localhost:3000/api/v1/garage/user/oauth2/google/sigin"
            className="btn  btn-outline-danger rounded-pill d-flex justify-content-center align-items-center gap-2 text-decoration-none w-100 mb-4"
            style={{
              padding: "0.75rem 1.5rem",
              transition: "all 0.3s ease",
            }}
          >
            <MDBIcon fab icon="google" />
            <span>Google Sign In</span>
          </a>

          <div className="text-center mt-4">
            <span className="me-2">Already have an account?</span>
            <Link
              to="/garage/user/login"
              className="text-decoration-none fw-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
