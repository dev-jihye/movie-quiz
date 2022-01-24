import { Link } from "react-router-dom";
import { ROUTE } from "../constance";
import { motion } from "framer-motion";
import { showQuizs_showQuizs } from "../__generated__/showQuizs";
import { IbgColors } from "../utils/BgColors";
import { getAvatar } from "../utils/utils";

interface Iquiz {
  post: showQuizs_showQuizs;
  bgColor: IbgColors;
}

export default function Quiz({ post, bgColor }: Iquiz) {
  const hashtags = post.quizHashtags?.map((item) => item.hashtag);

  return (
    <motion.div
      className="flex"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-full rounded-lg"
        style={{
          backgroundColor: bgColor.bgColor,
        }}
      >
        <Link to={`${ROUTE.QUIZ}/${post.id}`}>
          <div>
            <span
              className={
                "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium m-4 bg-white"
              }
              style={{
                backgroundColor: bgColor.genreBgColor,
              }}
            >
              {post.genre}
            </span>
          </div>
          <p className="mx-4 mt-4 font-semibold">{hashtags?.join(" ")}</p>
          <div className="flex items-center mx-4 mt-6">
            <div className="flex-shrink-0">
              <span className="sr-only">{post.user?.username}</span>
              <img
                className="object-cover rounded-full w-9 h-9"
                src={
                  post?.user?.avatar?.Location ||
                  getAvatar(post.user?.username || "")
                }
                alt=""
              />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium ">{post.user?.username}</p>
            </div>
          </div>
          <div className="flex items-center justify-between m-4 mt-3 space-x-1 text-sm">
            <span>정답률&nbsp;&nbsp;{post.answerRate}%</span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 20 20"
                fill="#d73c36"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1">{post?.totalLikes}</span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
