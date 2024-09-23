import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../../redux/features/Auth/atuhApi";
import uploadImageToCloudinary from "../../../utils/uploadImage";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../redux/features/user/userApi";

const UpdateProfile = () => {
  const { register, handleSubmit } = useForm();
  const { data: user } = authApi.useGetMeQuery(undefined);
  const [edit, setEdit] = useState(false);
  const [updateUser] = userApi.useUpdateUserMutation();

  const handleEditIcon = () => {
    setEdit(!edit);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { image, ...rest } = data;
    const userImage = await uploadImageToCloudinary(image);

    const modifiedUserData = {
      ...rest,
      image: userImage,
    };

    try {
      const res = await updateUser(modifiedUserData);
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setEdit(!edit);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 pb-4 border-b-2 border-dashed flex items-center justify-between">
        <h1 className="capitalize font-bold text-3xl text-gray-800">
          Update <span className="text-red-600">Profile</span>
        </h1>
        <div onClick={handleEditIcon} className="cursor-pointer">
          {edit ? (
            <RxCross2 className="w-6 h-6 text-red-500 hover:text-red-700 transition" />
          ) : (
            <FaEdit className="w-6 h-6 text-blue-500 hover:text-blue-700 transition" />
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Name
                <input
                  {...register("name")}
                  type="text"
                  className="input w-full mt-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-4 py-2 text-gray-800"
                  defaultValue={user?.data?.name}
                  disabled={!edit}
                />
              </label>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Email
                <input
                  type="text"
                  defaultValue={user?.data?.email}
                  className="input w-full mt-2 border border-gray-300 bg-gray-100 cursor-not-allowed rounded px-4 py-2 text-gray-800"
                  readOnly
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Phone Number
                <input
                  type="text"
                  className="input w-full mt-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-4 py-2 text-gray-800"
                  defaultValue={user?.data?.phone}
                  disabled={!edit}
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are allowed",
                    },
                    minLength: {
                      value: 11,
                      message: "Must be an 11-digit number",
                    },
                  })}
                />
              </label>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Address
                <input
                  type="text"
                  placeholder="Street, City, State"
                  defaultValue={user?.data?.address}
                  className="input w-full mt-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-4 py-2 text-gray-800"
                  disabled={!edit}
                  {...register("address")}
                />
              </label>
            </div>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Image
              <input
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full mt-2 border border-gray-300 focus:outline-none rounded px-4 py-2 text-gray-800"
                disabled={!edit}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Update"
              className={`w-full py-3 px-6 rounded text-white font-semibold transition ${
                edit ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
              } cursor-pointer ${edit ? "" : "cursor-not-allowed"}`}
              disabled={!edit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
