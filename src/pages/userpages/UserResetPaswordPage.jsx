import React from "react";
import ResetPassword from "../../components/user/ResetPassword";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
function UserResetPaswordPage() {
  return <ResetPassword />;
}

export default UserResetPaswordPage;

export const UserResetPasswordAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.trim();
  const password = formData.get("password")?.trim();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ status: 404, message: "All fields are required" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await axios.post(`${URL}/user/resetpassword`, {
      email,
      password,
    });

    if (response.status === 404) {
      return new Response(
        JSON.stringify({ status: 404, message: "please provide all details" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    if (response.status === 201) {
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Password Resetted Sucessfully",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    if (error.status === 401) {
      return new Response(
        JSON.stringify({ status: 401, message: "Invalid email " }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error.status === 404) {
      return new Response(
        JSON.stringify({ status: 404, message: "Invalid email " }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error.status === 500) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "Something went bad",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
