import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { apolloClient } from "../../apolloClient";
import { showQuiz_showQuiz } from "../../__generated__/showQuiz";
import { toggleQuizLike } from "../../__generated__/toggleQuizLike";

const TOGGLE_QUIZ_LIKE_MUTATION = gql`
  mutation toggleQuizLike($id: Int!) {
    toggleQuizLike(id: $id) {
      ok
      error
    }
  }
`;

interface Ilike {
  showQuiz: showQuiz_showQuiz;
}

export default function Like({ showQuiz }: Ilike) {
  const param = useParams();

  const onCompleted = (data: toggleQuizLike) => {
    if (data.toggleQuizLike?.ok) {
      apolloClient.cache.modify({
        id: `Quiz:${showQuiz.id}`,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalLikes(prev, { readField }) {
            if (readField("isLiked")) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    } else {
      // 로그인 안했을때 또는 error 났을때 등
    }
  };

  const [toggleQuizLikeMutation] = useMutation<toggleQuizLike>(
    TOGGLE_QUIZ_LIKE_MUTATION,
    {
      onCompleted,
    }
  );

  const onHeartClick = () => {
    toggleQuizLikeMutation({
      variables: {
        id: parseInt(param.id as string),
      },
    });
  };
  return (
    <>
      <div className="flex mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 20 20"
          fill={showQuiz.isLiked ? "#d73c36" : "#d1d1d1"}
          onClick={onHeartClick}
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-1 text-gray-600">{showQuiz?.totalLikes}</span>
      </div>
    </>
  );
}
