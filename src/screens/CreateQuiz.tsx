import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";

const PreviewBox = styled.div`
  position: relative;
  z-index: 0;
`;

const LabelButton = styled.label`
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  padding: 4px 8px;
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
  }
`;

const CREATE_QUIZ_MUTATION = gql`
  mutation Mutation(
    $type: String!
    $genre: String!
    $content: String!
    $answer: String!
    $image: Upload
    $choice: [String]
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
      quiz {
        id
        user {
          id
          username
          avatar
        }
        genre
        quizHashtags {
          hashtag
        }
        answerRate
        totalLikes
      }
    }
  }
`;

export default function CreateQuiz() {
  const [imgPreview, setImgPreview] = useState("");
  const [answerType, setAnswerType] = useState("shortAnswer");
  const { register, watch } = useForm({
    defaultValues: {
      quizType: "shortAnswer",
    },
  });

  useEffect(() => {
    console.log(watch("quizType"));
    setAnswerType(watch("quizType"));
  }, [watch("quizType")]);

  const onImgChange = (e: any) => {
    const {
      target: { files },
    } = e;
  };

  return (
    <Layout>
      <form>
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
            <div className="flex items-center">
              <input
                {...register("quizType")}
                id="short-answer"
                name="quizType"
                type="radio"
                value="shortAnswer"
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="short-answer"
                className="block ml-3 text-sm font-medium text-gray-700"
              >
                주관식
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("quizType")}
                id="multiple-choice"
                name="quizType"
                type="radio"
                value="multipleChoice"
                className="w-4 h-4 ml-6 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="multiple-choice"
                className="block ml-3 text-sm font-medium text-gray-700"
              >
                객관식
              </label>
            </div>
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
              id="genre"
              name="genre"
              autoComplete="genre-name"
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
              <option>Sf</option>
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
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              문제
            </label>
            <div className="mt-1">
              <textarea
                id="question"
                name="question"
                rows={3}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={""}
              />
            </div>

            <div>
              {answerType === "shortAnswer" ? (
                ""
              ) : (
                <>
                  <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-one"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 1번
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="choice-one"
                          id="choice-one"
                          autoComplete="given-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-two"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 2번
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="choice-two"
                          id="choice-two"
                          autoComplete="family-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-three"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 3번
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="choice-three"
                          id="choice-three"
                          autoComplete="given-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="choice-four"
                        className="block text-sm font-medium text-gray-700"
                      >
                        보기 4번
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="choice-four"
                          id="choice-four"
                          autoComplete="family-name"
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
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    autoComplete="answer"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 sm:col-span-6">
                {imgPreview ? (
                  <PreviewBox className="flex justify-center max-w-lg overflow-hidden border-2 border-gray-300 border-dashed rounded-md">
                    <img src={imgPreview} />
                    <LabelButton htmlFor="file-upload">수정</LabelButton>
                  </PreviewBox>
                ) : (
                  <>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이미지 (선택)
                    </label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
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
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={onImgChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6 sm:col-span-6">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  해시태그 (10개까지 가능)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    autoComplete="tag"
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
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              저장
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
