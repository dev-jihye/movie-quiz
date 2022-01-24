import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { loginUserVar } from "../../makeVars/UserVars";
import { USER_FRAGMENT } from "../../utils/Fragments";
import { mainColor } from "../../utils/Styles";

const CREATE_QUIZ_COMMENT_MUTATION = gql`
  mutation createQuizComment($id: Int!, $content: String!) {
    createQuizComment(id: $id, content: $content) {
      ok
      error
      comment {
        id
        user {
          ...UserFragment
        }
        content
        createdAt
      }
    }
  }
  ${USER_FRAGMENT}
`;

export default function CommentForm({ refetch }: any) {
  const loginUser = useReactiveVar(loginUserVar);
  const param = useParams();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const onCompleted = (data: any) => {
    if (data?.createQuizComment?.ok) {
      refetch();
    }
  };
  const [createQuizCommentMutation] = useMutation(
    CREATE_QUIZ_COMMENT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = (data: any) => {
    createQuizCommentMutation({
      variables: {
        id: parseInt(param.id as string),
        content: data?.comment,
      },
    });
    setValue("comment", "");
  };
  return (
    <>
      <div>
        <div className="flex items-start mt-4 space-x-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block object-cover w-10 h-10 rounded-full"
              src={
                loginUser?.me?.avatar?.Location ||
                encodeURI(
                  `https://ui-avatars.com/api/?name=${loginUser?.me?.username}&color=7F9CF5&background=EBF4FF`
                )
              }
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex-1 min-w-0">
              <div className="overflow-hidden border border-gray-300 rounded-lg shadow-sm">
                <label htmlFor="comment" className="sr-only">
                  댓글 달기
                </label>
                <textarea
                  className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="댓글 달기"
                  {...register("comment", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex justify-end py-2">
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm hover:opacity-70 focus:outline-none"
                    style={{ background: mainColor.mainColor }}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
