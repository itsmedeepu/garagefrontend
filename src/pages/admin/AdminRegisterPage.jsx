import React from "react";
import AdminRegister from "../../components/admin/AdminRegister";
const URL = import.meta.env.VITE_API_URL;
function AdminRegisterPage() {
  return <AdminRegister />;
}

export default AdminRegisterPage;
export const AdminRegistrationAction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const password = formdata.get("password");

  const response = await fetch(`${URL}/admin/register`, {
    method: "post",
    body: JSON.stringify({ name, email, phone, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
