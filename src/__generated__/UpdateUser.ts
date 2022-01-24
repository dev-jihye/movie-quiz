/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "User";
  id: number;
  email: string;
  username: string;
}

export interface UpdateUser_updateUser {
  __typename: "UpdateUserResult";
  ok: boolean;
  error: string | null;
  user: UpdateUser_updateUser_user | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  username?: string | null;
  avatar?: any | null;
  fileExists: boolean;
}
