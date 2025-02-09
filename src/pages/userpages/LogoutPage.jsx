import { redirect } from "react-router";

const logout = () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("userid");
  localStorage.removeItem("adminid");
  localStorage.removeItem("professinalid");
  return redirect("/user/login");
};
export default logout;
