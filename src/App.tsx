import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTE } from "./constance";
import CreateQuiz from "./screens/CreateQuiz";
import Home from "./screens/Home";
import MyProfile from "./screens/MyProfile";
import ShowQuiz from "./screens/ShowQuiz";
import Error404 from "./screens/Error404";
import CreateUser from "./screens/CreateUser";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { apolloClient, isLoggedInVar } from "./apolloClient";
import Login from "./screens/Login";
import UpdateQuiz from "./screens/UpdateQuiz";

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
              <Route path={ROUTE.CREATE_QUIZ} element={<CreateQuiz />} />
              <Route path={`${ROUTE.MY_PROFILE}/:id`} element={<MyProfile />} />
              <Route
                path={`${ROUTE.QUIZ}/:id${ROUTE.UPDATE_QUIZ}`}
                element={<UpdateQuiz />}
              />
            </>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
