import { Dispatch, SetStateAction } from "react";
import { getAvatar } from "../../utils/utils";
import { showProfile } from "../../__generated__/showProfile";
interface IshowProfileInfo {
  data: showProfile | undefined;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}
export default function ShowProfileInfo({
  data: userData,
  setIsEditable,
}: IshowProfileInfo) {
  const onEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div className="mb-2">
      <form className="flex items-center w-full ">
        <div className="flex justify-center w-1/2 md:w-1/4">
          <div className="relative">
            <img
              src={
                userData?.showUser?.avatar?.Location ||
                getAvatar(userData?.showUser?.username || "")
              }
              alt="profile"
              className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28 lg:w-32 lg:h-32"
            />
          </div>
        </div>
        <div className="w-1/2 md:w-3/4">
          <div className="w-full ml-2 md:ml-4">
            <div className="flex items-center w-full">
              <p className="w-full text-xl sm:text-2xl">
                {userData?.showUser?.username}
              </p>
            </div>
          </div>
          <div className="flex mt-4 ml-2 md:ml-4">
            <div>
              <p className="mb-2 text-sm sm:text-base">도전 문제</p>
              <p className="text-xl text-center text-gray-500">
                {userData?.showUser?.totalTries}
              </p>
            </div>
            <div className="ml-2 sm:ml-8">
              <p className="mb-2 text-sm sm:text-base">맞춘 문제</p>
              <p className="text-xl text-center text-gray-500">
                {userData?.showUser?.totalConquests}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onEditClick}
            className="px-3 py-1 mt-2 ml-2 text-xs text-gray-400 border border-gray-400 rounded-md md:ml-4"
          >
            프로필 수정
          </button>
        </div>
      </form>
    </div>
  );
}
