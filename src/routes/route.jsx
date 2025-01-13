import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "../private/PrivateRoute";
import Signup from "../pages/signup/Signup";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Users from "../pages/dashboard/Users";
import PaymentRequests from "../pages/dashboard/PaymentRequests";
import AdminRoute from "../private/AdminRoute";
import MyDocuments from "../pages/dashboard/documents/MyDocuments";
import DocumentReview from "../pages/dashboard/documents/DocumentReview";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "document-review",
        element: (
          <AdminRoute>
            <DocumentReview />
          </AdminRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <PaymentRequests />
          </PrivateRoute>
        ),
      },

      {
        path: "documents",
        element: (
          <PrivateRoute>
            <MyDocuments />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
