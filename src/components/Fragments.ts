import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
  }
`;

export const SHOW_QUIZ_FRAGMENT = gql`
  fragment ShowQuizFragment on Quiz {
    id
    user {
      ...UserFragment
    }
    genre
    quizHashtags {
      id
      hashtag
    }
    answerRate
    totalLikes
    content
    choice
    type
    image
    isMine
    answer
    nextTry
    isWinner
    isLiked
    totalLikes
  }
  ${USER_FRAGMENT}
`;
