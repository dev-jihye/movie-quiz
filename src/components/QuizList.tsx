import Quiz from "./Quiz";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "#실화배경 #한국영화 #빈칸채우기",
    href: "#",
    card: {
      color: "bg-teal-400",
      href: "/",
    },
    category: {
      name: "Drama",
      href: "#",
      color: "bg-gray-50 text-slate-900",
    },
    correct: "20%",
    datetime: "2020-03-16",
    author: {
      name: "Paul York",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    like: "6",
  },
  {
    id: 2,
    title: "#디즈니 #감동 #어드벤쳐 #희망적인 #사랑스러운",
    href: "#",
    card: {
      color: "bg-violet-400",
      href: "/",
    },
    category: {
      name: "Animation",
      href: "#",
      color: "bg-gray-50 text-slate-900",
    },
    correct: "70%",
    datetime: "2020-03-10",
    author: {
      name: "Dessie Ryan",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    like: "4",
  },
  {
    id: 3,
    title: "#아름다운배경 #첫사랑 #설원 #편지",
    href: "#",
    card: {
      color: "bg-fuchsia-400",
      href: "/",
    },
    category: {
      name: "Romance",
      href: "#",
      color: "bg-gray-50 text-slate-900",
    },
    correct: "52%",
    datetime: "2020-02-12",
    author: {
      name: "Easer Collins",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    like: "11",
  },
];

export default function QuizList() {
  return (
    <div className="bg-white pt-12 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-6xl">
        <div className="grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post, index) => (
            <Quiz key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
