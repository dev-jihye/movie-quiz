import { useCallback, useEffect, useRef } from "react";
import { isQuizLoadEndVar } from "../../makeVars/QuizVars";
import { bgColors } from "../../utils/BgColors";
import { showProfile_showUser_quizTries } from "../../__generated__/showProfile";
import Quiz from "../Quiz";

interface IuserQuizTry {
  quizs: showProfile_showUser_quizTries[] | undefined;
  fetchMore: Function;
}

export default function UserQuizTry({ quizs, fetchMore }: IuserQuizTry) {
  const loaderRef = useRef<any>();

  const handleObserver = useCallback(
    async (entries) => {
      const isQuizLoadEnd = isQuizLoadEndVar();
      if (isQuizLoadEnd) {
        return;
      }
      const target = entries[0];
      if (quizs && target.isIntersecting) {
        const lastId = quizs[quizs.length - 1].id;
        const more = await fetchMore({
          variables: {
            lastId,
          },
        });
        console.log(more.data.showUser.quizTries);
        if (more?.data?.showUser?.quizTries?.length === 0) {
          //더 이상 불러오지 않게 함
          isQuizLoadEndVar(true);
        }
      }
    },
    [quizs]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, [handleObserver]);

  return (
    <div className="grid gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
      {quizs?.length === 0 && <p>도전 문제가 없습니다.</p>}
      {quizs?.map((post, index) => {
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
