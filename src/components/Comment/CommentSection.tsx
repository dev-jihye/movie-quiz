import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { USER_FRAGMENT } from "../Fragments";

const SHOW_QUIZ_COMMENTS_QUERY = gql`
  query showQuizComments($id: Int!, $take: Int, $lastId: Int) {
    showQuizComments(id: $id, take: $take, lastId: $lastId) {
      id
      user {
        ...UserFragment
      }
      content
      isMine
      createdAt
    }
  }
  ${USER_FRAGMENT}
`;

export default function CommentSection() {
  const param = useParams();
  const { loading, error, data, refetch } = useQuery(SHOW_QUIZ_COMMENTS_QUERY, {
    variables: {
      id: parseInt(param.id as string),
    },
  });

  return (
    <div>
      <p>댓글 {data?.showQuizComments?.length}</p>
      <CommentForm refetch={refetch} />
      {data?.showQuizComments?.map((comment: any, index: number) => (
        <Comment comment={comment} key={index} />
      ))}
    </div>
  );
}
