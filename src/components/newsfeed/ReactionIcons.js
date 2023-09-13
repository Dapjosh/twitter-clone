/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  BsBarChart,
  FaRegComment,
  FiShare,
} from "../../constant/icons";

export default function ReactionIcons({
  post,
  handlePopup,
  handleCommentClick,
  existingUser,
  showPopUp,
  postCreator,
}) {
  const { retweets, likes } = post || {};

  const icons = [
    {
      icon: (
        <AiOutlineRetweet
          fontSize={18}
          className="text-gray-900 transition-none group-hover:text-green-500"
        />
      ),
      item: retweets,
      color: "green",
    },
    {
      icon: (
        <AiOutlineHeart
          fontSize={18}
          className="text-gray-900 transition-none group-hover:text-pink-500"
        />
      ),
      item: likes,
      color: "pink",
    },
  ];

  return (
    <div className="flex items-center justify-between pt-3 pr-2">
      <Link to="#" className="flex items-center gap-2 group">
        <div className="h-8 w-8 grid place-content-center rounded-full">
          <FaRegComment
            onClick={handleCommentClick}
            fontSize={18}
            className="text-gray-900 transition-none group-hover:text-blue-500"
          />
        </div>
        <p className="mt-[-2px] transition-none text-gray-900 group-hover:text-blue-500">
          {/* {comments} */}
        </p>
      </Link>
      {icons.map(({ icon, item, color }, i) => (
        <div className="flex items-center gap-2 group cursor-pointer" key={i}>
          <div className="h-8 w-8 grid place-content-center rounded-full">
            {icon}
          </div>
          <p
            className={`mt-[-2px] transition-none text-gray-900 group-hover:text-${color}-500`}
          >
            {item}
          </p>
        </div>
      ))}
      <div className="flex items-center gap-2 group relative cursor-pointer">
        <div
          className="h-8 w-8 grid place-content-center rounded-full"
          onClick={handlePopup}
        >
          <FiShare
            fontSize={18}
            className="text-gray-900 transition-none group-hover:text-blue-500"
          />
        </div>
        {/* Share post popup component */}
        <div
          className={`absolute z-[5] bottom-full min-w-full right-0 ${
            showPopUp ? "flex opacity-100" : "hidden opacity-0"
          } flex-col  bg-white shadow-sm shadow-gray-300 opacity-1 py-2 px-3`}
        >
          {["Bookmark", "Share the link", "Send via direct message"].map(
            (item) => (
              <div
                className="w-max rounded-sm hover:bg-gray-100 px-2 py-[4px] min-w-full "
                key={item}
              >
                <Link to className="text-black text-sm">
                  {item}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      {/* analytics button */}
      {postCreator === existingUser._id && (
        <Link
          to="/analytics"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="h-8 w-8 grid place-content-center rounded-full">
            <BsBarChart
              fontSize={18}
              className="transition-none group-hover:text-blue-700"
            />
          </div>
        </Link>
      )}
    </div>
  );
}
