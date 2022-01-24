import { Menu, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { showQuizComments_showQuizComments } from "../../__generated__/showQuizComments";
import CommentDelBtn from "./CommentDelBtn";
import CommentEditBtn from "./CommentEditBtn";

interface IcommentDropMenu {
  comment: showQuizComments_showQuizComments;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

export default function CommentDropMenu({
  comment,
  setIsEditable,
}: IcommentDropMenu) {
  return (
    <>
      {comment?.isMine === true ? (
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
                  <CommentEditBtn setIsEditable={setIsEditable} />
                  <CommentDelBtn comment={comment} />
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
