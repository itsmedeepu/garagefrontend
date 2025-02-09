import React, { useEffect } from "react";
import { MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  Link,
} from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData) return;

    if (actionData.status === 200) {
      toast.success(actionData.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => navigate("/garage/user/dashboard"), 2000); // Redirect after successful login
    } else if (actionData.status === 401) {
      toast.warning(actionData.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (actionData.status === 404) {
      toast.warning(actionData.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(actionData.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [actionData, navigate]);

  return (
    <div className="container">
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>

          <Form method="post" replace>
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
                label="Password"
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
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
                  Logging in...
                </>
              ) : (
                <>
                  <MDBIcon icon="sign-in-alt" className="me-2" />
                  Login
                </>
              )}
            </button>

            <div className="text-center mb-4">
              <Link
                to="/garage/professional/resetpassword"
                className="text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mb-4 position-relative">
              <hr className="my-3" />
              <span className="px-2 bg-white position-absolute top-50 start-50 translate-middle">
                or continue with
              </span>
            </div>
          </Form>

          <a
            href={`${URL}/user/oauth2/google/sigin`}
            className="btn btn-outline-danger rounded-pill d-flex justify-content-center align-items-center gap-2 text-decoration-none w-100 mb-4"
            style={{
              padding: "0.75rem 1.5rem",
              transition: "all 0.3s ease",
            }}
          >
            <MDBIcon fab icon="google" />
            <span>Google Sign In</span>
          </a>

          <div className="text-center mt-4">
            <span className="me-2">Don't have an account?</span>
            <Link
              to="/garage/user/register"
              className="text-decoration-none fw-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
