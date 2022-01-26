/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showProfile
// ====================================================

export interface showProfile_showUser_quizs_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showProfile_showUser_quizs_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showProfile_showUser_quizs {
  __typename: "Quiz";
  id: number;
  user: showProfile_showUser_quizs_user | null;
  genre: string;
  quizHashtags: showProfile_showUser_quizs_quizHashtags[] | null;
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

export interface showProfile_showUser_quizTries_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showProfile_showUser_quizTries_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showProfile_showUser_quizTries {
  __typename: "Quiz";
  id: number;
  user: showProfile_showUser_quizTries_user | null;
  genre: string;
  quizHashtags: showProfile_showUser_quizTries_quizHashtags[] | null;
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

export interface showProfile_showUser {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
  quizs: showProfile_showUser_quizs[];
  quizTries: showProfile_showUser_quizTries[];
  totalConquests: number;
  totalTries: number;
}

export interface showProfile {
  showUser: showProfile_showUser | null;
}

export interface showProfileVariables {
  id: number;
  take?: number | null;
  lastId?: number | null;
}
