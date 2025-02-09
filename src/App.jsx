import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AboutusPage from "./pages/AboutusPage";
import ContactPage from "./pages/ContactPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/userpages/LoginPage";
import RegisterPage from "./pages/userpages/RegisterPage";
import DashboardPage, { bookingsLoader } from "./pages/userpages/DashboardPage";
import { LoginAction } from "./pages/userpages/LoginPage";
import { googleLoginLoader } from "./pages/userpages/Oauth";
import { RegistrationAction } from "./pages/userpages/RegisterPage";
import ProfLoginPage from "./pages/professionalpages/ProfLoginPage";
import ProfRegisterPage from "./pages/professionalpages/ProfRegisterPage";
import ProfDashboardPage from "./pages/professionalpages/ProfDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminRegisterPage, {
  AdminRegistrationAction,
} from "./pages/admin/AdminRegisterPage";
import { ProfLoginAction } from "./pages/professionalpages/ProfLoginPage";
import { ProfRegistrationAction } from "./pages/professionalpages/ProfRegisterPage";
import { AdminLoginAction } from "./pages/admin/AdminLoginPage";

import logout from "./pages/userpages/LogoutPage";
import Profile from "./pages/userpages/Profile";
import { viewallbookingsloader } from "./pages/userpages/BookedServicesPage";
import { Profmainloader } from "./pages/professionalpages/ProfRootDashboardLayout";
import { bookingsLoaderProf } from "./pages/professionalpages/ProfDashboardPage";

import BookservicePage, {
  Bookignaction,
  BookservicePageLoader,
} from "./pages/userpages/BookservicePage";
import { LoadUserDetails } from "./pages/userpages/RootDashboardLayout";

import { ProfileLoader, profileaction } from "./pages/userpages/Profile";
import UserProtectedComponent from "./components/UserProtectedComponent";

import RootDashboardLayout from "./pages/userpages/RootDashboardLayout";
import BookedServicesPage from "./pages/userpages/BookedServicesPage";
import ProfRootDashboardLayout from "./pages/professionalpages/ProfRootDashboardLayout";
import ProfessinalProtectedComponent from "./components/professional/ProfessinalProtectedRoute";
import ProfProfilePage, {
  Profprofileloader,
  ProfProfileaction,
} from "./pages/professionalpages/ProfProfilePage";
import ViewAllBookingsPages, {
  Viewallbookingsloader,
} from "./pages/professionalpages/ViewAllBookingsPages";

import ViewBookingPage, {
  ViewBookingLoader,
  BookingAcceptAction,
} from "./pages/professionalpages/ViewBookingPage";
import ChangeStatusPage, {
  changeStatusLoader,
} from "./pages/professionalpages/ChangeStatusPage";

