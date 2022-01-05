import Quiz from "./Quiz";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

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
  console.log(data);
  return loading ? null : (
    <div className="grid gap-16 pb-4 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
      {data?.showQuizs?.map((post: any, index: number) => (
        <Quiz key={index} post={post} />
      ))}
    </div>
  );
}
