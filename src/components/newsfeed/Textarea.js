import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiImageAlt, BiVideo, CgMediaLive } from "../../constant/icons";
import users from "../../constant/users";

export default function Textarea() {
  const loggedInUser = "@Mohammadali003";
  const [file, setFile] = useState("");
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const handleImgfiles = (e) => {
    const { name } = e.target.files[0] || {};
    setFile(e.target.files);
    setFile(name);
  };

  const handleRemovefile = () => {
    inputRef.current.files = null;
    setFile("");
  };

  const handleChange = () => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  };

  const existingUser = users.find((u) => u.userName === loggedInUser);

  return (
    <div className="border-b-[.5px] border-gray-300">
      <div className="flex items-start gap-4 py-4 pt-3 px-4">
        <div>
          <img className="h-12 w-12 rounded-full" src={existingUser.img} alt="user" />
        </div>
        <form className="flex-1 mt-[2px]">
          <textarea
            rows="1"
            placeholder="What's on your mind"
            onChange={handleChange}
            ref={textRef}
            className="focus:outline-none outline-none resize-none w-full py-2 text-xl placeholder:text-gray-500 font-regular"
          />
          {file && (
            <div>
              {file}
              <button type="button" onClick={handleRemovefile}>
                X
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center pt-3 -ml-2">
              <div className="w-[34px] h-[34px] grid place-content-center hover:bg-gray-100 rounded-full">
                <label htmlFor="file" className="cursor-pointer">
                  <BiImageAlt fontSize={22} />
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImgfiles}
                    className="opacity-0 hidden h-[.1px] w-[.1px]"
                  />
                </label>
              </div>
              <Link
                to="/studio/upload-video"
                className="w-[34px] h-[34px] grid place-content-center hover:bg-gray-100 rounded-full"
              >
                <BiVideo fontSize={23} />
              </Link>
              <Link
                to="/studio/go-live"
                className="w-[34px] h-[34px] grid place-content-center hover:bg-gray-100 rounded-full"
              >
                <CgMediaLive fontSize={19} />
              </Link>
            </div>
            {/* <button
                            className="py-[6px] text-white font-semibold px-7 rounded-full bg-blue-600 hover:bg-blue-500"
                            type="button"
                        >
                            Post
                        </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
