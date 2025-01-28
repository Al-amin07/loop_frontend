import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import { RxDashboard } from "react-icons/rx";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";

import { MdOutlineLogout, MdOutlineDocumentScanner } from "react-icons/md";
import SidebarWrapper from "./SidebarWrapper";
import UserInfo from "./UserInfo";

const adminMenus = [
  { name: "Dashboard", link: "/dashboard", icon: RxDashboard },
  { name: "Users", link: "/dashboard/users", icon: FaUsers },
  {
    name: "Payment Requests",
    link: "/dashboard/payments",
    icon: FaMoneyBillWave,
  },

  {
    name: "Document Review",
    link: "/dashboard/document-review",
    icon: MdOutlineDocumentScanner,
  },
  {
    name: "Invoice Review",
    link: "/dashboard/invoices",
    icon: MdOutlineDocumentScanner,
  },
];

export default function AdminSidebar({ isOpen, setIsOpen, user, signOut }) {
  const location = useLocation();
  console.log({ isOpen });
  return (
    <SidebarWrapper isOpen={isOpen} setIsOpen={setIsOpen} title="Admin Panel">
      <UserInfo user={user} isOpen={isOpen} />
      <div className="mt-4 flex flex-col border-t border-gray-700 gap-3 relative">
        {adminMenus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`group flex items-center text-sm gap-3.5 font-medium p-3
             hover:bg-gray-800 rounded-md transition-colors duration-500 ${
               location.pathname === menu.link && "bg-gray-800"
             }`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre  duration-500 ${
                !isOpen && "opacity-0  translate-x-28 overflow-hidden"
              }`}
            >
              {menu.name}
            </h2>
            <h2
              className={`${
                isOpen && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
        <button
          onClick={signOut}
          className="group flex items-center text-sm gap-3.5 font-medium px-4 py-3 transition-colors duration-500 hover:bg-gray-800 rounded-md mt-auto"
        >
          <div>
            <MdOutlineLogout size="20" />
          </div>
          <h2
            style={{
              transitionDelay: `600ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !isOpen && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            Logout
          </h2>
          <h2
            className={`${
              isOpen && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            Logout
          </h2>
        </button>
      </div>
    </SidebarWrapper>
  );
}

AdminSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};
