import React from "react";
import ProfProfile from "../../components/professional/ProfProfile";
import { getProfDetails } from "./ProfRootDashboardLayout";
import { profaxiosInstance } from "../../axioshelpers/Profaxioshelpers";

function ProfProfilePage() {
  return <ProfProfile />;
}

export default ProfProfilePage;

export const Profprofileloader = async () => {
  return {
    profdata: getProfDetails(),
  };
};

export const ProfProfileaction = async ({ request }) => {
  const formdata = await request.formData();

  const name = formdata.get("name");
  const email = formdata.get("email");
  const phone = formdata.get("phone");
  const id = localStorage.getItem("professinalid");
  try {
    const response = await profaxiosInstance.post("/update", {
      name,
      email,
      phone,
      id,
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
