import { Link } from "react-router-dom";
import { ROUTE } from "../constance";

export default function Quiz({ post }: any) {
  const hashtags = post.quizHashtags.map((item: any) => item.hashtag);

  return (
    <div className="rounded-lg">
      <Link to={`${ROUTE.QUIZ}/${post.id}`}>
        <div>
          <span
            className={
              "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium m-4"
            }
          >
            {post.genre}
          </span>
        </div>
        <p className="mx-4 mt-4 text-lg font-semibold">{hashtags.join(" ")}</p>
        <div className="flex items-center mx-4 mt-6">
          <div className="flex-shrink-0">
            <span className="sr-only">{post.user.username}</span>
            <img
              className="w-10 h-10 rounded-full"
              src={
                post.user.avatar ||
                encodeURI(
                  `https://ui-avatars.com/api/?name=${post.user.username}&color=7F9CF5&background=EBF4FF`
                )
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">
              {post.user.username}
            </p>
          </div>
        </div>
        <div className="flex justify-between m-4 space-x-1 text-sm text-gray-500">
          <time>정답률&nbsp;&nbsp;{post.answerRate}</time>
          <span>❤️ {post.totalLike}</span>
        </div>
      </Link>
    </div>
  );
}
