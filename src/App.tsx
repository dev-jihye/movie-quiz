import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { client, isAuthVar } from "./apollo";
import { ROUTE } from "./constance";
import CreateQuiz from "./screens/CreateQuiz";
import CreateUser from "./screens/CreateUser";
import Error404 from "./screens/Error404";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyProfile from "./screens/MyProfile";
import ShowQuiz from "./screens/ShowQuiz";

export default function App() {
  const isAuth = useReactiveVar(isAuthVar);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTE.LOGIN}
            element={isAuth ? <Navigate to={ROUTE.HOME} /> : <Login />}
          />
          <Route
            path={ROUTE.CREATE_USER}
            element={isAuth ? <Navigate to={ROUTE.HOME} /> : <CreateUser />}
          />
          <Route path={ROUTE.HOME} element={<Home />} />
          <Route path={`${ROUTE.QUIZ}/:id`} element={<ShowQuiz />} />
          <Route path={ROUTE.CREATE_QUIZ} element={<CreateQuiz />} />
          <Route path={`${ROUTE.MY_PROFILE}/:id`} element={<MyProfile />} />
          <Route path={"*"} element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
