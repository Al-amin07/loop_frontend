import PropTypes from "prop-types";
import { Link } from "react-router";

export default function UserInfo({ user, isOpen }) {
  return (
    <div className="mt-4 hidden md:flex flex-col border-t border-gray-700 pt-4">
      <Link
        to={"/"}
        className="text-3xl text-center font-bold hover:scale-105 transition-all duration-300 bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text"
      >
        Monitrix
      </Link>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
