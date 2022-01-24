/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createQuiz
// ====================================================

export interface createQuiz_createQuiz {
  __typename: "CreateQuizResult";
  ok: boolean;
  error: string | null;
}

export interface createQuiz {
  createQuiz: createQuiz_createQuiz;
}

export interface createQuizVariables {
  type: string;
  genre: string;
  content: string;
  answer: string;
  image?: any | null;
  choice: string[];
  quizHashtags?: string | null;
}
