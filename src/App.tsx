import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE } from "./constance";
import CreateQuiz from "./screens/CreateQuiz";
import Home from "./screens/Home";
import MyProfile from "./screens/MyProfile";
import ShowQuiz from "./screens/ShowQuiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.HOME} element={<Home />} />
        <Route path={`${ROUTE.QUIZ}/:id`} element={<ShowQuiz />} />
        <Route path={ROUTE.CREATE_QUIZ} element={<CreateQuiz />} />
        <Route path={`${ROUTE.MY_PROFILE}/:id`} element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
