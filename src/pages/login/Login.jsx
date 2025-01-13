import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ImSpinner9 } from "react-icons/im";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const email = e.target.email.value;
      const password = e.target.password.value;

      const result = await signIn(email, password);
      console.log({ result });
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.log({ error });
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        <a
          href="#"
          className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Google
          </span>
        </a>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or login with email
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              name="email"
              required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-600 focus:ring-opacity-40 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </a>
            </div>

            <input
              id="loggingPassword"
              name="password"
              required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-orange-600 focus:ring-opacity-40 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Login
              {loading && (
                <ImSpinner9
                  className="animate-spin inline-block ml-1 my-auto"
                  size={20}
                />
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to={"/register"}
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
    // <section className="relative  flex flex-row-reverse flex-wrap lg:h-[550px] rounded-2xl shadow-2xl ">
    //   <div className="w-full   px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    //     <div className="mx-auto max-w-lg text-center">
    //       <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
    //       <p className="mt-4 text-gray-500">
    //         Sign in to access your account and continue your journey
    //       </p>
    //     </div>

    //     <form
    //       onSubmit={handleLogin}
    //       className="mx-auto mb-0 mt-8 max-w-md space-y-6"
    //     >
    //       <div className="space-y-2">
    //         <label htmlFor="email" className=" font-medium text-gray-700">
    //           Email
    //         </label>
    //         <div className="relative">
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
    //             placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
    //             transition duration-500 ease-in-out"
    //             placeholder="Enter your email"
    //             required
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-2">
    //         <label htmlFor="password" className=" font-medium text-gray-700">
    //           Password
    //         </label>
    //         <div className="relative">
    //           <input
    //             type="password"
    //             id="password"
    //             name="password"
    //             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
    //             placeholder-gray-400 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600
    //             transition duration-500 ease-in-out"
    //             placeholder="Enter your password"
    //             required
    //           />
    //           <span className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-5 w-5 text-gray-400"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //               />
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    //               />
    //             </svg>
    //           </span>
    //         </div>
    //       </div>

    //       <div className="flex items-center justify-between">
    //         <p className=" text-gray-500">
    //           No account?{" "}
    //           <Link
    //             to={"/signup"}
    //             className="text-blue-600 hover:text-blue-600 hover:underline font-medium ml-1"
    //           >
    //             Sign up
    //           </Link>
    //         </p>

    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="inline-block disabled:cursor-not-allowed rounded-lg bg-orange-500 px-8 py-3  font-medium text-white
    //           transition duration-200 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2
    //           focus:ring-orange-500 focus:ring-offset-2"
    //         >
    //           Sign in{" "}
    //           {loading && (
    //             <ImSpinner9
    //               size={20}
    //               className="animate-spin inline-block ml-1 my-auto"
    //             />
    //           )}
    //         </button>
    //       </div>

    //       <div className="text-center">
    //         <a
    //           href="/forgot-password"
    //           className="text-sm text-gray-500 hover:text-blue-500 hover:underline"
    //         >
    //           Forgot your password?
    //         </a>
    //       </div>
    //     </form>
    //   </div>

    //   <div className="relative  h-64 w-full sm:h-96 lg:h-full lg:w-1/2  ">
    //     <img
    //       alt="Welcome"
    //       src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    //       className="absolute  inset-0 h-full w-full rounded-l-2xl object-cover"
    //     />
    //   </div>
    // </section>
  );
}
