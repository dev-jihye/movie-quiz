import Layout from "../components/Layout";

export default function ShowQuiz() {
  return (
    <Layout>
      <div className="bg-white pt-12 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-4xl">
          <div className="flex items-center mb-4">
            <img
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-3">jjellyy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
              드라마
            </span>
            <p className="text-sm text-gray-600">정답률 : 60%</p>
          </div>
        </div>

        <div className="relative max-w-lg mx-auto lg:max-w-4xl my-8 sm:my-10 lg:my-16">
          <div className="items-center justify-between flex flex-col">
            <p className="inline-block text-xl">
              다음 영화 대사의 빈 칸에 알맞은 단어는?
            </p>
            <p className="inline-block text-xl mt-4">
              호의가 계속 되면은 그게 ㅡㅡ 인 줄 알아요
            </p>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-16">
            <ul className="flex">
              <li className="w-1/2 m-2 p-6 bg-gray-100 rounded-md cursor-pointer">
                1. 둘리
              </li>
              <li className="w-1/2 m-2 p-6 bg-gray-100 rounded-md cursor-pointer">
                2. 마블리
              </li>
            </ul>
            <ul className="flex">
              <li className="w-1/2 m-2 p-6 bg-gray-100 rounded-md cursor-pointer">
                3. 대리
              </li>
              <li className="w-1/2 m-2 p-6 bg-gray-100 rounded-md cursor-pointer">
                4. 권리
              </li>
            </ul>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-16 text-gray-600 m-2 flex justify-between">
            <p>#실화배경 #한국영화 #빈칸채우기</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
}
