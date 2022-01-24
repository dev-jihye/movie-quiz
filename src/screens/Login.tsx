import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logUserIn } from "../apolloClient";
import { ROUTE } from "../constance";
import { login, loginVariables } from "../__generated__/login";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<loginVariables>({
    mode: "onChange",
  });

  const onSubmit = (data: loginVariables) => {
    loginMutation({
      variables: {
        ...data,
      },
    });
  };

  const onCompleted = (data: login) => {
    if (!data.login.ok) {
      setErrorMsg(data.login.error || "");
    } else {
      const token = data.login.token;
      if (token) {
        logUserIn(token);
        navigate(ROUTE.HOME);
      }
    }
  };

  const [loginMutation] = useMutation<login>(LOGIN_MUTATION, {
    onCompleted,
  });

  return (
    <>
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
                  />
                </div>
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
                    id="password"
                    {...register("password")}
                    minLength={8}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#ef7676] focus:border-[#ef7676] sm:text-sm"
                  />
                </div>
              </div>
              {errorMsg && (
                <div className="text-sm text-red-500">{errorMsg}</div>
              )}
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#ef7676] border border-transparent rounded-md shadow-sm hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ef7676]"
                >
                  로그인
                </button>
              </div>
              <div>
                <Link
                  to={ROUTE.CREATE_USER}
                  className="block text-sm text-center text-gray-500"
                >
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
