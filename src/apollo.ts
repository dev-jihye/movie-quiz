import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { ROUTE, TOKEN } from "./constance";

export const isDarkModeVar = makeVar(false);
export const isAuthVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const isLoadFinishVar = makeVar(false);

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isAuthVar(true);
};
export const logUserOut = (navigate: any) => {
  localStorage.removeItem(TOKEN);
  navigate(ROUTE.HOME, {
    state: null,
  });
  window.location.reload();
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.REACT_APP_ENV === "production"
      ? "http://localhost:4000/"
      : "http://localhost:4000/",
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors, "gql Error");
  }
  if (networkError) {
    console.log(networkError, "network Error");
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeCoffeeShops: {
            keyArgs: false,
            merge: (existing = [], incoming = []) => {
              const exitsArr = existing.map((item: any) => item.__ref);
              if (exitsArr.includes(incoming[0]?.__ref)) {
                isLoadFinishVar(true);
                return [...existing];
              }
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
