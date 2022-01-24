/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showQuizComments
// ====================================================

export interface showQuizComments_showQuizComments_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface showQuizComments_showQuizComments {
  __typename: "QuizComment";
  id: number;
  user: showQuizComments_showQuizComments_user;
  content: string;
  isMine: boolean;
  createdAt: string;
}

export interface showQuizComments {
  showQuizComments: showQuizComments_showQuizComments[];
}

export interface showQuizCommentsVariables {
  id: number;
  take?: number | null;
  lastId?: number | null;
}
