/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_quizs_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface Me_me_quizs_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface Me_me_quizs {
  __typename: "Quiz";
  id: number;
  user: Me_me_quizs_user | null;
  genre: string;
  quizHashtags: Me_me_quizs_quizHashtags[] | null;
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

export interface Me_me_quizTries_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface Me_me_quizTries_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface Me_me_quizTries {
  __typename: "Quiz";
  id: number;
  user: Me_me_quizTries_user | null;
  genre: string;
  quizHashtags: Me_me_quizTries_quizHashtags[] | null;
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

export interface Me_me {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
  quizs: Me_me_quizs[];
  quizTries: Me_me_quizTries[];
  totalConquests: number;
  totalTries: number;
}

export interface Me {
  me: Me_me | null;
}

export interface MeVariables {
  take?: number | null;
}
