import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";

const Reviews = () => {
  const reviews = [
    {
      name: "John Doe",
      comment: "Great service! My car runs like new.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      comment: "Friendly staff and quick turnaround.",
      rating: 4,
    },
    {
      name: "Mike Johnson",
      comment: "Highly recommend this garage.",
      rating: 5,
    },
  ];

  return (
    <MDBContainer className="my-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <MDBRow>
        {reviews.map((review, index) => (
          <MDBCol md="4" key={index}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardText>{review.comment}</MDBCardText>
                <div className="d-flex justify-content-between">
                  <span>{review.name}</span>
                  <span>
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <MDBIcon icon="star" key={i} className="text-warning" />
                      ))}
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default Reviews;
