import React from "react";
import posts from "../../constant/Posts";
import videos from "../../constant/videos";
import PostSection from "./PostSection";

export default function NewsFeed() {
  return (
    <div className="mt-2 bg-w relative">
      <PostSection posts={posts} videos={videos} />
    </div>
  );
}
