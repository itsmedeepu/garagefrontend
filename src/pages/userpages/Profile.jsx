import { Await, useRouteLoaderData } from "react-router";
import ProfileForm from "../../components/user/ProfileForm";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { axiosInstance } from "../../axioshelpers/Useraxioshelpers";
const URL = import.meta.env.VITE_API_URL;
function Profile() {
  return (
    <>
      <ProfileForm />
    </>
  );
}
export default Profile;
export const loaduser = async () => {
  const userid = localStorage.getItem("userid");
  const accesstoken = localStorage.getItem("accesstoken");

  if (!userid || !accesstoken) {
    console.error("User ID or Access Token is missing");
    return null;
  }

  try {
    const response = await fetch(`${URL}/user/getuserbyid/${userid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesstoken}`, // If authentication is required
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const respdata = await response.json();
    const user = respdata?.data?.user;
    return user;
  } catch (error) {
    console.error("Error loading user:", error);
    return null;
  }
};

export const ProfileLoader = async () => {
  return {
    userdata: loaduser(),
  };
};

export const profileaction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const id = localStorage.getItem("userid");
  const accesstoken = localStorage.getItem("accesstoken");
  try {
    const response = await axiosInstance.post("/update", {
      name,
      email,
      phone,
      id,
      accesstoken,
    });

    console.log(response);

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
