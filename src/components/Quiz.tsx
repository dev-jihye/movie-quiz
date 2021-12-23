import { Link } from "react-router-dom";
import { ROUTE } from "../constance";

interface QuizProps {
  post: {
    id: number;
    title: string;
    href: string;
    card: {
      color: string;
      href: string;
    };
    category: {
      name: string;
      href: string;
      color: string;
    };
    correct: string;
    datetime: string;
    author: {
      name: string;
      href: string;
      imageUrl: string;
    };
    like: string;
  };
}

export default function Quiz({ post }: QuizProps) {
  return (
    <div key={post.title} className={(post.card.color, "rounded-lg")}>
      <Link to={`${ROUTE.QUIZ}/${post.id}`}>
        <div>
          <span
            className={
              (post.category.color,
              "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium m-4")
            }
          >
            {post.category.name}
          </span>
        </div>
        <p className="text-xl font-semibold text-gray-500 mx-4 mt-4">
          {post.title}
        </p>
        <div className="mt-6 flex items-center mx-4">
          <div className="flex-shrink-0">
            <span className="sr-only">{post.author.name}</span>
            <img
              className="h-10 w-10 rounded-full"
              src={post.author.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">
              {post.author.name}
            </p>
            {/* <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div> */}
          </div>
        </div>
        <div className="flex space-x-1 text-sm text-gray-50 justify-between m-4">
          <time>정답률&nbsp;&nbsp;{post.correct}</time>
          <span>❤️ {post.like}</span>
        </div>
      </Link>
    </div>
  );
}
