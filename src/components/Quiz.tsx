import { Link } from "react-router-dom";
import { ROUTE } from "../constance";

export default function Quiz({ post, bgColor }: any) {
  const hashtags = post.quizHashtags.map((item: any) => item.hashtag);
  return (
    <div
      className="rounded-lg"
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
        <p className="mx-4 mt-4 font-semibold">{hashtags.join(" ")}</p>
        <div className="flex items-center mx-4 mt-6">
          <div className="flex-shrink-0">
            <span className="sr-only">{post.user.username}</span>
            <img
              className="rounded-full w-9 h-9"
              src={
                post.user.avatar ||
                encodeURI(
                  `https://ui-avatars.com/api/?name=${post.user.username}&color=7F9CF5&background=EBF4FF`
                )
              }
              alt=""
            />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium ">{post.user.username}</p>
          </div>
        </div>
        <div className="flex justify-between m-4 space-x-1 text-sm ">
          <span>정답률&nbsp;&nbsp;{post.answerRate}%</span>
          <div className="flex mb-3">
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
  );
}
