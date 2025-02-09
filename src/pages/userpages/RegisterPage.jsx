import React from "react";
import Register from "../../components/user/Register";
function RegisterPage() {
  return <Register />;
}
const URL = import.meta.env.VITE_API_URL;
export default RegisterPage;

export const RegistrationAction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const password = formdata.get("password");

  console.log(name);
  const response = await fetch(`${URL}/user/register`, {
    method: "post",
    body: JSON.stringify({ name, email, phone, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
