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
import Quiz from "../components/Quiz";
import { bgColors } from "../utils/BgColors";

const ME_QUERY = gql`
  query Me($take: Int) {
    me {
      ...UserFragment
      quizs(take: $take) {
        ...ShowQuizFragment
      }
      quizTries(take: $take) {
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
  const [isEditable, setIsEditable] = useState(false);
  const [active, setActive] = useState<number>(0);
  const { loading, data, refetch } = useQuery(ME_QUERY);
  useEffect(() => {
    refetch();
  }, [data]);

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
            <div className="grid gap-4 pb-4 lg:grid-cols-3 ">
              {data?.me?.quizs.length === 0 && <p>내가 낸 문제가 없습니다.</p>}
              {data?.me?.quizs?.map((post: any, index: number) => {
                let bgIndex = 0;
                if (index > bgColors.length - 1) {
                  bgIndex =
                    index -
                    bgColors.length * Math.floor(index / bgColors.length);
                } else {
                  bgIndex = index;
                }
                const bgColor = bgColors[bgIndex];
                return <Quiz key={index} post={post} bgColor={bgColor} />;
              })}
            </div>
          ) : (
            <div className="grid gap-4 pb-4 lg:grid-cols-3 ">
              {data?.me?.quizTries.length === 0 && <p>도전 문제가 없습니다.</p>}
              {data?.me?.quizTries?.map((post: any, index: number) => {
                let bgIndex = 0;
                if (index > bgColors.length - 1) {
                  bgIndex =
                    index -
                    bgColors.length * Math.floor(index / bgColors.length);
                } else {
                  bgIndex = index;
                }
                const bgColor = bgColors[bgIndex];
                return <Quiz key={index} post={post} bgColor={bgColor} />;
              })}
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}
