import Quiz from "./Quiz";
import { useCallback, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { isQuizLoadEndVar, shouldRefetchVar } from "../makeVars/QuizVars";
import { QUIZ_HASHTAGS_FRAGMENT, USER_FRAGMENT } from "../utils/Fragments";
import { bgColors } from "../utils/BgColors";
import { showQuizs } from "../__generated__/showQuizs";

const SHOW_QUIZS_QUERY = gql`
  query showQuizs($take: Int, $lastId: Int) {
    showQuizs(take: $take, lastId: $lastId) {
      id
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
  }
  ${USER_FRAGMENT}
  ${QUIZ_HASHTAGS_FRAGMENT}
`;

export default function QuizList() {
  const { loading, data, refetch, fetchMore } = useQuery<showQuizs>(
    SHOW_QUIZS_QUERY,
    {
      variables: { take: 15 },
      onCompleted: () => {
        isQuizLoadEndVar(false);
      },
    }
  );

  const loaderRef = useRef<any>();

  const handleObserver = useCallback(
    async (entries) => {
      const isQuizLoadEnd = isQuizLoadEndVar();
      if (isQuizLoadEnd) {
        return;
      }
      const target = entries[0];
      if (data?.showQuizs && target.isIntersecting) {
        const lastId = data.showQuizs[data.showQuizs.length - 1].id;
        const more = await fetchMore({
          variables: {
            lastId,
          },
        });
        if (more?.data?.showQuizs?.length === 0) {
          //더 이상 불러오지 않게 함
          isQuizLoadEndVar(true);
        }
      }
    },
    [data]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, [handleObserver]);

  useEffect(() => {
    const shouldRefetch = shouldRefetchVar();
    if (shouldRefetch) {
      refetch();
      shouldRefetchVar(false);
    }
  }, []);

  return loading ? null : (
    <div className="grid gap-4 pb-4 lg:grid-cols-3 ">
      {data?.showQuizs?.map((post, index) => {
        let bgIndex = 0;
        if (index > bgColors.length - 1) {
          bgIndex =
            index - bgColors.length * Math.floor(index / bgColors.length);
        } else {
          bgIndex = index;
        }
        const bgColor = bgColors[bgIndex];
        return <Quiz key={index} post={post} bgColor={bgColor} />;
      })}
      <div ref={loaderRef}></div>
    </div>
  );
}
