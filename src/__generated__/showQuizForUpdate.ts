/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showQuizForUpdate
// ====================================================

export interface showQuizForUpdate_showQuiz_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showQuizForUpdate_showQuiz_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showQuizForUpdate_showQuiz {
  __typename: "Quiz";
  id: number;
  user: showQuizForUpdate_showQuiz_user | null;
  genre: string;
  quizHashtags: showQuizForUpdate_showQuiz_quizHashtags[] | null;
  answerRate: number;
  totalLikes: number;
  content: string;
  choice: (string | null)[] | null;
  type: string;
  image: any | null;
  isMine: boolean;
  isTried: boolean;
  answer: string;
  nextTry: number | null;
  isWinner: boolean;
  isLiked: boolean;
}

export interface showQuizForUpdate {
  showQuiz: showQuizForUpdate_showQuiz | null;
}

export interface showQuizForUpdateVariables {
  id: number;
}
