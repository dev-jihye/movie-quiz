import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeBtn = styled.button`
  background: #ef7676;
  color: #fff;
`;

const RetryBtn = styled.button`
  background: #c3c3c3;
  color: #fff;
`;

export default function QuizResult({ setIsAnswer, isCorrect, tryError }: any) {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate("/");
  };
  return (
    <div>
      {tryError ? (
        <div className="my-16 text-xl text-center sm:my-20 sm:text-3xl">
          <p className="text-xl font-bold sm:text-3xl">🙅‍♀️ 틀렸습니다 🙅‍♀️</p>
          <p className="mt-2 text-base sm:text-lg">{tryError}</p>
          <HomeBtn
            className="justify-center px-4 py-2 mt-8 text-sm text-gray-500 rounded-md"
            onClick={onHomeClick}
          >
            홈으로 가기
          </HomeBtn>
          <RetryBtn
            className="justify-center px-4 py-2 mt-8 ml-3 text-sm text-gray-500 rounded-md"
            onClick={() => {
              setIsAnswer(false);
            }}
          >
            다시 풀기
          </RetryBtn>
        </div>
      ) : (
        <div className="block my-12 text-xl font-bold text-center sm:my-20 sm:text-3xl">
          {isCorrect ? <p>🎉 정답입니다 🎉</p> : <p>🙅‍♀️ 틀렸습니다 🙅‍♀️</p>}
          <HomeBtn
            className="justify-center px-4 py-2 mt-8 text-sm text-gray-500 rounded-md"
            onClick={onHomeClick}
          >
            홈으로 가기
          </HomeBtn>
          <RetryBtn
            className="justify-center px-4 py-2 mt-8 ml-3 text-sm text-gray-500 rounded-md"
            onClick={() => {
              setIsAnswer(false);
            }}
          >
            다시 풀기
          </RetryBtn>
        </div>
      )}
    </div>
  );
}
