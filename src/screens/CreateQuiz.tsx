import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { shouldRefetchVar } from "../makeVars/QuizVars";
import { USER_FRAGMENT } from "../components/Fragments";

const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz(
    $type: String!
    $genre: String!
    $content: String!
    $answer: String!
    $image: Upload
    $choice: [String!]!
    $quizHashtags: String
  ) {
    createQuiz(
      type: $type
      genre: $genre
      content: $content
      answer: $answer
      image: $image
      choice: $choice
      quizHashtags: $quizHashtags
    ) {
      ok
      error
    }
  }
`;

export default function CreateQuiz() {
  const fileRef = useRef<any>();
  const [imgPreview, setImgPreview] = useState("");
  const [answerType, setAnswerType] = useState("subjective");
  const [image, setImage] = useState<any>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      type: "subjective",
      genre: "액션",
      content: "",
      choiceOne: "",
      choiceTwo: "",
      choiceThree: "",
      choiceFour: "",
      answer: "",
      quizHashtags: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setAnswerType(watch("type"));
  }, [watch("type")]);

  const onCompleted = (data: any) => {
    shouldRefetchVar(true);
    navigate("/");
  };

  const [createQuizMutation, { loading, error }] = useMutation(
    CREATE_QUIZ_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = (data: any) => {
    createQuizMutation({
      variables: {
        ...data,
        choice: [
          watch("choiceOne"),
          watch("choiceTwo"),
          watch("choiceThree"),
          watch("choiceFour"),
        ],
        image: image || undefined,
      },
    });
    console.log(data);
  };

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    setImage(files[0]);
    const imgBlob = URL.createObjectURL(file);
    console.log(imgBlob);
    setImgPreview(imgBlob);
  };

  const onDeleteClick = () => {
    setImgPreview("");
    fileRef.current.value = "";
  };

  const onCancelClick = () => {
    const ok = window.confirm("작성 중인 퀴즈가 사라집니다.");
    if (ok) {
      navigate("/");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <legend className="text-base font-medium text-gray-900">
              문제형식
            </legend>
            <p className="text-sm text-gray-500">
              주관식과 객관식 중 선택할 수 있습니다.
            </p>
          </div>
          <div className="flex mt-2">
            <label className="flex items-center">
              <input
                {...register("type")}
                name="type"
                type="radio"
                value="subjective"
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="block ml-3 text-sm font-medium text-gray-700">
                주관식
              </span>
            </label>
            <label className="flex items-center">
              <input
                {...register("type")}
                name="type"
                type="radio"
                value="choice"
                className="w-4 h-4 ml-6 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="block ml-3 text-sm font-medium text-gray-700">
                객관식
              </span>
            </label>
          </div>
        </fieldset>
        <div className="sm:col-span-3">
          <label
            htmlFor="genre"
            className="block mt-6 text-sm font-medium text-gray-700"
          >
            장르
          </label>
          <div className="mt-1">
            <select
              {...register("genre")}
              id="genre"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>액션</option>
              <option>애니메이션</option>
              <option>드라마</option>
              <option>스릴러</option>
              <option>멜로/로맨스</option>
              <option>코미디</option>
              <option>범죄</option>
              <option>공포</option>
              <option>가족</option>
              <option>사극</option>
              <option>SF</option>
              <option>전쟁</option>
              <option>판타지</option>
              <option>다큐멘터리</option>
              <option>뮤지컬</option>
              <option>기타</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              문제
            </label>
            <div className="mt-1">
              <textarea
                {...register("content", {
                  required: true,
                })}
                rows={3}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              {answerType === "subjective" ? (
                ""
              ) : (
                <>
                  <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-one"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 1
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("choiceOne")}
                          type="text"
                          id="choice-one"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-two"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 2
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("choiceTwo")}
                          type="text"
                          id="choice-two"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-three"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 3
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("choiceThree")}
                          type="text"
                          id="choice-three"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-four"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 4
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("choiceFour")}
                          type="text"
                          id="choice-four"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-6 sm:col-span-6">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700"
                >
                  정답
                  <span className="ml-2 text-xs text-gray-500">
                    (객관식의 경우 보기 번호만 적어주세요)
                  </span>
                </label>
                <div className="mt-1">
                  <input
                    {...register("answer", { required: true })}
                    type="text"
                    name="answer"
                    id="answer"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 sm:col-span-6">
                {imgPreview.length < 1 ? (
                  <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="imgPreview"
                        className="block text-sm font-medium text-gray-700"
                      >
                        이미지
                        <span className="ml-2 text-xs text-gray-500">
                          (선택)
                        </span>
                      </label>
                      <label
                        htmlFor="imgPreview"
                        className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <div className="space-y-1 text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex justify-center text-sm text-gray-600">
                            <span className="relative font-medium text-indigo-600 rounded-md">
                              <span>이미지 업로드</span>
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG 최대 5MB
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="relative flex justify-center rounded-lg bg-gray-50">
                      <img
                        src={imgPreview}
                        className="object-contain"
                        style={{ height: 400 }}
                      />
                      <button
                        onClick={onDeleteClick}
                        type="button"
                        className="inline-flex absolute top-10 right-10 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        제거
                      </button>
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  id="imgPreview"
                  name="imgPreview"
                  type="file"
                  className="sr-only"
                  accept="image/jpeg, image/png"
                  onChange={onFileChange}
                />
              </div>
              <div className="mt-6 sm:col-span-6">
                <label
                  htmlFor="quizHashtags"
                  className="block text-sm font-medium text-gray-700"
                >
                  해시태그{" "}
                  <span className="ml-2 text-xs text-gray-500">
                    (10개까지 가능)
                  </span>
                </label>
                <div className="mt-1">
                  <input
                    {...register("quizHashtags", { required: true })}
                    type="text"
                    name="quizHashtags"
                    id="quizHashtags"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="#실화배경 #한국영화 #빈칸채우기"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={onCancelClick}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              취소
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading && "opacity-50"
              }`}
              disabled={loading}
            >
              {loading ? "저장중" : "저장"}
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
