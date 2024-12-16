import { NavLink } from "react-router";
import images from "../../../assets/images/importImages";

export default function AllCourseCardItem({
  courseItem,
}: {
  courseItem: Course;
  }) {
  if(!courseItem) {return <div>loading...</div>}
  const { image, likes, _id } = courseItem || {};
  const courseDocData = JSON.parse(courseItem?.title);

  return (
    <div className="w-[315px] h-[258px] bg-white rounded-3xl shadow-blue relative flex flex-col items-center">
      {/* 이미지 컨테이너 */}
      <div className="relative">
        <img
          src={image}
          alt="Course Image"
          className="w-[290px] h-[177px] mt-[10.93px] rounded-2xl object-cover"
        />
        {/* 좋아요 버튼 */}
        <div className="absolute flex items-center justify-center bg-[#2E2E2E] opacity-20 rounded-full top-[18px] right-[8.71px] h-7 w-7 cursor-pointer">
          <img
            src={images.like_icon}
            alt="Like Icon"
            className="h-[13px] w-[14px]"
          />
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="w-full px-4 mt-3">
        {/* 제목과 평점 */}
        <div className="flex items-center justify-between">
          <NavLink to={`/course-content/${_id}`}>
            <span className="text-sm font-medium text-custom-black font-pretendard max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
              {courseDocData.courseTitle}
            </span>
          </NavLink>
          <div className="flex flex-row items-center">
            {/* 하트 아이콘 */}
            <div className="flex flex-row items-center">
              <img
                src={images.like_filled_icon}
                alt="Like Filled Icon"
                className="h-[9px] w-[10px]"
              />
              <p className="font-pretendard text-[13px] font-regular text-custom-black pl-1">
                {likes.length}
              </p>
            </div>
          </div>
        </div>

        {/* 위치 */}
        <div className="flex items-center mt-1 max-w-[275px]">
          {/* 주소 아이콘 */}
          <img
            src={images.location_icon}
            alt="Location Icon"
            className="w-4 h-4 mr-1"
          />
          <p className="font-pretendard text-[13px] text-custom-gray overflow-hidden text-ellipsis whitespace-nowrap">
            {/* {courseDocData.locationObjs[0].locationAddress} */}
          </p>
        </div>
      </div>
    </div>
  );
}
