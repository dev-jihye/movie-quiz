export default function Info({ showQuiz }: any) {
  return (
    <>
      <div className="flex items-center mb-4">
        <img
          src={
            showQuiz?.user?.avatar?.Location ||
            encodeURI(
              `https://ui-avatars.com/api/?name=${showQuiz?.user?.username}&color=7F9CF5&background=EBF4FF`
            )
          }
          alt="profile"
          className="object-cover w-10 h-10 rounded-full"
        />
        <span className="ml-3">{showQuiz?.user?.username}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-flex text-sm items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
          {showQuiz?.genre}
        </span>
        <p className="text-sm text-gray-600">
          정답률 : {showQuiz?.answerRate}%
        </p>
      </div>
    </>
  );
}
