import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthVar, logUserOut } from "../apollo";

export const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const navigate = useNavigate();
  const hasToken = useReactiveVar(isAuthVar);
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut(navigate);
    }
  }, [data]);
  return { data, loading };
}

export default useUser;
