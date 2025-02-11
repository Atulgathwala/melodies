import React, { useContext, useEffect, useState } from "react";
import { AUTHContextAPI } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../utility/Spinner/Spinner";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UpdatePicture = () => {
  let { authUser } = useContext(AUTHContextAPI);
  // let navigate = useNavigate();

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
      console.log(responseObj);

      updateProfile(authUser, {
        photoURL: responseObj?.url,
      });

      window.location.assign("/user-profile");

      toast.success("Profile Picture Updated Successfully");
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
    <section className="h-[98%] w-[100%] relative">
      <article className="bg-[#53063e]  absolute top-[10%] left-[30%] p-6 rounded-md  flex flex-col gap-5 items-center shadow-sm shadow-gray-400">
        <header className="">
          <h1 className="text-[#FCE9EC] text-[20px] font-[600] text-center">
            Update Profile Picture
          </h1>
        </header>
        <main>
          <img
            src={PreviewPicture}
            alt=""
            className="h-[250px] w-[250px] rounded-full"
          />
        </main>
        <footer>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col  w-[100%] gap-4  justify-center"
          >
            <div className="flex justify-center ">
              <input
                onChange={handlInputChange}
                type="file"
                className=" py-2 px-4 file:bg-red-500 file:py-2 file:px-4 file:rounded-[5px] file:mx-2 rounded-[5px] w-[90%] cursor-pointer file:cursor-pointer "
              />
            </div>
            <div>
              <button className="bg-gradient-to-r from-pink-500 to-blue-500 py-2 px-4 w-[100%] rounded-[9px] cursor-pointer">
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
