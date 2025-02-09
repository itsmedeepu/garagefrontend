import React from "react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getAdminById } from "./AdminRootLayout";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";

function AdminProfilePage() {
  return <AdminProfile />;
}

export default AdminProfilePage;

export const AdminProfileLoader = async () => {
  return {
    admindata: getAdminById(),
  };
};

export const AdminProfileaction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const id = localStorage.getItem("adminid");
  try {
    const response = await adminaxiosInstance.post("/update", {
      name,
      email,
      phone,
      id,
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
