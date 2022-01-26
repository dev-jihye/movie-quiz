import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { shouldRefetchVar } from "../../makeVars/QuizVars";

interface IquizResult {
  setIsAnswer: Dispatch<SetStateAction<boolean>>;
  isCorrect: boolean;
  tryError: string;
}

export default function QuizResult({
  setIsAnswer,
  isCorrect,
  tryError,
}: IquizResult) {
  const navigate = useNavigate();

  const onHomeClick = () => {
    shouldRefetchVar(true);
    navigate("/");
  };

  return (
    <div>
      {tryError ? (
        <div className="my-16 text-xl text-center sm:my-20 sm:text-3xl">
          <motion.div animate={{ scale: [1.5, 1] }}>
            <p className="text-xl font-bold sm:text-3xl">🙅‍♀️ 틀렸습니다 🙅‍♀️</p>
            <p className="mt-2 text-base sm:text-lg">{tryError}</p>
          </motion.div>
          <button
            className="justify-center px-4 py-2 mt-8 text-sm rounded-md opacity-80 hover:opacity-100 bg-[#f56363] text-white"
            onClick={onHomeClick}
          >
            홈으로 가기
          </button>
          <button
            className="bg-[#bfbebe] text-white justify-center px-4 py-2 mt-8 ml-3 text-sm rounded-md opacity-80 hover:opacity-100"
            onClick={() => {
              setIsAnswer(false);
            }}
          >
            다시 풀기
          </button>
        </div>
      ) : (
        <div className="block my-12 overflow-hidden text-xl font-bold text-center sm:my-20 sm:text-3xl">
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1 }}
          >
            {isCorrect ? <p>🎉 정답입니다 🎉</p> : <p>🙅‍♀️ 틀렸습니다 🙅‍♀️</p>}
          </motion.div>
          <button
            className={`justify-center px-4 py-2 mt-8 text-sm rounded-md opacity-80 hover:opacity-100 bg-[#F56363] text-white`}
            onClick={onHomeClick}
          >
            홈으로 가기
          </button>
          <button
            className="bg-[#c3c3c3] text-white justify-center px-4 py-2 mt-8 ml-3 text-sm rounded-md opacity-80 hover:opacity-100"
            onClick={() => {
              setIsAnswer(false);
            }}
          >
            다시 풀기
          </button>
        </div>
      )}
    </div>
  );
}
