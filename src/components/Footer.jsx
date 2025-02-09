import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white mt-5">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="4" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Garage Services</h5>
            <p className="mt-3">
              Professional automotive care with 20+ years of experience. We
              provide quality service for all vehicle makes and models.
            </p>
          </MDBCol>

          <MDBCol lg="4" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="4" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mt-3">
                <MDBIcon icon="map-marker-alt" className="me-2" />
                123 Garage Street, Auto City
              </li>
              <li className="mt-2">
                <MDBIcon icon="phone" className="me-2" />
                +1 (234) 567-890
              </li>
              <li className="mt-2">
                <MDBIcon icon="envelope" className="me-2" />
                info@garageapp.com
              </li>
            </ul>
          </MDBCol>
        </MDBRow>

        <section className="mb-4 mt-5">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()} Garage App:
        <a className="text-white ms-1" href="/">
          garageapp.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
