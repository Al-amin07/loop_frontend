import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";

// import route from "./routes/route.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { router } from "./routes/route.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={1000} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
