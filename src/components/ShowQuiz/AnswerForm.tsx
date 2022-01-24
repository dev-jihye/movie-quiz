import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { apolloClient } from "../../apolloClient";

const QUIZ_TRY_MUTATION = gql`
  mutation quizTry($quizTryId: Int!, $answer: String!) {
    quizTry(id: $quizTryId, answer: $answer) {
      ok
      error
      result
    }
  }
`;
export default function AnswerForm({
  showQuiz,
  setIsAnswer,
  setIsCorrect,
  setTryError,
}: any) {
  const param = useParams();
  const { register, handleSubmit } = useForm();

  const onTryCompleted = (data: any) => {
    setIsAnswer(true);
    if (data?.quizTry?.ok) {
      if (!data.quizTry.result) {
        //문제를 풀었는데 정답이 아닌 경우
        apolloClient.cache.modify({
          id: `Quiz:${showQuiz.id}`,
          fields: {
            nextTry(prev, { readField }) {
              if (readField("isWinner")) {
                return 0;
              } else {
                return 300;
              }
            },
          },
        });
      } else {
        //문제를 풀어서 맞춘 경우
        apolloClient.cache.modify({
          id: `Quiz:${showQuiz.id}`,
          fields: {
            isWinner() {
              return true;
            },
          },
        });
      }
      setIsCorrect(data.quizTry.result);
    } else {
      setTryError(data.quizTry.error);
    }
  };

  const [quizTryMutation] = useMutation(QUIZ_TRY_MUTATION, {
    onCompleted: onTryCompleted,
  });

  const onAnswerClick = ({ index }: any) => {
    quizTryMutation({
      variables: {
        quizTryId: parseInt(param.id as string),
        answer: (index + 1).toString(),
      },
    });
  };
  const onSubmit = (data: any) => {
    quizTryMutation({
      variables: {
        quizTryId: parseInt(param.id as string),
        answer: data.subjectiveAnswer,
      },
    });
  };
  return (
    <>
      {showQuiz?.type === "subjective" ? (
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-20">
          <form
            className="w-full text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("subjectiveAnswer", { required: true })}
              type="text"
              placeholder="정답"
              className="w-3/4 border-gray-300 rounded-md sm:w-1/2 focus:border-[#ef7676] focus:ring-[#ef7676]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 ml-2 text-sm font-medium text-white bg-[#ef7676] border border-transparent rounded-md shadow-sm hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ef7676]"
            >
              제출
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 sm:mt-10 lg:mt-20">
          <ul className="grid grid-cols-2">
            {showQuiz?.choice.map((item: any, index: any) => (
              <li
                key={index}
                value={index}
                onClick={() => onAnswerClick({ index })}
                className="p-6 m-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}