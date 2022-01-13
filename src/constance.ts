export const ROUTE = {
  HOME: "/",
  QUIZ: "/quiz",
  CONTEST: "/contest",
  CREATE_QUIZ: "/create-quiz",
  MY_PROFILE: "/profile",
  RESULT: "/result",
  LOGIN: "/login",
  CREATE_USER: "/create-user",
  UPDATE_QUIZ: "/update-quiz",
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
