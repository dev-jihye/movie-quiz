import { ReactChild, ReactChildren } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTE } from "../constance";
import Loading from "./Loading";
import Nav from "./Nav";

interface ILayout {
  children: ReactChild | ReactChildren | undefined | null;
  loading?: boolean;
}

export default function Layout({ children, loading }: ILayout) {
  const location = useLocation();
  return (
    <div>
      <Nav />
      <div className="px-4 pt-12 pb-20 bg-white sm:px-16 lg:pt-16 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto sm:max-w-4xl">
          {loading ? <Loading loading={loading} /> : children}
        </div>
        {location.pathname === "/" && (
          <Link
            to={ROUTE.CREATE_QUIZ}
            className="fixed hidden right-2 sm:block bottom-2 md:bottom-5 md:right-5 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 opacity-80 hover:opacity-100"
              viewBox="0 0 20 20"
              fill="#f56363"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
