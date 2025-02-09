import { redirect } from "react-router";

export const AdminLogoutAction = () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("userid");
  localStorage.removeItem("adminid");
  localStorage.removeItem("professinalid");
  return redirect("/garage/admin/login");
};
