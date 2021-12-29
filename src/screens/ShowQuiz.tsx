import { isLoggedInVar } from "../apolloClient";
import Layout from "../components/Layout";
import Report from "../components/Report";

export default function ShowQuiz() {
  return (
    <Layout>
      <>
        <div className="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3">jjellyy</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
            드라마
          </span>
          <p className="text-sm text-gray-600">정답률 : 60%</p>
        </div>
        <div className="flex flex-col items-center justify-between mt-10">
          <p className="inline-block sm:text-xl">
            다음 영화 대사의 빈 칸에 알맞은 단어는?
          </p>
          <p className="inline-block mt-4 sm:text-xl">
            호의가 계속 되면은 그게 ㅡㅡ 인 줄 알아요
          </p>
        </div>
        <div className="mt-8 sm:mt-10 lg:mt-16">
          <ul className="flex">
            <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
              둘리
            </li>
            <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
              마블리
            </li>
          </ul>
          <ul className="flex">
            <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
              대리
            </li>
            <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
              권리
            </li>
          </ul>
        </div>
        <div className="flex justify-between m-2 mt-10 text-gray-600 lg:mt-16">
          <p className="text-sm sm:text-base">
            #실화배경 #한국영화 #빈칸채우기
          </p>
          <Report />
        </div>
      </>
    </Layout>
  );
}
