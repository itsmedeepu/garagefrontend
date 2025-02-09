import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router";

const Services = () => {
  const services = [
    {
      title: "Oil Change",
      description: "We provide quick and efficient oil change services.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Brake Repair",
      description:
        "Get your brakes checked and repaired by our experts. Our certified technicians use state-of-the-art equipment to ensure optimal braking performance.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Tire Replacement",
      description: "High-quality tires for all vehicle types.",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <MDBContainer className="my-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "0 15px", // Add horizontal padding
        }}
      >
        <MDBRow className="g-4">
          {" "}
          {/* Add gutter spacing */}
          {services.map((service, index) => (
            <MDBCol md="4" key={index}>
              <MDBCard className="h-100 shadow-sm">
                {" "}
                {/* Ensure equal height */}
                <MDBCardImage
                  src={service.image}
                  alt={service.title}
                  position="top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <MDBCardBody className="d-flex flex-column">
                  <MDBCardTitle>{service.title}</MDBCardTitle>
                  <MDBCardText className="flex-grow-1">
                    {" "}
                    {/* Grow to fill space */}
                    {service.description}
                  </MDBCardText>
                  <MDBBtn
                    color="primary"
                    className="w-100 mt-3"
                    style={{ minWidth: "120px" }}
                    tag={Link}
                    to="user/dashboard"
                  >
                    Book Now
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default Services;
