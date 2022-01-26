import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SHOW_QUIZ_FRAGMENT } from "../utils/Fragments";
import Layout from "../components/Layout";
import { shouldRefetchVar } from "../makeVars/QuizVars";
import { showQuizForUpdate } from "../__generated__/showQuizForUpdate";
import { updateQuiz } from "../__generated__/updateQuiz";

const SHOW_QUIZ_QUERY = gql`
  query showQuizForUpdate($id: Int!) {
    showQuiz(id: $id) {
      ...ShowQuizFragment
    }
  }
  ${SHOW_QUIZ_FRAGMENT}
`;

const UPDATE_QUIZ_MUTATION = gql`
  mutation updateQuiz(
    $id: Int!
    $type: String
    $genre: String
    $image: Upload
    $content: String
    $choice: [String!]!
    $answer: String
    $quizHashtags: String
    $fileExists: Boolean!
  ) {
    updateQuiz(
      id: $id
      type: $type
      genre: $genre
      image: $image
      content: $content
      choice: $choice
      answer: $answer
      quizHashtags: $quizHashtags
      fileExists: $fileExists
    ) {
      ok
      error
    }
  }
`;

interface IupdateQuizForm {
  type: string;
  genre: string;
  content: string;
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;
  choiceFour: string;
  answer: string;
  quizHashtags: string;
}

export default function EditQuiz() {
  const fileRef = useRef<any>();
  const [answerType, setAnswerType] = useState("subjective");
  const [imgPreview, setImgPreview] = useState("");
  const [fileExists, setFileExists] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  const { loading, data } = useQuery<showQuizForUpdate>(SHOW_QUIZ_QUERY, {
    variables: {
      id: parseInt(param.id as string),
    },
  });
  const { register, handleSubmit, watch, setValue } = useForm<IupdateQuizForm>({
    mode: "onChange",
  });

  useEffect(() => {
    const type = watch("type");
    if (type) {
      setAnswerType(type);
    }
  }, [watch, watch("type")]);

  useEffect(() => {
    if (data?.showQuiz) {
      const quiz = data.showQuiz;
      setValue("type", quiz.type);
      setValue("genre", quiz.genre);
      setValue("content", quiz.content);
      if (quiz.choice) {
        setValue("choiceOne", quiz.choice[0] || "");
        setValue("choiceTwo", quiz.choice[1] || "");
        setValue("choiceThree", quiz.choice[2] || "");
        setValue("choiceFour", quiz.choice[3] || "");
      }
      setValue("answer", quiz.answer);
      setValue(
        "quizHashtags",
        quiz.quizHashtags?.map((tag) => tag.hashtag).join(" ") || ""
      );
      if (quiz.image) {
        setImgPreview(quiz.image.Location);
      }
    }
  }, [data]);

  const onCompleted = (data: updateQuiz) => {
    if (data.updateQuiz.ok) {
      shouldRefetchVar(true);
      navigate("/");
    } else {
      alert(data.updateQuiz.error);
    }
  };

  const [updateQuizMutation] = useMutation<updateQuiz>(UPDATE_QUIZ_MUTATION, {
    onCompleted,
  });

  const onSubmit = (data: IupdateQuizForm) => {
    if (data.type === "choice") {
      if (
        !watch("choiceOne").trim() ||
        !watch("choiceTwo").trim() ||
        !watch("choiceThree").trim() ||
        !watch("choiceFour").trim()
      ) {
        alert("보기를 모두 입력해주세요. 공백은 허용되지 않습니다.");
        return;
      }
    }
    if (!data.content.trim()) {
      alert("문제를 작성해주세요.");
      return;
    }
    if (!data.answer.trim()) {
      alert("정답을 입력해주세요.");
      return;
    }
    updateQuizMutation({
      variables: {
        id: parseInt(param.id as string),
        ...data,
        choice: [
          watch("choiceOne"),
          watch("choiceTwo"),
          watch("choiceThree"),
          watch("choiceFour"),
        ],
        image: image || undefined,
        fileExists,
      },
    });
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file) {
      setImage(files[0]);
      const imgBlob = URL.createObjectURL(file);
      setImgPreview(imgBlob);
      setFileExists(true);
    }
  };

  const onDeleteClick = () => {
    setImgPreview("");
    setFileExists(false);
    fileRef.current.value = "";
  };

  const onCancelClick = () => {
    const checkDelete = window.confirm("작성 중인 퀴즈가 사라집니다.");
    if (checkDelete) {
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
                className={`w-4 h-4 text-[#ef7676] border-gray-300 focus:ring-[#ef7676]`}
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
                className="w-4 h-4 ml-6 text-[#ef7676] border-gray-300 focus:ring-[#ef7676]"
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
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                          {...register("choiceOne", {
                            required: true,
                          })}
                          type="text"
                          id="choice-one"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                          {...register("choiceTwo", {
                            required: true,
                          })}
                          type="text"
                          id="choice-two"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                          {...register("choiceThree", {
                            required: true,
                          })}
                          type="text"
                          id="choice-three"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                          {...register("choiceFour", {
                            required: true,
                          })}
                          type="text"
                          id="choice-four"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
                </label>
                {answerType === "subjective" ? (
                  <div className="mt-1">
                    <input
                      {...register("answer", { required: true })}
                      type="text"
                      id="answer"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
                    />
                  </div>
                ) : (
                  <div className="mt-1">
                    <select
                      {...register("answer", { required: true })}
                      name="answer"
                      id="answer"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                )}
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
                            <span className="relative font-medium text-[#ef7676] rounded-md">
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
                        alt="imgPreview"
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
                    {...register("quizHashtags")}
                    type="text"
                    name="quizHashtags"
                    id="quizHashtags"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ef7676]"
            >
              취소
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-[#f56363] hover:opacity-100 opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
