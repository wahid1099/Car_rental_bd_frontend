import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../../redux/features/Auth/atuhApi";
import uploadImageToCloudinary from "../../../utils/uploadImage";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../redux/features/user/userApi";
// import uploadImage from "../../utils/uploadImage";

const Profile = () => {
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
      if (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <div className=" mb-5 pb-5 border-b-2 border-dashed flex items-center justify-between">
        <h1 className="capitalize font-semibold text-3xl">
          Updat <span className="text-red-600">Profile</span>
        </h1>
        <div onClick={handleEditIcon} className="cursor-pointer">
          {edit ? (
            <RxCross2 className="w-6 h-6 text-accent"></RxCross2>
          ) : (
            <FaEdit className="w-6 h-6 text-accent"></FaEdit>
          )}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Name</span>
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="input w-full  focus:outline-none text-lg border border-gray-700  rounded px-4 py-2"
                  defaultValue={user?.data?.name}
                  disabled={edit ? false : true}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Email
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={user?.data?.email}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 hover:cursor-not-allowed"
                  readOnly
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-4">
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Phone Number
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={user?.data?.phone}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 "
                  disabled={edit ? false : true}
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only number required",
                    },
                    minLength: {
                      value: 11,
                      message: "11 digit number need",
                    },
                  })}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Address
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="street, city, state"
                  defaultValue={user?.data?.address}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 "
                  disabled={edit ? false : true}
                  {...register("address")}
                />
              </label>
            </div>
          </div>

          <div className="mt-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg font-semibold">Image</span>
              </div>
              <input
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full  border border-gray-700 rounded px-4 py-2"
                disabled={edit ? false : true}
              />
            </label>
          </div>

          <div className="mt-5">
            <input
              type="submit"
              value="Update"
              className="file-input file-input-bordered w-full font-bold rounded px-4 py-2 cursor-pointer disabled:cursor-not-allowed bg-red-400 hover:bg-red-600 transition-all duration-300"
              disabled={edit ? false : true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
