import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apolloClient";
import { me } from "../__generated__/me";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  return { data, loading };
}

export default useUser;
