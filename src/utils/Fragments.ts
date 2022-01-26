import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
  }
`;

export const QUIZ_HASHTAGS_FRAGMENT = gql`
  fragment QuizHashtagsFragment on QuizHashtag {
    id
    hashtag
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
      ...QuizHashtagsFragment
    }
    answerRate
    totalLikes
    content
    choice
    type
    image
    isMine
    isTried
    answer
    nextTry
    isWinner
    isLiked
    totalLikes
  }
  ${USER_FRAGMENT}
  ${QUIZ_HASHTAGS_FRAGMENT}
`;
