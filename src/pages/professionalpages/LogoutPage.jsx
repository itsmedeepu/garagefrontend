import { redirect } from "react-router";

const LogoutAction = () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("userid");
  localStorage.removeItem("adminid");
  localStorage.removeItem("professinalid");
  return redirect("/Professional/login");
};
export default LogoutAction;
