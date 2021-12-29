import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTE } from "./constance";
import CreateQuiz from "./screens/CreateQuiz";
import Home from "./screens/Home";
import MyProfile from "./screens/MyProfile";
import ShowQuiz from "./screens/ShowQuiz";
import Result from "./screens/Result";
import Contest from "./screens/Contest";
import Error404 from "./screens/Error404";
import CreateUser from "./screens/CreateUser";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { apolloClient, isLoggedInVar } from "./apolloClient";
import Login from "./screens/Login";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTE.HOME}
            element={isLoggedIn ? <Home /> : <Login />}
          />
          <Route
            path={ROUTE.CREATE_USER}
            element={isLoggedIn ? <Navigate to={ROUTE.HOME} /> : <CreateUser />}
          />
          {isLoggedIn && (
            <>
              <Route path={`${ROUTE.QUIZ}/:id`} element={<ShowQuiz />} />
              <Route path={`${ROUTE.CONTEST}`} element={<Contest />} />
              <Route path={ROUTE.CREATE_QUIZ} element={<CreateQuiz />} />
              <Route path={`${ROUTE.MY_PROFILE}/:id`} element={<MyProfile />} />
              <Route
                path={`${ROUTE.QUIZ}/:id${ROUTE.RESULT}`}
                element={<Result />}
              />
            </>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
