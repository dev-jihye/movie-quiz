/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: quizTry
// ====================================================

export interface quizTry_quizTry {
  __typename: "QuizTryResult";
  ok: boolean;
  error: string | null;
  result: boolean | null;
}

export interface quizTry {
  quizTry: quizTry_quizTry;
}

export interface quizTryVariables {
  quizTryId: number;
  answer: string;
}
