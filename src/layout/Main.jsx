import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Main() {
  return (
    <div>
      <Navbar />
      <div
        className="mx-auto mt-8
       max-w-screen-xl px-4 sm:px-6 lg:px-8"
      >
        <Outlet />
      </div>
    </div>
  );
}
