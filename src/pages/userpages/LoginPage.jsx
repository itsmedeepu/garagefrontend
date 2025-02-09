import { redirect, useNavigation } from "react-router";
import Login from "../../components/user/Login";
import { axiosInstance as useraxiosInstance } from "../../axioshelpers/Useraxioshelpers";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
function LoginForm() {
  return <Login key={true} />;
}

export default LoginForm;
export const LoginAction = async ({ request }) => {
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
    const response = await axios.post(`${URL}/user/login`, {
      email,
      password,
    });

    if (response.status === 404) {
      return new Response(
        JSON.stringify({ status: 404, message: "please provide all details" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    if (response.status === 200) {
      const { accesstoken, refreshtoken, userid } = response.data.data;

      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("refreshtoken", refreshtoken);
      localStorage.setItem("userid", userid);

      return new Response(
        JSON.stringify({ status: 200, message: "Login successful!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    if (error.status === 401) {
      return new Response(
        JSON.stringify({ status: 401, message: "Invalid login details!" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
