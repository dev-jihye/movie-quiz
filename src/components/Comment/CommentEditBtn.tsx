import { Menu } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { classNames } from "../../constance";

interface IcommentEditBtn {
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}
export default function CommentEditBtn({ setIsEditable }: IcommentEditBtn) {
  const onEditClick = () => {
    setIsEditable(true);
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onEditClick}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm w-full"
          )}
        >
          수정
        </button>
      )}
    </Menu.Item>
  );
}
