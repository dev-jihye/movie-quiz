import { Menu } from "@headlessui/react";
import { classNames } from "../../constance";

export default function CommentEditBtn({ setIsEditable }: any) {
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
