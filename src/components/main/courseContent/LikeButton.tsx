import { useEffect, useState } from "react";
import images from "../../../assets/images/importImages";
import { deleteLikes, postLikes } from "../../../api/react-query/likeApi";
import { getUserIdFromToken } from "../../../api/userApi";

export default function LikeButton({ courseObj }: { courseObj: Course }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState<string | null>(null);
  const { _id } = courseObj || {};
  const userId = getUserIdFromToken();

  useEffect(() => {
    const userLike = courseObj.likes.find((like) => like.user === userId);
    if (userLike) {
      setIsLiked(true);
      setLikeId(userLike._id);
    } else {
      setIsLiked(false);
      setLikeId(null);
    }
  }, [courseObj.likes, userId]);

  // 좋아요 버튼 클릭 핸들러
  const onLikeButtonClickHandler = async () => {
    if (!_id) return;
    try {
      if (!isLiked) {
        const res = await postLikes(_id);
        setLikeId(res._id);
        setIsLiked(true);
        console.log(courseObj);
      } else {
        if (!likeId) return;
        await deleteLikes(likeId);
        setLikeId(null);
        setIsLiked(false);
        console.log(courseObj);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={onLikeButtonClickHandler}
      className="absolute h-[49px] w-[49px] bg-custom-black opacity-80 rounded-full right-[60px] top-[-79px] flex justify-center items-center cursor-pointer pt-[6px]"
    >
      {isLiked ? (
        <img src={images.white_heart_filled_icon} alt="" className="" />
      ) : (
        <img src={images.white_heart_not_filled_icon} alt="" className="" />
      )}
    </button>
  );
}
