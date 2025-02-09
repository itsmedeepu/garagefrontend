import { data, redirect } from "react-router";

export const googleLoginLoader = async ({ request }) => {
  const data = new URL(request.url).searchParams;

  const accesstoken = data.get("accesstoken");
  const refreshtoken = data.get("refreshtoken");
  const userid = data.get("userid");

  if (!accesstoken || !refreshtoken) {
    return redirect("/user/login");
  }

  localStorage.setItem("accesstoken", accesstoken);
  localStorage.setItem("refreshtoken", refreshtoken);
  localStorage.setItem("userid", userid);

  return redirect("/user/dashboard");
};
