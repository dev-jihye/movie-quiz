import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import FormError from "../components/auth/FormError";
import { logUserIn } from "../apollo";
import Success from "../components/notifications/Success";
import { DEFAULT_ERROR_MESSAGE, ROUTE } from "../constance";
import Layout from "../components/Layout";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

interface IloginState {
  email: string;
  password: string;
  notifications: {
    title: string;
    description: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as IloginState;
  const [loginError, setLoginError] = useState(DEFAULT_ERROR_MESSAGE);
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: locationState?.email || "",
      password: locationState?.password || "",
    },
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    login({
      variables: { ...data },
    });
  };
  const onCompleted = (data: any) => {
    const { login } = data;
    if (!login?.ok) {
      setLoginError({
        message: login?.error,
      });
      return;
    }
    login?.token && logUserIn(login.token);
    console.log(login?.token);
    navigate(ROUTE.HOME);
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const clearLoginError = () => {
    setLoginError(DEFAULT_ERROR_MESSAGE);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            로그인
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
                    onKeyDown={clearLoginError}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    {...register("password", {
                      required: "비밀번호는 필수 항목 입니다.",
                    })}
                    onKeyDown={clearLoginError}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-center w-full">
                <FormError message={loginError.message} />
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
                  {loading ? "로그인중..." : "로그인"}
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
                    아직 계정이 없으신가요?
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  to={ROUTE.CREATE_USER}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  계정 만들기
                </Link>
              </div>
            </div>
          </div>
        </div>
        {locationState?.notifications ? (
          <Success
            title={locationState.notifications.title}
            description={locationState.notifications.description}
          />
        ) : null}
      </div>
    </Layout>
  );
}
