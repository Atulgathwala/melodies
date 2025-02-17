import React, { useContext, useEffect, useState } from "react";
import { AUTHContextAPI } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../utility/Spinner/Spinner";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UpdatePicture = () => {
  let { authUser } = useContext(AUTHContextAPI);

  let [isLoading, setIsloading] = useState(false);

  let [PreviewPicture, setPreviewPicture] = useState(authUser?.photoURL);
  let [pictureFile, setPictureFile] = useState(null);

  let handlInputChange = (e) => {
    let picFile = e.target.files[0];

    if (picFile) {
      let reader = new FileReader();
      reader.readAsDataURL(picFile);
      reader.onloadend = (e) => {
        setPreviewPicture(e.target.result);
      };
    }

    setPictureFile(picFile);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      let formData = new FormData();
      formData.append("file", pictureFile);
      formData.append("upload_preset", "melodies_music");
      formData.append("cloud_name", "dasa3kzyf");

      let CloudinaryResponse = await window.fetch(
        "https://api.cloudinary.com/v1_1/dasa3kzyf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      let responseObj = await CloudinaryResponse.json();

      updateProfile(authUser, {
        photoURL: responseObj?.url,
      });

      toast.success("Profile Picture Updated Successfully");
      window.location.assign("/user-profile");
    } catch (err) {
      console.log(err);
      toast.error(err.code.slice(5));
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    setPreviewPicture(authUser?.photoURL);
  }, [authUser?.photoURL]);

  return (
    <section className="h-[98%] w-[100%] relative flex items-center justify-center bg-[#181818]">
      <article className="bg-[#232323] w-[90%] md:w-[500px] p-6 rounded-2xl shadow-2xl shadow-black/50 flex flex-col gap-5 items-center text-white">
        <header className="text-center">
          <h1 className="text-[24px] font-semibold text-[#F4A261]">
            Update Profile Picture
          </h1>
        </header>

        <main>
          <img
            src={PreviewPicture}
            alt="Profile"
            className="h-[200px] w-[200px] rounded-full object-cover shadow-md"
          />
        </main>

        <footer className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <div className="w-full">
              <input
                onChange={handlInputChange}
                type="file"
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#403e6a] file:text-white
                  hover:file:bg-[#5A52D3]
                  cursor-pointer"
              />
            </div>
            <div className="w-full">
              <button className="w-full py-3 px-6 rounded-xl bg-[#403e6a] text-white font-semibold shadow-lg  hover:bg-[#5A52D3] transition duration-300">
                Upload Picture
              </button>
            </div>
          </form>
        </footer>
      </article>

      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePicture;
