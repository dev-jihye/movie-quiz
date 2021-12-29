import Layout from "../components/Layout";

export default function Contest() {
  return (
    <Layout>
      <div>
        <div className="mb-8">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-amber-200">
            12월
          </span>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-amber-200">
            11월
          </span>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-amber-200">
            10월
          </span>
        </div>
        <div className="p-4 rounded-lg bg-purple-200 mb-4">
          <div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium m-4 bg-white">
              영화 퀴즈 콘테스트
            </span>
          </div>
          <p className="text-lg font-semibold mx-4 mt-4">
            #SF모음 #우주 #외계인
          </p>
          <div className="flex space-x-1 text-sm text-gray-500 justify-between m-4 items-center">
            <span>439명이 참여중</span>
            <span>❤️ 55</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
