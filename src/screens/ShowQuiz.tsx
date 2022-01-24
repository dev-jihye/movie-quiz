import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Info from "../components/ShowQuiz/Info";
import QuizImg from "../components/ShowQuiz/QuizImg";
import AnswerForm from "../components/ShowQuiz/AnswerForm";
import QuizDropMenu from "../components/ShowQuiz/QuizDropMenu";
import QuizResult from "../components/ShowQuiz/QuizResult";
import Comment from "../components/Comment/CommentSection";
import Like from "../components/ShowQuiz/Like";
import { SHOW_QUIZ_FRAGMENT } from "../components/Fragments";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #d73c36;
`;

const SHOW_QUIZ_QUERY = gql`
  query showQuiz($id: Int!) {
    showQuiz(id: $id) {
      ...ShowQuizFragment
    }
  }
  ${SHOW_QUIZ_FRAGMENT}
`;

export default function ShowQuiz() {
  const param = useParams();
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZ_QUERY, {
    variables: {
      id: parseInt(param.id as string),
    },
  });
  const [isAnswer, setIsAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tryError, setTryError] = useState("");
  const [color, setColor] = useState("#d73c36");
  useEffect(() => {
    console.log(data?.showQuiz?.nextTry);
    if (data?.showQuiz) {
      if (data?.showQuiz?.isWinner) {
        setIsAnswer(true);
        setIsCorrect(true);
      } else {
        if (data?.showQuiz?.nextTry > 0) {
          setIsAnswer(true);
          setTryError(`${data.showQuiz.nextTry}초 후 다시 시도해주세요`);
        } else {
          setIsAnswer(false);
          setIsCorrect(false);
        }
      }
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout>
      <>
        {loading ? (
          <div className="my-32 sweet-loading">
            <BarLoader color={color} loading={loading} css={override} />
          </div>
        ) : (
          <>
            {data?.showQuiz && (
              <>
                <Info showQuiz={data?.showQuiz} />
                {isAnswer ? (
                  <QuizResult
                    setIsAnswer={setIsAnswer}
                    isCorrect={isCorrect}
                    tryError={tryError}
                  />
                ) : (
                  <>
                    <QuizImg showQuiz={data?.showQuiz} />
                    <AnswerForm
                      showQuiz={data?.showQuiz}
                      setIsAnswer={setIsAnswer}
                      setIsCorrect={setIsCorrect}
                      setTryError={setTryError}
                    />
                  </>
                )}

                <div className="flex items-center justify-between m-2 mt-10 text-gray-600 lg:mt-20">
                  <p className="text-sm sm:text-base">
                    {data?.showQuiz?.quizHashtags
                      ?.map((tag: any) => tag.hashtag)
                      .join(" ")}
                  </p>

                  <QuizDropMenu showQuiz={data?.showQuiz} />
                </div>
                {isAnswer && <Like showQuiz={data?.showQuiz} />}
                {isAnswer && <Comment />}
              </>
            )}
          </>
        )}
      </>
    </Layout>
  );
}
