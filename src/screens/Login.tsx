import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logUserIn } from "../apolloClient";
import { ROUTE } from "../constance";

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

interface ILoginUsers {
  data: any;
  error: any;
  loading: any;
}

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    login({
      variables: {
        ...data,
      },
    });
    console.log(data);
  };

  const onCompleted = (data: any) => {
    console.log(data);
    if (!data.login.ok) {
      setErrorMsg(data.login.error);
    } else {
      const token = data.login.token;
      logUserIn(token);
      navigate(ROUTE.HOME);
    }
  };

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
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
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    {...register("password")}
                    minLength={8}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  로그인
                </button>
              </div>
              <Link
                to={ROUTE.CREATE_USER}
                className="block text-sm text-center text-gray-500"
              >
                회원가입
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
