import { gql, useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { USER_FRAGMENT } from "../../utils/Fragments";
import TextareaAutosize from "react-textarea-autosize";
import { showQuizComments_showQuizComments } from "../../__generated__/showQuizComments";
import { updateQuizComment } from "../../__generated__/updateQuizComment";

const UPDATE_QUIZ_COMMENT_MUTATION = gql`
  mutation updateQuizComment($id: Int!, $content: String!) {
    updateQuizComment(id: $id, content: $content) {
      ok
      error
      comment {
        id
        user {
          ...UserFragment
        }
        content
      }
    }
  }
  ${USER_FRAGMENT}
`;

interface IupdateCommentForm {
  comment: showQuizComments_showQuizComments;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

interface IuseForm {
  content: string;
}
export default function UpdateCommentForm({
  comment,
  setIsEditable,
}: IupdateCommentForm) {
  const { register, handleSubmit, setValue } = useForm<IuseForm>();

  useEffect(() => {
    if (comment) {
      setValue("content", comment.content);
    }
  }, [comment]);

  const onCompleted = () => {
    setIsEditable(false);
  };
  const [updateQuizCommentMutation] = useMutation<updateQuizComment>(
    UPDATE_QUIZ_COMMENT_MUTATION,
    {
      onCompleted,
    }
  );

  const onCancelClick = () => {
    setIsEditable(false);
  };

  const onSubmit = (data: IuseForm) => {
    updateQuizCommentMutation({
      variables: {
        id: comment.id,
        content: data.content,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          {...register("content")}
          minRows={2}
          className="w-full"
        />
        <button
          type="button"
          className="mr-2 text-gray-500"
          onClick={onCancelClick}
        >
          취소
        </button>
        <button type="submit" className="text-indigo-700">
          저장
        </button>
      </form>
    </>
  );
}
