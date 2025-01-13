import { Link, NavLink } from "react-router";
import "./Navbar.css";
import useAuth from "../hooks/useAuth";
const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];
export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16  items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link
              to={"/"}
              className="text-3xl font-bold hover:scale-105 transition-all duration-300 bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text"
            >
              Monitrix
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-8 ">
                {navItems.map((el) => (
                  <li key={el.path}>
                    <NavLink className=" text-lg " to={el.path}>
                      {el.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user?.email ? (
              <div className="flex gap-4 items-center">
                <Link
                  className="px-5 py-2.5  bg-orange-50 rounded-md font-medium text-orange-600"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
                <button
                  className="px-5 py-2.5  bg-orange-50 rounded-md font-medium text-orange-600"
                  onClick={signOut}
                >
                  Logout{" "}
                </button>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  to={"/login"}
                  className="rounded-md bg-orange-600 px-5 py-2.5  font-medium text-white shadow"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    to={"/register"}
                    className="rounded-md bg-gray-100 px-5 py-2.5  font-medium text-orange-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
