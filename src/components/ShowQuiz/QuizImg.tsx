import { showQuiz_showQuiz } from "../../__generated__/showQuiz";

interface IquizImg {
  showQuiz: showQuiz_showQuiz;
}

export default function QuizImg({ showQuiz }: IquizImg) {
  return (
    <div className="flex flex-col items-center justify-between mt-8 sm:mt-10 lg:mt-20">
      <p className="inline-block sm:text-xl">{showQuiz?.content}</p>
      {showQuiz?.image?.Location && (
        <img src={showQuiz?.image?.Location} className="mt-4" alt="quiz" />
      )}
    </div>
  );
}