import LogoutAction from "./pages/professionalpages/LogoutPage";
import CompletedPage, {
  CompletedLoader,
} from "./pages/professionalpages/CompletedPage";
import AdminProtectedComponent from "./components/admin/AdminProtectedComponent";
import AdminRootLayout, {
  AdminRootLoader,
} from "./pages/admin/AdminRootLayout";
import AdminDefaultItems, {
  DashboardDefaultLoader,
} from "./pages/admin/AdminDashboardDefaultItems";
import AdminProfilePage, {
  AdminProfileLoader,
  AdminProfileaction,
} from "./pages/admin/AdminProfilePage";
import { AdminLogoutAction } from "./pages/admin/AdminLogoutPage";
import ViewUsersPage, {
  ViewUersPageLoader,
  ViewUsersAction,
} from "./pages/admin/ViewUsersPage";
import ViewProfessinoalsPage, {
  ViewProfessinalLoader,
  ViewProfAction,
} from "./pages/admin/ViewProfessinoalsPage";
import AddNewServicesPage, {
  AddserviceAction,
} from "./pages/admin/AddNewServicesPage";
import UserResetPaswordPage, {
  UserResetPasswordAction,
} from "./pages/userpages/UserResetPaswordPage";
import AdminResetPasswordPage, {
  AdminResetPasswordAction,
} from "./pages/admin/AdminResetPasswordPage";
import ProfessionalResetPasswordPage, {
  ProfessinalResetPasswordAction,
} from "./pages/professionalpages/ProfessionalesetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, path: "", element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutusPage /> },
    ],
  },
  {
    id: "authloader",
    path: "user",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        action: LoginAction,
        children: [
          {
            index: true,
            path: "oauth",
            loader: googleLoginLoader,
          },
        ],
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: RegistrationAction,
      },
      {
        id: "maindashboard",
        path: "dashboard",
        element: (
          <UserProtectedComponent>
            <RootDashboardLayout />
          </UserProtectedComponent>
        ),
        loader: LoadUserDetails,

        children: [
          {
            id: "dashboard",
            path: "",
            element: (
              <UserProtectedComponent>
                <DashboardPage />
              </UserProtectedComponent>
            ),
            loader: bookingsLoader,
          },
          {
            id: "profile",
            path: "profile",
            element: (
              <UserProtectedComponent>
                <Profile />
              </UserProtectedComponent>
            ),
            loader: ProfileLoader,
            action: profileaction,
          },
          {
            id: "bookservicepage",
            path: "bookservice",
            element: (
              <UserProtectedComponent>
                <BookservicePage />
              </UserProtectedComponent>
            ),
            loader: BookservicePageLoader,
            action: Bookignaction,
          },
          {
            id: "viewbookings",
            path: "viewbookings",
            element: (
              <UserProtectedComponent>
                <BookedServicesPage />
              </UserProtectedComponent>
            ),
            loader: viewallbookingsloader,
          },
        ],
      },
      {
        path: "logout",
        action: logout,
      },
      {
        path: "resetpassword",
        element: <UserResetPaswordPage />,
        action: UserResetPasswordAction,
      },
    ],
  },
  {
    path: "professional",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <ProfLoginPage />,
        action: ProfLoginAction,
      },
      {
        path: "register",
        element: <ProfRegisterPage />,
        action: ProfRegistrationAction,
      },
      {
        id: "profmaindashboard",
        path: "dashboard",
        element: (
          <ProfessinalProtectedComponent>
            <ProfRootDashboardLayout />
          </ProfessinalProtectedComponent>
        ),
        loader: Profmainloader,
        children: [
          {
            index: true,
            id: "profdashboard",
            path: "",
            element: (
              <ProfessinalProtectedComponent>
                <ProfDashboardPage />
              </ProfessinalProtectedComponent>
            ),
            loader: bookingsLoaderProf,
          },
          {
            id: "profprofile",
            path: "profile",
            element: (
              <ProfessinalProtectedComponent>
                <ProfProfilePage />
              </ProfessinalProtectedComponent>
            ),
            loader: Profprofileloader,
            action: ProfProfileaction,
          },
          {
            id: "profbookings",
            path: "allbookings",
            element: (
              <ProfessinalProtectedComponent>
                <ViewAllBookingsPages />
              </ProfessinalProtectedComponent>
            ),
            loader: Viewallbookingsloader,
          },
          {
            id: "profviewbookings",
            path: "viewbooking/:id",
            element: (
              <ProfessinalProtectedComponent>
                <ViewBookingPage />
              </ProfessinalProtectedComponent>
            ),
            loader: ViewBookingLoader,
          },
          {
            id: "changestatus",
            path: "markstatus/:id",
            element: (
              <ProfessinalProtectedComponent>
                <ChangeStatusPage />
              </ProfessinalProtectedComponent>
            ),
            loader: changeStatusLoader,
          },
          {
            id: "completed",
            path: "completed",
            element: (
              <ProfessinalProtectedComponent>
                <CompletedPage />
              </ProfessinalProtectedComponent>
            ),
            loader: CompletedLoader,
          },
        ],
      },
      {
        path: "logout",
        action: LogoutAction,
      },
      {
        path: "resetpassword",
        element: <ProfessionalResetPasswordPage />,
        action: ProfessinalResetPasswordAction,
      },
    ],
  },

  {
    path: "admin",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLoginPage />,
        action: AdminLoginAction,
      },
      {
        path: "register",
        element: <AdminRegisterPage />,
        action: AdminRegistrationAction,
      },
      {
        id: "adminmaindashboard",
        path: "dashboard",
        element: (
          <AdminProtectedComponent>
            <AdminRootLayout />
          </AdminProtectedComponent>
        ),
        loader: AdminRootLoader,
        children: [
          {
            id: "admindefaultitems",
            path: "",
            element: (
              <AdminProtectedComponent>
                <AdminDefaultItems />
              </AdminProtectedComponent>
            ),
            loader: DashboardDefaultLoader,
          },
          {
            id: "adminprofile",
            path: "profile",
            element: (
              <AdminProtectedComponent>
                <AdminProfilePage />
              </AdminProtectedComponent>
            ),
            loader: AdminProfileLoader,
            action: AdminProfileaction,
          },
          {
            id: "viewallusers",
            path: "viewusers",
            element: (
              <AdminProtectedComponent>
                <ViewUsersPage />
              </AdminProtectedComponent>
            ),
            loader: ViewUersPageLoader,
            action: ViewUsersAction,
          },
          {
            id: "viewallprofs",
            path: "viewallprofs",
            element: (
              <AdminProtectedComponent>
                <ViewProfessinoalsPage />
              </AdminProtectedComponent>
            ),
            loader: ViewProfessinalLoader,
            action: ViewProfAction,
          },
          {
            path: "addservice",
            element: (
              <AdminProtectedComponent>
                <AddNewServicesPage />
              </AdminProtectedComponent>
            ),
            action: AddserviceAction,
          },
        ],
      },
      {
        path: "logout",
        action: AdminLogoutAction,
      },
      {
        path: "resetpassword",
        element: <AdminResetPasswordPage />,
        action: AdminResetPasswordAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
