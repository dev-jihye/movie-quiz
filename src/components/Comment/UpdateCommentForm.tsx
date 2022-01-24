import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { USER_FRAGMENT } from "../../utils/Fragments";
import TextareaAutosize from "react-textarea-autosize";

const UPDATE_QUIZ_COMMENT_MUTATION = gql`
  mutation UpdateQuizComment($id: Int!, $content: String!) {
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
export default function UpdateCommentForm({ comment, setIsEditable }: any) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (comment) {
      setValue("content", comment.content);
    }
  }, [comment]);

  const onCompleted = (data: any) => {
    setIsEditable(false);
  };
  const [updateQuizCommentMutation] = useMutation(
    UPDATE_QUIZ_COMMENT_MUTATION,
    {
      onCompleted,
    }
  );

  const onCancelClick = () => {
    setIsEditable(false);
  };

  const onSubmit = (data: any) => {
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
