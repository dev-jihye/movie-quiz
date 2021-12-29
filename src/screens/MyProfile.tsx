import Layout from "../components/Layout";
import Quiz from "../components/Quiz";
import QuizList from "../components/QuizList";

export default function MyProfile() {
  return (
    <Layout>
      <>
        <div className="flex items-center mb-10">
          <div className="w-1/4">
            <img
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-32 w-32 rounded-full"
            />
          </div>
          <div>
            <p className="text-gray-600 text-lg">나는 Lv2. 영린이 👶🏻</p>
            <div className="flex items-center">
              <p className="text-xl mr-4">jjellyy</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div className="flex mt-6">
              <div>
                <p className="text-sm">도전 문제</p>
                <p className="text-gray-400 text-xl text-center">20</p>
              </div>
              <div className="ml-10">
                <p className="text-sm">맞춘 문제</p>
                <p className="text-gray-400 text-xl text-center">17</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-b border-gray-200"></div>
        <div className="my-10">
          <h2 className="text-xl font-bold">내가 낸 문제</h2>
          <QuizList />
        </div>
        <div className=" border-b border-gray-200"></div>
        <div className="my-10">
          <h2 className="text-xl font-bold">틀린 문제</h2>
          <QuizList />
        </div>
      </>
    </Layout>
  );
}
