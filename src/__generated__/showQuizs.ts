/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showQuizs
// ====================================================

export interface showQuizs_showQuizs_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showQuizs_showQuizs_quizHashtags {
  __typename: "QuizHashtag";
  id: number;
  hashtag: string;
}

export interface showQuizs_showQuizs {
  __typename: "Quiz";
  id: number;
  user: showQuizs_showQuizs_user | null;
  genre: string;
  quizHashtags: showQuizs_showQuizs_quizHashtags[] | null;
  answerRate: number;
  totalLikes: number;
}

export interface showQuizs {
  showQuizs: showQuizs_showQuizs[];
}

export interface showQuizsVariables {
  take?: number | null;
  lastId?: number | null;
}
