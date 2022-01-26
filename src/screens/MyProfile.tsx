import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  QUIZ_HASHTAGS_FRAGMENT,
  SHOW_QUIZ_FRAGMENT,
  USER_FRAGMENT,
} from "../utils/Fragments";
import Layout from "../components/Layout";
import ShowProfileInfo from "../components/Profile/ShowProfileInfo";
import UpdateProfileInfo from "../components/Profile/UpdateProfileInfo";
import { showProfile } from "../__generated__/showProfile";
import UserQuiz from "../components/Profile/UserQuiz";
import UserQuizTry from "../components/Profile/UserQuizTry";
import { useParams } from "react-router-dom";
import { isQuizLoadEndVar } from "../makeVars/QuizVars";

const SHOW_PROFILE_QUERY = gql`
  query showProfile($id: Int!, $take: Int, $lastId: Int) {
    showUser(id: $id) {
      ...UserFragment
      quizs(take: $take, lastId: $lastId) {
        ...ShowQuizFragment
      }
      quizTries(take: $take, lastId: $lastId) {
        ...ShowQuizFragment
      }
      totalConquests
      totalTries
    }
  }
  ${USER_FRAGMENT}
  ${QUIZ_HASHTAGS_FRAGMENT}
  ${SHOW_QUIZ_FRAGMENT}
`;

export default function MyProfile() {
  const params = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [active, setActive] = useState<number>(0);
  const { loading, data, refetch, fetchMore } = useQuery<showProfile>(
    SHOW_PROFILE_QUERY,
    {
      variables: {
        take: 9,
        id: parseInt(params.id as string),
      },
      onCompleted: () => {
        isQuizLoadEndVar(false);
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [active]);

  return (
    <Layout loading={loading}>
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
          <div className="w-1/2 md:w-3/4"></div>
        </div>
        <div className="border-b border-gray-200"></div>
        <div className="my-10">
          <ul className="flex justify-center mb-6 space-x-8 text-base sm:text-lg">
            <li
              onClick={() => setActive(0)}
              className={`${
                active === 0
                  ? "border-b-2 border-[#ef6767] font-medium cursor-pointer"
                  : "border-0 text-gray-500 cursor-pointer"
              }`}
            >
              내가 낸 문제
            </li>
            <li
              onClick={() => setActive(1)}
              className={`${
                active === 1
                  ? "border-b-2 border-[#ef6767] font-medium cursor-pointer"
                  : "border-0 text-gray-500 cursor-pointer"
              }`}
            >
              도전 문제
            </li>
          </ul>
          {active === 0 ? (
            <UserQuiz quizs={data?.showUser?.quizs} fetchMore={fetchMore} />
          ) : (
            <UserQuizTry
              quizs={data?.showUser?.quizTries}
              fetchMore={fetchMore}
            />
          )}
        </div>
      </>
    </Layout>
  );
}
