import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-3xl border border-red-300 rounded-md">
        <h2>Error occured</h2>
        <Link
          className="py-2 inline-block mx-auto px-4 bg-orange-500 text-white rounded-md"
          to={"/"}
        >
          Go to Home page
        </Link>
      </div>
    </div>
  );
};

export default Error;
