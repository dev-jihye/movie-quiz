import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { QUIZ_HASHTAGS_FRAGMENT, USER_FRAGMENT } from "../components/Fragments";
import Layout from "../components/Layout";
import ShowProfileInfo from "../components/Profile/ShowProfileInfo";
import UpdateProfileInfo from "../components/Profile/UpdateProfileInfo";
import QuizList from "../components/QuizList";

const ME_QUERY = gql`
  query Me($take: Int, $lastId: Int) {
    me {
      id
      username
      avatar
      quizs {
        isMine
        user {
          ...UserFragment
        }
        genre
        quizHashtags {
          ...QuizHashtagsFragment
        }
        answerRate
        totalLikes
      }
      conquests(take: $take, lastId: $lastId) {
        id
        quiz {
          id
        }
        user {
          ...UserFragment
        }
      }
      totalConquests
      totalTries
    }
  }
  ${USER_FRAGMENT}
  ${QUIZ_HASHTAGS_FRAGMENT}
`;

export default function MyProfile() {
  const [isEditable, setIsEditable] = useState(false);
  const { loading, error, data, refetch } = useQuery(ME_QUERY);
  useEffect(() => {
    refetch();
  }, [data]);
  console.log(data, "first");

  const onEditClick = () => {
    setIsEditable(true);
  };

  return (
    <Layout>
      <>
        {isEditable ? (
          <UpdateProfileInfo
            data={data}
            setIsEditable={setIsEditable}
            refetch={refetch}
          />
        ) : (
          <ShowProfileInfo data={data} setIsEditable={setIsEditable} />
        )}
        <div className="flex mb-4 sm:mb-8">
          <div className="w-1/2 md:w-1/4"></div>
          <div className="w-1/2 md:w-3/4">
            {/* {isEditable ? (
              ""
            ) : (
              <button
                onClick={onEditClick}
                className="px-3 py-1 mt-2 mb-4 ml-2 text-sm text-gray-400 border border-gray-400 rounded-md md:ml-4"
              >
                프로필 수정
              </button>
            )} */}
          </div>
        </div>
        <div className="border-b border-gray-200"></div>
        <div className="my-10">
          <h2 className="mb-3 text-lg font-medium">내가 낸 문제</h2>
          <QuizList />
        </div>
        <div className="border-b border-gray-200 "></div>
        <div className="my-10">
          <h2 className="mb-3 text-lg font-medium">틀린 문제</h2>
          <QuizList />
        </div>
      </>
    </Layout>
  );
}
