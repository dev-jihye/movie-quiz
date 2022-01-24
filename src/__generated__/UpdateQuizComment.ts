/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateQuizComment
// ====================================================

export interface UpdateQuizComment_updateQuizComment_comment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: any | null;
}

export interface UpdateQuizComment_updateQuizComment_comment {
  __typename: "QuizComment";
  id: number;
  user: UpdateQuizComment_updateQuizComment_comment_user;
  content: string;
}

export interface UpdateQuizComment_updateQuizComment {
  __typename: "UpdateQuizCommentResult";
  ok: boolean;
  error: string | null;
  comment: UpdateQuizComment_updateQuizComment_comment | null;
}

export interface UpdateQuizComment {
  updateQuizComment: UpdateQuizComment_updateQuizComment;
}

export interface UpdateQuizCommentVariables {
  id: number;
  content: string;
}
