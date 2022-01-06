import Quiz from "./Quiz";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { shouldRefetchVar } from "../makeVars/QuizVars";

const SHOW_QUIZS_QUERY = gql`
  query showQuizs {
    showQuizs {
      id
      user {
        id
        avatar
        username
      }
      genre
      quizHashtags {
        hashtag
      }
      answerRate
      totalLikes
    }
  }
`;

export default function QuizList() {
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZS_QUERY);
  useEffect(() => {
    const shouldRefetch = shouldRefetchVar();
    if (shouldRefetch) {
      refetch();
      shouldRefetchVar(false);
    }
  }, []);

  return loading ? null : (
    <div className="grid gap-8 pb-4 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-5">
      {data?.showQuizs?.map((post: any, index: number) => (
        <Quiz key={index} post={post} />
      ))}
    </div>
  );
}
