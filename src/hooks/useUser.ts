import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apolloClient";

export const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  return { data, loading };
}

export default useUser;
