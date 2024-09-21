/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../redux/features/Auth/atuhApi";

import { toast } from "sonner";
import uploadImageToCloudinary from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [addSignUp, { isLoading }] = authApi.useSignUpMutation();
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { image, ...rest } = data;
    try {
      setIsImageLoading(true);
      const userImage = await uploadImageToCloudinary(image);
      console.log(userImage);
      const modifiedUserData = {
        ...rest,
        image: userImage,
        role: "user",
      };
      console.log(modifiedUserData);

      await addSignUp(modifiedUserData).unwrap();
      toast.success("Registration successful!");
      reset();
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[400px] w-full">
        <div
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/view-car-running-high-speed_23-2150635415.jpg?t=st=1726846257~exp=1726849857~hmac=1ffea6dab8c2f9f99f6240a6bbf3e45f86f8706f04e5ebaf62b8af8aaf011c6b&w=1380')",
            backgroundAttachment: "fixed",
            backgroundSize: "center",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            {/* Form Section */}
            <div className="w-full md:w-1/2 bg-slate-100	 p-8 rounded-lg shadow-md">
              <h2 className="text-4xl font-serif font-bold text-center text-black mb-8">
                Create New Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name and Email Fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label htmlFor="name" className="block text-black mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500">Name is required</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-black mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      {...register("email", {
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.type === "required"
                          ? "Email is required"
                          : "Invalid email address"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password and Confirm Password Fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="password" className="block text-black mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.type === "required"
                          ? "Password is required"
                          : "Password must be at least 6 characters"}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-black mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {String(errors.confirmPassword.message)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      Phone number is required
                    </span>
                  )}
                </div>

                {/* Upload Image Field */}
                <div className="mb-4">
                  <label htmlFor="image" className="block text-black mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    {...register("image")}
                  />
                  {errors.image && (
                    <span className="text-red-500">Image is required</span>
                  )}
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 leading-tight"
                    {...register("terms", { required: true })}
                  />
                  <label htmlFor="terms" className="text-black">
                    I agree to the{" "}
                    <a
                      href="https://example.com/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Terms & Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <span className="text-red-500">
                      You must agree to continue
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full mt-4 py-3 rounded-md transition duration-200 ${
                    isLoading || isImageLoading
                      ? "bg-green-600"
                      : "bg-green-500	 hover:bg-green-600"
                  } text-white flex items-center justify-center`}
                  disabled={isLoading || isImageLoading}
                >
                  {isLoading || isImageLoading ? (
                    <>
                      <span className="loader-icon"></span>
                      <span className="ml-2">Registering...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              {/* Additional Links */}
              <p className="mt-4 text-center text-black">
                Already have an account?
                <a href="/login" className="text-blue-400 ml-2 hover:underline">
                  Please Login
                </a>
              </p>
            </div>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img
                src="https://img.freepik.com/free-vector/online-registration-concept-with-flat-design_23-2147976704.jpg?t=st=1726846310~exp=1726849910~hmac=3033ea3f26c24f4bc05cc0610b339c5fdaf05dc4d744e8bdd287e4bf0a63cb9a&w=740"
                alt="Registration"
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
