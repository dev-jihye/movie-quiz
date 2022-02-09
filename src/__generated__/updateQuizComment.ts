/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateQuizComment
// ====================================================

export interface updateQuizComment_updateQuizComment_comment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface updateQuizComment_updateQuizComment_comment {
  __typename: "QuizComment";
  id: number;
  user: updateQuizComment_updateQuizComment_comment_user;
  content: string;
}

export interface updateQuizComment_updateQuizComment {
  __typename: "UpdateQuizCommentResult";
  ok: boolean;
  error: string | null;
  comment: updateQuizComment_updateQuizComment_comment | null;
}

export interface updateQuizComment {
  updateQuizComment: updateQuizComment_updateQuizComment;
}

export interface updateQuizCommentVariables {
  id: number;
  content: string;
}
