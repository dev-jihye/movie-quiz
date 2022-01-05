import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const SHOW_QUIZ_QUERY = gql`
  query showQuiz($id: Int!) {
    showQuiz(id: $id) {
      id
      user {
        id
        username
        avatar
      }
      genre
      quizHashtags {
        hashtag
      }
      answerRate
      totalLikes
      content
      image
      choice
      type
    }
  }
`;
export default function ShowQuiz() {
  const param = useParams();
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZ_QUERY, {
    variables: {
      id: parseInt(param.id as string),
    },
  });
  console.log(data);
  return (
    <Layout>
      <>
        {loading ? (
          "loading..."
        ) : (
          <>
            <div className="flex items-center mb-4">
              <img
                src={
                  data?.showQuiz?.user?.avatar ||
                  encodeURI(
                    `https://ui-avatars.com/api/?name=${data?.showQuiz?.user?.username}&color=7F9CF5&background=EBF4FF`
                  )
                }
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3">{data?.showQuiz?.user?.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="inline-flex text-sm lg:text-base items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
                {data?.showQuiz?.genre}
              </span>
              <p className="text-sm text-gray-600">
                정답률 : {data?.showQuiz?.answerRate}%
              </p>
            </div>
            <div className="flex flex-col items-center justify-between mt-10">
              <p className="inline-block sm:text-xl">
                {data?.showQuiz?.content}
              </p>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-16">
              <ul className="flex">
                <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                  {data?.showQuiz?.choice[0]}
                </li>
                <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                  {data?.showQuiz?.choice[1]}
                </li>
              </ul>
              <ul className="flex">
                <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                  {data?.showQuiz?.choice[2]}
                </li>
                <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                  {data?.showQuiz?.choice[3]}
                </li>
              </ul>
            </div>

            <div className="flex justify-between m-2 mt-10 text-gray-600 lg:mt-16">
              <p className="text-sm sm:text-base">
                {data?.showQuiz?.quizHashtags?.map((tag: any) => tag.hashtag)}
              </p>
            </div>
          </>
        )}
      </>
    </Layout>
  );
}
