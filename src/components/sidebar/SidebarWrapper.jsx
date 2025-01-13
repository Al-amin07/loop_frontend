import PropTypes from "prop-types";
import { HiMenuAlt3 } from "react-icons/hi";

export default function SidebarWrapper({ isOpen, setIsOpen, title, children }) {
  return (
    <div
      className={`bg-[#0e0e0e]  min-h-screen ${
        isOpen ? "w-80" : "w-[76px]"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3  flex justify-between items-center">
        <h2
          style={{
            transitionDelay: `300ms`,
          }}
          className={`whitespace-pre  duration-500 ${
            !isOpen && "opacity-0 translate-x-28 overflow-hidden"
          }`}
        >
          {title}
        </h2>
        <div className="cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
          <HiMenuAlt3 size={26} />
        </div>
      </div>
      {children}
    </div>
  );
}

SidebarWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
