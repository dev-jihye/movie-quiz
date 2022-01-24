import { gql, useMutation } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames, ROUTE } from "../../constance";
import { shouldRefetchVar } from "../../makeVars/QuizVars";

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuiz($deleteQuizId: Int!) {
    deleteQuiz(id: $deleteQuizId) {
      ok
      error
    }
  }
`;

export default function QuizDropMenu({ showQuiz }: any) {
  const navigate = useNavigate();
  const param = useParams();
  const onDeleteCompleted = (data: any) => {
    shouldRefetchVar(true);
    navigate("/");
  };

  const [deleteQuizMutation] = useMutation(DELETE_QUIZ_MUTATION, {
    onCompleted: onDeleteCompleted,
  });

  const onDeleteClick = () => {
    const ok = window.confirm("퀴즈를 삭제하시겠습니까?");
    if (ok) {
      deleteQuizMutation({
        variables: {
          deleteQuizId: parseInt(param.id as string),
        },
      });
    }
  };
  return (
    <>
      {showQuiz?.isMine === true ? (
        <>
          <Menu
            as="div"
            className="relative items-center inline-block ml-2 text-left"
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
              <Menu.Items className="absolute right-0 z-10 w-16 mt-2 text-center origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`${ROUTE.QUIZ}/${showQuiz?.id}${ROUTE.UPDATE_QUIZ}`}
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
    </>
  );
}
