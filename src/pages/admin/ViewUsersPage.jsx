import React from "react";
import ViewUsers from "../../components/admin/ViewUsers";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";
import { axiosInstance } from "../../axioshelpers/Useraxioshelpers";
import { toast, Bounce } from "react-toastify";

function ViewUsersPage() {
  return <ViewUsers />;
}

export default ViewUsersPage;

export const getallusers = async () => {
  const response = await adminaxiosInstance.get("/allusers");
  const respdata = response?.data?.data;

  return respdata;
};

export const ViewUersPageLoader = async () => {
  return {
    userdata: getallusers(),
  };
};
export const ViewUsersAction = async ({ request }) => {
  const formdata = await request.formData();
  const formtype = formdata.get("formtype");

  if (formtype === "delete") {
    const userid = formdata.get("userid");
    return await DeleteAction(userid);
  } else {
    // Existing code for updating user
    const name = formdata.get("name");
    const email = formdata.get("email");
    const phone = formdata.get("phone");
    const userid = formdata.get("userid");

    try {
      const response = await adminaxiosInstance.post("/userupdate", {
        name,
        email,
        phone,
        id: userid,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("user updated sucessfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return { status: 200 };
      }
    } catch (error) {
      toast.error("user updated failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return { status: 500 };
      // Error handling
    }
  }
};
export const DeleteAction = async (id) => {
  try {
    const response = await adminaxiosInstance.delete(`/deleteuser/${id}`);
    if (response.status === 200 || response.status === 201) {
      toast.success("user deleted sucessfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return { status: 200 }; // This return triggers revalidation
    }
  } catch (error) {
    if (error.status === 401) {
      toast.error("All feilds are required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return { status: 401 };
    }
    if (error.status === 500) {
      toast.error("Something Went Bad at server", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return { status: 401 };
    }
    // Error handling
    return null; // Ensure a value is returned to handle errors
  }
};
