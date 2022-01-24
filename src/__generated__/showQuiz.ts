/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showQuiz
// ====================================================

export interface showQuiz_showQuiz_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showQuiz_showQuiz_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showQuiz_showQuiz {
  __typename: "Quiz";
  id: number;
  user: showQuiz_showQuiz_user | null;
  genre: string;
  quizHashtags: showQuiz_showQuiz_quizHashtags[] | null;
  answerRate: number;
  totalLikes: number;
  content: string;
  choice: (string | null)[] | null;
  type: string;
  image: any | null;
  isMine: boolean;
  answer: string;
  nextTry: number | null;
  isWinner: boolean;
  isLiked: boolean;
}

export interface showQuiz {
  showQuiz: showQuiz_showQuiz | null;
}

export interface showQuizVariables {
  id: number;
}
