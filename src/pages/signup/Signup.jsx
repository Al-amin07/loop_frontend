import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const fullName = e.target.fullName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log({ fullName, email, password });
      const result = await signUp(fullName, email, password);
      console.log({ result });
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log({ error });
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //       Create your account
    //     </h2>
    //   </div>

    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    //       <form className="space-y-6" onSubmit={handleSubmit}>
    //         <div>
    //           <label
    //             htmlFor="name"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Full Name
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="name"
    //               name="name"
    //               type="text"
    //               required
    //               value={formData.name}
    //               onChange={handleChange}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email address
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               required
    //               value={formData.email}
    //               onChange={handleChange}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               required
    //               value={formData.password}
    //               onChange={handleChange}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="confirmPassword"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Confirm Password
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               id="confirmPassword"
    //               name="confirmPassword"
    //               type="password"
    //               required
    //               value={formData.confirmPassword}
    //               onChange={handleChange}
    //               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Sign up
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <section className="relative  flex flex-row-reverse flex-wrap lg:h-[550px] rounded-2xl shadow-2xl ">
      <div className="w-full   px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-12">
        <div className="mx-auto  max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
          <p className="mt-4 text-gray-500">
            Sign in to access your account and continue your journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-3"
        >
          <div className="space-y-2">
            <label htmlFor="fullName" className=" font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
                transition duration-500 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className=" font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
                transition duration-500 ease-in-out"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className=" font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                placeholder-gray-400 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600
                transition duration-500 ease-in-out"
                placeholder="Enter your password"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className=" text-gray-500">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 hover:text-blue-600 hover:underline font-medium ml-1"
              >
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-block disabled:cursor-not-allowed rounded-lg bg-orange-500 px-8 py-3  font-medium text-white
              transition duration-200 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2
              focus:ring-orange-500 focus:ring-offset-2"
            >
              Sign Up{" "}
              {loading && (
                <ImSpinner9
                  size={20}
                  className="animate-spin inline-block ml-2 my-auto"
                />
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="relative  h-64 w-full sm:h-96 lg:h-full lg:w-1/2  ">
        <img
          alt="Welcome"
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="absolute  inset-0 h-full w-full rounded-l-2xl object-cover"
        />
      </div>
    </section>
  );
}
