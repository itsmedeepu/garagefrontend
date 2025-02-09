import React from "react";
import ViewProfessinoals from "../../components/admin/ViewProfessinoals";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";
import { toast, Bounce } from "react-toastify";

function ViewProfessinoalsPage() {
  return <ViewProfessinoals />;
}

export default ViewProfessinoalsPage;

export const GetAllProfessionals = async () => {
  const response = await adminaxiosInstance.get("/getallprofs");

  const respdata = response?.data?.data;

  return respdata;
};

export const ViewProfessinalLoader = async () => {
  return {
    profdata: GetAllProfessionals(),
  };
};
export const ViewProfAction = async ({ request }) => {
  const formdata = await request.formData();
  const formtype = formdata.get("formtype");

  if (formtype === "delete") {
    const profid = formdata.get("userid");
    return await DeleteAction(profid);
  } else {
    // Existing code for updating user
    const name = formdata.get("name");
    const email = formdata.get("email");
    const phone = formdata.get("phone");
    const profid = formdata.get("profid");

    try {
      const response = await adminaxiosInstance.post("/profupdate", {
        name,
        email,
        phone,
        id: profid,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("professional updated sucessfully", {
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
    }
  }
};
export const DeleteAction = async (id) => {
  try {
    const response = await adminaxiosInstance.delete(`/deleteprof/${id}`);
    if (response.status === 200 || response.status === 201) {
      toast.success("prof deleted sucessfully", {
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
    // Error handling
    return null; // Ensure a value is returned to handle errors
  }
};
