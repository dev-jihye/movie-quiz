/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createQuizComment
// ====================================================

export interface createQuizComment_createQuizComment_comment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface createQuizComment_createQuizComment_comment {
  __typename: "QuizComment";
  id: number;
  user: createQuizComment_createQuizComment_comment_user;
  content: string;
  createdAt: string;
}

export interface createQuizComment_createQuizComment {
  __typename: "CreateQuizCommentResult";
  ok: boolean;
  error: string | null;
  comment: createQuizComment_createQuizComment_comment | null;
}

export interface createQuizComment {
  createQuizComment: createQuizComment_createQuizComment;
}

export interface createQuizCommentVariables {
  id: number;
  content: string;
}
