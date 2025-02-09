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

function AdminLogin() {
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

      setTimeout(() => navigate("/admin/dashboard"), 2000); // Redirect after successful login
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
              <Link to="/admin/resetpassword" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </Form>
          <div className="text-center mt-4">
            <span className="me-2">Don't have an account?</span>
            <Link to="/admin/register" className="text-decoration-none fw-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
