export default function Comment() {
  return (
    <div>
      <p>댓글 8</p>

      <div>
        <div className="flex items-start space-x-4 mt-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <label htmlFor="comment" className="sr-only">
                댓글 달기
              </label>
              <textarea
                name="comment"
                id="comment"
                className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                placeholder="댓글 달기"
                defaultValue={""}
              />
            </div>

            <div className="flex justify-end py-2">
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-start space-x-4 mt-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              {/* <label htmlFor="comment" className="sr-only">
                  댓글
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="댓글 달기"
                  defaultValue={""}
                /> */}
              <div className="block w-full p-3 border-0 resize-none focus:ring-0 sm:text-sm">
                <div className="flex mb-2">
                  <p>jjellyy</p>
                  <p className="text-gray-500 ml-4">1시간 전</p>
                </div>
                <p>댓글입니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
