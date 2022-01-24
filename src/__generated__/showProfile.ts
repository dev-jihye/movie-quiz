/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showProfile
// ====================================================

export interface showProfile_me_quizs_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showProfile_me_quizs_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showProfile_me_quizs {
  __typename: "Quiz";
  id: number;
  user: showProfile_me_quizs_user | null;
  genre: string;
  quizHashtags: showProfile_me_quizs_quizHashtags[] | null;
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

export interface showProfile_me_quizTries_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showProfile_me_quizTries_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showProfile_me_quizTries {
  __typename: "Quiz";
  id: number;
  user: showProfile_me_quizTries_user | null;
  genre: string;
  quizHashtags: showProfile_me_quizTries_quizHashtags[] | null;
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

export interface showProfile_me {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
  quizs: showProfile_me_quizs[];
  quizTries: showProfile_me_quizTries[];
  totalConquests: number;
  totalTries: number;
}

export interface showProfile {
  me: showProfile_me | null;
}

export interface showProfileVariables {
  take?: number | null;
}
