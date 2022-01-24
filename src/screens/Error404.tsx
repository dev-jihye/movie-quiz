import { Link } from "react-router-dom";

export default function Error404({ url = "/" }) {
  return (
    <>
      <div className="min-h-full px-4 py-20 bg-white sm:px-6 sm:py-40 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold sm:text-5xl text-[#d93826]">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button>
                  <Link
                    to={url}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ef7676] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    홈으로 가기
                  </Link>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
