import React from "react";
import Register from "../../components/professional/Register";
import { redirect } from "react-router";
const URL = import.meta.env.VITE_API_URL;
function ProfRegisterPage() {
  return <Register />;
}

export default ProfRegisterPage;
export const ProfRegistrationAction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const password = formdata.get("password");

  const response = await fetch(`${URL}/professinal/register`, {
    method: "post",
    body: JSON.stringify({ name, email, phone, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
