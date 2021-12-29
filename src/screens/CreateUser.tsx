import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../constance";

const CREATE_USER_MUTATION = gql`
  mutation Mutation($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function CreateUser() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data: any) => {
    if (!data.createUser.ok) {
      setErrorMsg(data.createUser.error);
    } else {
      navigate(ROUTE.HOME);
    }
  };
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted,
  });
  const onSubmit = (data: any) => {
    createUser({
      variables: {
        ...data,
      },
    });
    console.log(data);
  };

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  return (
    <>
      {" "}
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to={ROUTE.HOME} className="block text-3xl text-center">
            🔥🎬
          </Link>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nickname
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    {...register("username", {
                      required: "닉네임을 입력하세요.",
                      minLength: {
                        value: 2,
                        message: "닉네임은 최소 2글자 입니다.",
                      },
                    })}
                    type="username"
                    autoComplete="username"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onKeyDown={clearErrorMsg}
                  />
                </div>
                {formState?.errors?.username?.message && (
                  <p className="text-sm text-red-600">
                    {formState?.errors?.username?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    {...register("email", {
                      required: "이메일을 입력하세요.",
                      pattern: {
                        value:
                          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                        message: "이메일 형식이 맞지 않습니다.",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onKeyDown={clearErrorMsg}
                  />
                </div>
                {formState?.errors?.email?.message && (
                  <p className="text-sm text-red-600">
                    {formState?.errors?.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    {...register("password", {
                      required: "비밀번호를 입력하세요.",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 최소 8자리 입니다.",
                      },
                    })}
                    minLength={8}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onKeyDown={clearErrorMsg}
                  />
                </div>
                {formState?.errors?.password?.message && (
                  <p className="text-sm text-red-600">
                    {formState?.errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="text-center">
                <span className="text-sm text-red-600">{errorMsg}</span>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  가입하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
