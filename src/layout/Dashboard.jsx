import { useState } from "react";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import UserSidebar from "../components/sidebar/UserSidebar";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut, user } = useAuth();

  return (
    <section className="flex gap-6">
      {user?.role === "admin" ? (
        <AdminSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          signOut={signOut}
        />
      ) : (
        <UserSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          signOut={signOut}
        />
      )}
      <div className="m-3 text-xl text-gray-900 font-semibold w-full">
        <Outlet />
      </div>
    </section>
  );
}
