/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShowQuizFragment
// ====================================================

export interface ShowQuizFragment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface ShowQuizFragment_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface ShowQuizFragment {
  __typename: "Quiz";
  id: number;
  user: ShowQuizFragment_user | null;
  genre: string;
  quizHashtags: ShowQuizFragment_quizHashtags[] | null;
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
