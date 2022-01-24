import { gql, useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { apolloClient } from "../../apolloClient";
import { classNames } from "../../constance";

const DELETE_QUIZ_COMMENT_MUTATION = gql`
  mutation DeleteQuizComment($id: Int!) {
    deleteQuizComment(id: $id) {
      ok
      error
    }
  }
`;

export default function CommentDelBtn({ comment }: any) {
  const onDeleteCompleted = (data: any) => {
    apolloClient.cache.evict({
      id: `QuizComment:${comment.id}`,
    });
    apolloClient.cache.gc();
  };

  const [deleteQuizCommentMutation] = useMutation(
    DELETE_QUIZ_COMMENT_MUTATION,
    {
      onCompleted: onDeleteCompleted,
    }
  );

  const onDeleteClick = () => {
    const ok = window.confirm("댓글을 삭제하시겠습니까?");
    if (ok) {
      deleteQuizCommentMutation({
        variables: {
          id: comment.id,
        },
      });
    }
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onDeleteClick}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm w-full"
          )}
        >
          삭제
        </button>
      )}
    </Menu.Item>
  );
}
