import React from "react";
import AddNewService from "../../components/admin/AddNewService";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";
import { toast, Bounce } from "react-toastify";

function AddNewServicesPage() {
  return <AddNewService />;
}

export default AddNewServicesPage;
export const AddserviceAction = async ({ request }) => {
  const formdata = await request.formData();

  const servicename = formdata.get("name");
  const price = formdata.get("price");
  const description = formdata.get("description");

  try {
    const response = await adminaxiosInstance.post("/addservice", {
      name: servicename,
      price,
      description,
    });
    if (response.status === 201) {
      toast.success("Service Added sucessfully", {
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
      toast.warning("All feilds required", {
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
      toast.warning("Something went bad", {
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
  }
};
