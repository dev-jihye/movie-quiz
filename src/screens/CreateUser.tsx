import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DEFAULT_ERROR_MESSAGE, ROUTE } from "../constance";
import FormError from "../components/auth/FormError";
import Layout from "../components/Layout";

const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateUser() {
  const navigate = useNavigate();
  const [createUserError, setCreateUserError] = useState(DEFAULT_ERROR_MESSAGE);
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    createUser({
      variables: { ...data },
    });
  };
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const { createUser } = data;
    if (!createUser?.ok) {
      setCreateUserError({
        message: createUser?.error,
      });
      return;
    }
    navigate(ROUTE.HOME, {
      state: {
        notifications: {
          title: "회원가입이 성공.",
          description: "회원가입이 완료되었습니다. 로그인 하세요!",
        },
        username,
        password,
      },
    });
  };
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted,
  });

  const clearCreateAccoutError = () => {
    setCreateUserError(DEFAULT_ERROR_MESSAGE);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            회원 가입
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmitValid)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", {
                      required: "이메일은 필수 항목 입니다.",
                    })}
                    onKeyDown={clearCreateAccoutError}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <FormError message={formState?.errors?.email?.message} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  닉네임
                </label>
                <div className="mt-1">
                  <input
                    {...register("username", {
                      required: "닉네임은 필수 항목 입니다.",
                      minLength: {
                        value: 2,
                        message: "닉네임은 최소 2글자 이상이어야 합니다.",
                      },
                    })}
                    onKeyDown={clearCreateAccoutError}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <FormError message={formState?.errors?.username?.message} />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <div className="mt-1">
                  <input
                    {...register("password", {
                      required: "비밀번호는 필수 항목 입니다.",
                      minLength: {
                        value: 8,
                        message: "비밀번호는 최소 8자리 이상이어야 합니다.",
                      },
                    })}
                    onKeyDown={clearCreateAccoutError}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <FormError message={formState?.errors?.password?.message} />
                </div>
              </div>

              <div className="flex justify-center w-full">
                <FormError message={createUserError.message} />
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    !formState.isValid || loading
                      ? "opacity-50 pointer-events-none"
                      : null
                  }`}
                  disabled={!formState.isValid || loading}
                >
                  {loading ? "생성중..." : "계정 만들기"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">
                    이미 계정이 있으신가요?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to={ROUTE.LOGIN}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  로그인하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
