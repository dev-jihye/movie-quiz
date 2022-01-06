import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { shouldRefetchVar } from "../makeVars/QuizVars";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SHOW_QUIZ_QUERY = gql`
  query showQuiz($id: Int!) {
    showQuiz(id: $id) {
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
      content
      choice
      type
      image
      isMine
    }
  }
`;

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuiz($deleteQuizId: Int!) {
    deleteQuiz(id: $deleteQuizId) {
      ok
      error
    }
  }
`;

export default function ShowQuiz() {
  const navigate = useNavigate();
  const param = useParams();
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZ_QUERY, {
    variables: {
      id: parseInt(param.id as string),
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  const onCompleted = (data: any) => {
    shouldRefetchVar(true);
    navigate("/");
  };

  const [deleteQuiz, { loading: deleteLoading, error: errorLoading }] =
    useMutation(DELETE_QUIZ_MUTATION, {
      onCompleted,
    });

  const onDeleteClick = () => {
    const ok = window.confirm("퀴즈를 삭제하시겠습니까?");
    if (ok) {
      deleteQuiz({
        variables: {
          deleteQuizId: parseInt(param.id as string),
        },
      });
    }
  };
  return (
    <Layout>
      <>
        {loading ? (
          "loading..."
        ) : (
          <>
            <div className="flex items-center mb-4">
              <img
                src={
                  data?.showQuiz?.user?.avatar ||
                  encodeURI(
                    `https://ui-avatars.com/api/?name=${data?.showQuiz?.user?.username}&color=7F9CF5&background=EBF4FF`
                  )
                }
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3">{data?.showQuiz?.user?.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="inline-flex text-sm items-center px-3 py-0.5 rounded-full font-medium bg-pink-500 text-slate-50">
                {data?.showQuiz?.genre}
              </span>
              <p className="text-sm text-gray-600">
                정답률 : {data?.showQuiz?.answerRate}%
              </p>
            </div>
            <div className="flex flex-col items-center justify-between mt-8 sm:mt-10 lg:mt-20">
              <p className="inline-block sm:text-xl">
                {data?.showQuiz?.content}
              </p>
              <img src={data?.showQuiz?.image?.Location} className="mt-4" />
            </div>
            {data?.showQuiz?.type === "subjective" ? (
              <div className="flex justify-center mt-8 sm:mt-10 lg:mt-20">
                <form className="w-full text-center">
                  <input
                    type="text"
                    placeholder="정답"
                    className="w-3/4 border-gray-300 rounded-md sm:w-1/2"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 ml-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    제출
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-8 sm:mt-10 lg:mt-20">
                <ul className="flex">
                  <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                    {data?.showQuiz?.choice[0]}
                  </li>
                  <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                    {data?.showQuiz?.choice[1]}
                  </li>
                </ul>
                <ul className="flex">
                  <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                    {data?.showQuiz?.choice[2]}
                  </li>
                  <li className="w-1/2 p-6 m-2 bg-gray-100 rounded-md cursor-pointer">
                    {data?.showQuiz?.choice[3]}
                  </li>
                </ul>
              </div>
            )}

            <div className="flex justify-between m-2 mt-10 text-gray-600 lg:mt-20">
              <p className="text-sm sm:text-base">
                {data?.showQuiz?.quizHashtags
                  ?.map((tag: any) => tag.hashtag)
                  .join(" ")}
              </p>
              {data?.showQuiz?.isMine === true ? (
                <>
                  <Menu
                    as="div"
                    className="relative inline-block ml-2 text-left"
                  >
                    <div>
                      <Menu.Button>
                        <span>
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </span>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-16 mt-2 text-center origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/quiz/${data?.showQuiz?.id}/edit-quiz`}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                수정
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={onDeleteClick}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm w-full"
                                )}
                              >
                                삭제
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </>
    </Layout>
  );
}
