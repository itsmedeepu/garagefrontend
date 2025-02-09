import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Slider = () => {
  return (
    <MDBCarousel showControls showIndicators>
      <MDBCarouselItem itemId={1}>
        <img
          src="https://placehold.co/1000x300/png"
          className="d-block w-100"
          alt="Slide 1"
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img
          src="https://placehold.co/1000x300/png"
          className="d-block w-100"
          alt="Slide 2"
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img
          src="https://placehold.co/1000x300/png"
          className="d-block w-100"
          alt="Slide 3"
        />
      </MDBCarouselItem>
    </MDBCarousel>
  );
};

export default Slider;
