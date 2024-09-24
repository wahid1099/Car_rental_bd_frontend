import { FaUser } from "react-icons/fa6";
import { userApi } from "../../../redux/features/user/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/Auth/AuthSlice";
import avatar from "../../../assets/images.jpeg";
const Avatar = () => {
  const token = useAppSelector(useCurrentToken);

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  return (
    <div className="flex items-center">
      {user ? (
        <img
          className="w-36 h-36 object-cover rounded-full border-4 border-indigo-500 shadow-md"
          src={user?.image || avatar} // Replace with your custom image path
          alt={user?.name || "User Avatar"} // Fallback alt text
        />
      ) : (
        <FaUser className="h-8 w-8 rounded-full text-gray-500" />
      )}
    </div>
  );
};

export default Avatar;
