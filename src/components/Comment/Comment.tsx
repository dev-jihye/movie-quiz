import { useState } from "react";
import CommentDropMenu from "./CommentDropMenu";
import UpdateCommentForm from "./UpdateCommentForm";
import moment from "moment";
import "moment/locale/ko";

export default function Comment({ comment }: any) {
  const createdAt = moment(
    moment.unix(Number(comment.createdAt) / 1000)
  ).fromNow();
  console.log(comment.createdAt);
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div>
      <div className="flex items-start mt-4 space-x-4">
        <div className="flex-shrink-0">
          <img
            className="inline-block w-10 h-10 rounded-full"
            src={
              comment.user.avatar ||
              encodeURI(
                `https://ui-avatars.com/api/?name=${comment.user.username}&color=7F9CF5&background=EBF4FF`
              )
            }
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="overflow-hidden border border-gray-300 rounded-lg shadow-sm ">
            <div className="block w-full p-3 border-0 resize-none sm:text-sm">
              <div className="flex mb-2">
                <p>{comment.user.username}</p>
                <p className="ml-4 text-gray-500">{createdAt}</p>
              </div>
              {isEditable ? (
                <div>
                  <UpdateCommentForm
                    comment={comment}
                    setIsEditable={setIsEditable}
                  />
                </div>
              ) : (
                <p>{comment.content}</p>
              )}
            </div>
          </div>
        </div>
        <CommentDropMenu comment={comment} setIsEditable={setIsEditable} />
      </div>
    </div>
  );
}
