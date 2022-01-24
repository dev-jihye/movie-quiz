/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateQuiz
// ====================================================

export interface updateQuiz_updateQuiz {
  __typename: "UpdateQuizResult";
  ok: boolean;
  error: string | null;
}

export interface updateQuiz {
  updateQuiz: updateQuiz_updateQuiz;
}

export interface updateQuizVariables {
  id: number;
  type?: string | null;
  genre?: string | null;
  image?: any | null;
  content?: string | null;
  choice: string[];
  answer?: string | null;
  quizHashtags?: string | null;
  fileExists: boolean;
}
