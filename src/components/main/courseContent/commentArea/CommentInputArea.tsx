import { useState } from "react";
import images from "../../../../assets/images/importImages";
import { postComment } from "../../../../api/commentApi";

export default function CommentInputArea({ contentId }: { contentId: string }) {
  const [comment, setComment] = useState("");

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const onCommentSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (comment === "") return alert("댓글 내용을 입력해 주세요.");
    await postComment({ contentId, comment });
    console.log("댓글 입력 완료");
    setComment("");
  };

  return (
    <div className="flex flex-col gap-[23px]">
      {/* 네임카드와 댓글 개수 표시 */}
      <div className="flex items-center justify-between">
        {/* 네임카드 */}
        <div className="flex items-center gap-[10px]">
          <img
            src={images.course_user_profile_img}
            alt=""
            className="w-10 h-10 rounded-full bg-primary-200"
          />
          <div className="text-base font-bold text-primary-800">imaria0218</div>
        </div>
        {/* 코맨트 개수 */}
        <div className="flex items-center gap-1 px-[9px]">
          <img
            src={images.course_comment_icon}
            alt=""
            className="w-[14px] h-[15px]"
          />
          <p className="text-[13px] font-regular leading-5 text-primary-700">
            213
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={onCommentSubmitHandler}>
          <textarea
            spellCheck="true"
            onChange={onInputChangeHandler}
            placeholder="타자를 두들길 준비 되셨나요? (｡･∀･)ﾉﾞ"
            className="w-[558px] h-[107px] bg-[#F3F2F3] rounded-[15px] px-5 py-6 text-[13px] "
            value={comment}
          />
          <button type="submit">댓글 입력</button>
        </form>
      </div>
    </div>
  );
}
