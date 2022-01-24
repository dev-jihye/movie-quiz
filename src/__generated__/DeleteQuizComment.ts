/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteQuizComment
// ====================================================

export interface DeleteQuizComment_deleteQuizComment {
  __typename: "MutationResult";
  ok: boolean;
  error: string | null;
}

export interface DeleteQuizComment {
  deleteQuizComment: DeleteQuizComment_deleteQuizComment;
}

export interface DeleteQuizCommentVariables {
  id: number;
}
