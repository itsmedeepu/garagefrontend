import React from "react";
import { Link, useRouteError } from "react-router";
import { MDBContainer, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import image from "../../images/404.jpg";

function ErrorPage() {
  const error = useRouteError();
  let title = "Page Not Found";
  let message = "Please check the URL.";
  let status = error.status;
  if (error.status === 500) {
    title = "Something went bad";
    message = error.message;
  }

  return (
    <MDBContainer className="vh-100 d-flex align-items-center justify-content-center">
      <MDBRow className="text-center">
        <MDBCol md="6" className="d-flex justify-content-center">
          <div className="w-100">
            <img
              src={image}
              alt="Error"
              className="img-fluid"
              style={{ maxWidth: "80%", height: "100%" }}
            />
          </div>
        </MDBCol>
        <MDBCol
          md="6"
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <MDBTypography tag="h1" className="text-danger">
            {status} {title}
          </MDBTypography>
          <p className="lead">{message}</p>
          <Link to={"/"} className="btn btn-primary mt-3">
            Go Back to Home
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ErrorPage;
