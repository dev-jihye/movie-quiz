/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_user {
  __typename: "User";
  id: number;
  email: string;
  username: string;
}

export interface updateUser_updateUser {
  __typename: "UpdateUserResult";
  ok: boolean;
  error: string | null;
  user: updateUser_updateUser_user | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  username?: string | null;
  avatar?: any | null;
  fileExists: boolean;
}
