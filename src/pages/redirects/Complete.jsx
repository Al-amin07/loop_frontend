import { Link } from "react-router";

const Complete = () => {
  return (
    <div className="flex justify-center min-h-screen  items-center">
      <div className="max-w-3xl flex flex-col items-center border space-y-7 p-7 border-green-300 rounded-md">
        <h2 className="text-2xl font-medium text-orange-700">
          Successfully completed wait for admin approval
        </h2>
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

export default Complete;
