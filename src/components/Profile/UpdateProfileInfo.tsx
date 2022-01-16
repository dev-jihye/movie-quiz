import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const UPDATE_USER = gql`
  mutation UpdateUser(
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

export default function UpdateProfileInfo({
  data: userData,
  setIsEditable,
  refetch,
}: any) {
  const fileRef = useRef<any>();
  const [imgPreview, setImgPreview] = useState("");
  const [fileExists, setFileExists] = useState(true);
  const [image, setImage] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const onCompleted = (data: any) => {
    if (data?.updateUser?.ok) {
      setIsEditable(false);
      refetch();
    } else {
      setIsEditable(true);
      setErrorMsg(data?.updateUser?.error);
    }
    console.log(data);
  };

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    onCompleted,
  });

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    console.log(files);
    const file = files[0];
    setImage(files[0]);
    const imgBlob = URL.createObjectURL(file);
    console.log(imgBlob);
    setImgPreview(imgBlob);
    setFileExists(true);
  };

  const onSubmit = (data: any) => {
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

  return (
    <div className="mb-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full"
      >
        <div className="w-1/2 md:w-1/4">
          <div className="relative">
            {imgPreview.length < 1 ? (
              <div className="flex justify-center w-full">
                <img
                  src={
                    userData?.me?.avatar?.Location ||
                    encodeURI(
                      `https://ui-avatars.com/api/?name=${userData?.me?.username}&color=7F9CF5&background=EBF4FF`
                    )
                  }
                  alt="profile"
                  className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28"
                />
                <label className="relative">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg, image/png"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <div className="absolute bottom-0 right-0">
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
                  </div>
                </label>
              </div>
            ) : (
              <div className="py-8">
                <div className="relative flex justify-center rounded-lg ">
                  <img
                    src={imgPreview}
                    className="object-cover w-24 h-24 rounded-full md:w-28 md:h-28"
                  />
                  <label className="relative">
                    <button
                      onClick={onDeleteClick}
                      type="button"
                      className="absolute top-0 right-0 inline-flex items-center text-xs font-medium text-red-700 border border-transparent rounded focus:outline-none "
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
                    </button>
                  </label>
                  <label className="relative">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={onFileChange}
                    />
                    <div className="absolute bottom-0 right-0">
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
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 sm:w-3/4">
          <div className="w-full ml-2 md:ml-4">
            <div className="flex items-center w-full">
              <input
                className="w-full mr-4 text-xl border-b border-gray-400 sm:text-2xl"
                {...register("username")}
                defaultValue={userData?.me?.username}
                onKeyDown={clearErrorMsg}
              />
            </div>
          </div>
          {!userData?.updateUser?.ok && (
            <p className="ml-4 text-sm text-red-600">{errorMsg}</p>
          )}
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
