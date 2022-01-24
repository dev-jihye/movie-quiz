import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.href = "/";
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.REACT_APP_ENV === "production"
      ? "https://movie-quiz-madstone.herokuapp.com/"
      : "https://movie-quiz-madstone.herokuapp.com/",
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
      authorization: token || "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          showQuizs: {
            merge(existing = [], incoming = []) {
              const existsArr = existing.map((item: any) => item.__ref);
              const filterIncoming = incoming.filter(
                (item: any) => !existsArr.includes(item.__ref)
              );
              return [...existing, ...filterIncoming];
            },
            read(existing) {
              return existing && Object.values(existing);
            },
          },
        },
      },
    },
  }),
});
