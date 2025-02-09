import React, { useEffect, useRef, useState } from "react";
import { MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  Link,
} from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";

function ResetPassword() {
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

      setTimeout(() => navigate("/garage/admin/login"), 2000); // Redirect after successful login
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
          <h2 className="text-center mb-4 fw-bold">Reset Password</h2>

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
                  Resetting in...
                </>
              ) : (
                <>
                  <MDBIcon icon="sign-in-alt" className="me-2" />
                  Reset
                </>
              )}
            </button>

            <div className="text-center mb-4">
              <Link to="/garage/admin/login" className="text-decoration-none">
                login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
