import Layout from "../components/Layout";
import Comment from "../components/Comment";
import { gql, useQuery } from "@apollo/client";

export default function Result() {
  return (
    <Layout>
      <>
        <div className="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3">jelly</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
            드라마
          </span>
          <p className="text-sm text-gray-600">정답률 : 60%</p>
        </div>
        <div>
          <p className="mt-10 text-3xl font-bold text-center">
            🎉 정답입니다 🎉
          </p>
        </div>

        <div className="flex justify-between m-2 mt-10 text-gray-600 lg:mt-16">
          <p>#실화배경 #한국영화 #빈칸채우기</p>
        </div>
        <div className="mt-10">
          <Comment />
        </div>
      </>
    </Layout>
  );
}
