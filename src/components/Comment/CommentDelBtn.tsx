import { gql, useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { apolloClient } from "../../apolloClient";
import { classNames } from "../../constance";
import { deleteQuizComment } from "../../__generated__/deleteQuizComment";
import { showQuizComments_showQuizComments } from "../../__generated__/showQuizComments";

const DELETE_QUIZ_COMMENT_MUTATION = gql`
  mutation deleteQuizComment($id: Int!) {
    deleteQuizComment(id: $id) {
      ok
      error
    }
  }
`;

interface IcommentDelBtn {
  comment: showQuizComments_showQuizComments;
}
export default function CommentDelBtn({ comment }: IcommentDelBtn) {
  const onDeleteCompleted = () => {
    apolloClient.cache.evict({
      id: `QuizComment:${comment.id}`,
    });
    apolloClient.cache.gc();
  };

  const [deleteQuizCommentMutation] = useMutation<deleteQuizComment>(
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
