import { IoIosArrowBack } from "react-icons/io";
import profile from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import useUserStore from "../store/userStore";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photo_url: user?.photo_url || "",
    email: user?.email || "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showErrorToast({ text: "Name and Email are required" });
      return;
    }
    await updateProfile(formData);
    navigate("/");
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="bg-[#162039] p-10 rounded-xl flex justify-center flex-col shadow-lg w-full md:w-6/12">
        {/* BACK BUTTON */}
        <button
          className="text-white font-semibold text-lg flex items-center gap-1 hover:text-primary"
          onClick={() => navigate("/")}
        >
          <IoIosArrowBack className="text-2xl" />
          Edit Profile
        </button>

        {/* FORM */}
        <div className="my-5">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
              <img
                src={formData?.photo_url ? formData?.photo_url : profile}
                alt="Profile Image"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <label
                htmlFor="photo_url"
                className="block mb-2 text-sm font-medium text-white"
              >
                Profile URL
              </label>
              <input
                type="text"
                id="photo_url"
                className="text-white bg-transparent border border-[#D6B89D] sm:text-sm rounded-xl active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2.5 px-3 caret-primary"
                placeholder="<Image URL>"
                name="photo_url"
                value={formData?.photo_url}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="text-white bg-transparent border border-[#D6B89D] sm:text-sm rounded-xl active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2.5 px-3 caret-primary"
                placeholder="Name"
                required
                value={formData?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-white bg-transparent border border-[#D6B89D] sm:text-sm rounded-xl active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2.5 px-3 caret-primary"
                placeholder="Email"
                autoFocus
                autoComplete="email"
                value={formData?.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="text-white bg-transparent border border-[#D6B89D] sm:text-sm rounded-xl active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2.5 px-3 pr-10 caret-primary"
                autoComplete="password"
                value={formData?.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-[28px] flex items-center px-3"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <svg
                    fill="#D6B89D"
                    className="w-5 h-5 hover:fill-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                ) : (
                  <svg
                    fill="#D6B89D"
                    className="w-5 h-5 hover:fill-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                )}
              </button>
            </div>
            {/* SUBMIT BUTTON */}
            <Button name="Save" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
