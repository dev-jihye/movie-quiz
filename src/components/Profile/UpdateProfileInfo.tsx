import { gql, useMutation } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { classNames } from "../../constance";
import { getAvatar } from "../../utils/utils";
import { showProfile } from "../../__generated__/showProfile";
import { updateUser } from "../../__generated__/updateUser";

const UPDATE_USER = gql`
  mutation updateUser(
    $username: String
    $avatar: Upload
    $fileExists: Boolean!
  ) {
    updateUser(username: $username, avatar: $avatar, fileExists: $fileExists) {
      ok
      error
      user {
        id
        email
        username
      }
    }
  }
`;

interface IuseForm {
  username: string;
}

interface IupdateProfileInfo {
  data: showProfile | undefined;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  refetch: Function;
}

export default function UpdateProfileInfo({
  data: userData,
  setIsEditable,
  refetch,
}: IupdateProfileInfo) {
  const fileRef = useRef<any>();
  const [imgPreview, setImgPreview] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm<IuseForm>();

  const onCompleted = (data: updateUser) => {
    if (data?.updateUser?.ok) {
      setIsEditable(false);
      refetch();
    } else {
      setIsEditable(true);
      if (data?.updateUser?.error) {
        setErrorMsg(data?.updateUser?.error);
      }
    }
  };

  const [updateUserMutation] = useMutation<updateUser>(UPDATE_USER, {
    onCompleted,
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file) {
      setImage(file);
      const imgBlob = URL.createObjectURL(file);
      setImgPreview(imgBlob);
      setFileExists(true);
    }
  };

  const onSubmit = (data: IuseForm) => {
    updateUserMutation({
      variables: {
        username:
          data.username === userData?.me?.username ? undefined : data.username,
        avatar: image,
        fileExists,
      },
    });
  };

  const onDeleteClick = () => {
    setImage(null);
    setImgPreview("");
    setFileExists(false);
    fileRef.current.value = "";
  };

  const onCancelClick = () => {
    setIsEditable(false);
  };

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  useEffect(() => {
    if (userData?.me?.avatar?.Location) {
      setImgPreview(userData?.me?.avatar?.Location);
      setFileExists(true);
    }
  }, [userData]);

  return (
    <div className="mb-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full"
      >
        <div className="w-1/2 md:w-1/4">
          <div className="relative flex items-center w-full">
            <div className="flex justify-center w-full">
              {/* 파일이 있을 때 */}
              {fileExists ? (
                //변경한 프로필 불러오기
                <img
                  src={imgPreview}
                  className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28 lg:w-32 lg:h-32"
                  alt="profile"
                />
              ) : (
                //파일이 없을 때
                <>
                  {/* 이미지 프리뷰가 있을 때 */}
                  {imgPreview ? (
                    //기존 프로필
                    <img
                      src={
                        userData?.me?.avatar?.Location ||
                        getAvatar(userData?.me?.username || "")
                      }
                      alt="profile"
                      className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28 lg:w-32 lg:h-32"
                    />
                  ) : (
                    //이미지 프리뷰가 없을 때
                    <img
                      //디폴트 프로필
                      src={getAvatar(userData?.me?.username || "")}
                      className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28 lg:w-32 lg:h-32"
                      alt="profile"
                    />
                  )}
                </>
              )}
              <Menu as="div" className="relative">
                <div className="absolute right-0">
                  <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-28 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={onDeleteClick}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "w-full text-left block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          기본 사진
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <label
                          htmlFor="profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            " block px-4 py-2 text-sm text-gray-700 w-full text-left relative"
                          )}
                        >
                          새로운 사진
                        </label>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="py-8">
              <div className="relative flex justify-center rounded-lg "></div>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-3/4">
          <div className="w-full ml-2 md:ml-4">
            <div className="flex items-center w-full">
              <input
                id="profile"
                ref={fileRef}
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={onFileChange}
              />
              <input
                className="w-full mr-4 text-xl border-b border-gray-400 sm:text-2xl"
                {...register("username")}
                defaultValue={userData?.me?.username}
                onKeyDown={clearErrorMsg}
              />
            </div>
          </div>
          {errorMsg && <p className="ml-4 text-sm text-red-600">{errorMsg}</p>}
          <div className="flex mt-4 ml-2 md:ml-4">
            <div>
              <p className="mb-2 text-sm sm:text-base">도전 문제</p>
              <p className="text-xl text-center text-gray-500">
                {userData?.me?.totalTries}
              </p>
            </div>
            <div className="ml-2 sm:ml-8">
              <p className="mb-2 text-sm sm:text-base">맞춘 문제</p>
              <p className="text-xl text-center text-gray-500">
                {userData?.me?.totalConquests}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="px-3 py-1 mt-3 ml-2 text-xs text-white bg-gray-400 border-gray-400 rounded-md md:ml-4"
          >
            프로필 저장
          </button>
          <button
            type="button"
            onClick={onCancelClick}
            className="px-3 py-1 mt-3 ml-2 text-xs text-gray-400 border border-gray-400 rounded-md "
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
