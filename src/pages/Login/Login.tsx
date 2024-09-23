/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { authApi } from "../../redux/features/Auth/atuhApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addLogin, { isLoading }] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await addLogin(data).unwrap();
      verifyToken(res.token);

      dispatch(setUser({ user: res.data, token: res.token }));
      toast.success("Logged in", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });

      console.log("Navigating to home...");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to Rent A Car
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              {...register("password", { required: true })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition duration-200 ${
              isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white flex items-center justify-center`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loader-icon"></span>
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Additional Links */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-2 hover:underline">
            Please Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
