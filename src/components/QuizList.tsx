import Quiz from "./Quiz";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { shouldRefetchVar } from "../makeVars/QuizVars";
import { USER_FRAGMENT } from "./Fragments";

const SHOW_QUIZS_QUERY = gql`
  query showQuizs($take: Int, $lastId: Int) {
    showQuizs(take: $take, lastId: $lastId) {
      id
      user {
        ...UserFragment
      }
      genre
      quizHashtags {
        id
        hashtag
      }
      answerRate
      totalLikes
    }
  }
  ${USER_FRAGMENT}
`;

export default function QuizList() {
  const bgColors = [
    { bgColor: "#EC6985 ", genreBgColor: "#fdb4b4" },
    { bgColor: "#EF95A0", genreBgColor: "#ffdada" },
    { bgColor: "#F4C16F", genreBgColor: "#f9f4d2" },
    { bgColor: "#529FA8", genreBgColor: "#99dee5" },
    { bgColor: "#7DCDD3", genreBgColor: "#c8eff3" },
  ];
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZS_QUERY, {
    variables: { take: 15 },
  });
  useEffect(() => {
    const shouldRefetch = shouldRefetchVar();
    if (shouldRefetch) {
      refetch();
      shouldRefetchVar(false);
    }
  }, []);

  return loading ? null : (
    <div className="grid gap-8 pb-4 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-5">
      {data?.showQuizs?.map((post: any, index: number) => {
        let bgIndex = 0;
        if (index > bgColors.length - 1) {
          bgIndex =
            index - bgColors.length * Math.floor(index / bgColors.length);
        } else {
          bgIndex = index;
        }
        const bgColor = bgColors[bgIndex];
        console.log(bgColor);
        //const genreBgColor = bgColors[]
        return <Quiz key={index} post={post} bgColor={bgColor} />;
      })}
    </div>
  );
}
