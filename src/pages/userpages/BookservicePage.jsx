import BookingForm from "../../components/user/BookService";
import { axiosInstance } from "../../axioshelpers/Useraxioshelpers";

const URL = import.meta.env.VITE_API_URL;

function BookservicePage() {
  return <BookingForm />;
}

export default BookservicePage;

export const loadServices = async () => {
  const res = await fetch(`${URL}/service/getservices`, { method: "GET" });

  const respdata = await res.json();

  return respdata.data.services;
};

export const BookservicePageLoader = async () => {
  return {
    services: loadServices(),
  };
};

export const Bookignaction = async ({ request }) => {
  const formdata = await request.formData();

  const serviceId = formdata.get("service_id");
  const date = formdata.get("date");
  const longitude = formdata.get("longitude");
  const latitude = formdata.get("latitude");
  const userId = localStorage.getItem("userid");
  try {
    const response = await axiosInstance.post("/addbooking", {
      serviceId,
      userId,
      date,
      longitude,
      latitude,
    });

    if (response.status === 201 || response.status === 200) {
      return new Response(JSON.stringify({ statusCode: 201 }));
    }
  } catch (error) {
    if (error.status === 401) {
      return new Response(JSON.stringify({ statusCode: 401 }));
    }
    if (error.status === 404) {
      return new Response(JSON.stringify({ statusCode: 404 }));
    }

    if (error.status === 500) {
      throw new Response(
        JSON.stringify({ message: "server error ,", statusCode: 500 })
      );
    }
  }
};
