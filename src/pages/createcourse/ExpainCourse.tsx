import { useState, useEffect } from "react";
import images from "../../assets/images/importImages";
import CreateMyCourseFlowButton from "./../../components/createMyCourseMain/CreateMyCourseFlowButton";
import { deleteFollow } from "../../api/api";

// props로 setCurrentStep을 받기 위한 타입 정의
interface ExplainCourseProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
  currentStep: string;
}

export default function ExplainCourse({
  setCurrentStep,
  currentStep,
}: ExplainCourseProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // 원의 갯수
  const [courseCount, setCourseCount] = useState(4);

  const categories: string[] = ["기념일", "생일", "로맨틱"];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsVisible(false), 100); // 메인 컨텐츠 숨기기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await deleteFollow("jade");
        console.log("API 응답 데이터:", data);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };
    setTimeout(() => setIsVisible(true), 200); // 메인 컨텐츠 나타나기
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* 주변 어두운 배경 (저장 후 배경을 원래대로 변경) */}
      {!isSaved && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* 메인 컨텐츠 */}
      <div
        className={`w-[767px] h-[1000px] bg-white shadow-lg rounded-3xl p-8 relative z-50 transform transition-all duration-700 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[1500px]"
        }`}
        style={{
          paddingLeft: "60px",
          paddingTop: "82px",
          paddingRight: "59px",
        }} // 패딩값 추가
      >
        <div className="flex justify-between relative">
          <div className="flex flex-col gap-6">
            {/* 제목 입력 */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
              className="w-[299px] h-[36px] text-2xl font-pretendard text-custom-black font-semibold p-0 placeholder-gray-400 focus:outline-none"
            />

            {/* 카테고리 */}
            <ul className="list-none p-0 m-0 w-[545px] flex flex-wrap gap-[12px]">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="w-[72px] h-[34px] text-[14px] rounded-[30px] border-2 border-primary-600 font-pretendard text-center flex items-center justify-center"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* 이동시간/예상금액 */}
            <div className="flex gap-8 text-sm text-primary-600 font-pretendard">
              <div className="flex items-center gap-2">
                <img
                  src={images.course_estimated_time_icon}
                  alt="이동시간 아이콘"
                  className="w-4 h-4"
                />
                <span>이동시간 1-2시간</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={images.course_budget_icon}
                  alt="예상금액 아이콘"
                  className="w-4 h-4"
                />
                <span>예상금액 2-3만원</span>
              </div>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="absolute top-[20px] right-0 w-[136px] h-[136px] bg-primary-50 rounded-lg flex items-center justify-center border">
            <img
              src={images.plus_icon}
              alt="플러스 아이콘"
              className="w-4 h-4"
            />
          </div>
        </div>

        {/* 코스 설명칸 */}
        <div className="mt-6 text-base font-semibold text-custom-black font-pretendard">
          내 코스를 임팩트 있게 소개해주세요.
        </div>
        <div className="mt-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="font-pretendard text-custom-black w-[645px] h-[83px] rounded-lg p-4 text-sm focus:outline-none resize-none"
            style={{ backgroundColor: "rgba(180, 184, 201, 0.2)" }}
          />
        </div>

        {/* 선택한 코스 */}
        <div className="mt-10">
          <h3 className="text-custom-black font-semibold mb-4 text-base">
            선택한 코스
          </h3>
          <div className="relative flex items-center justify-center gap-[56px]">
            {/* 원들을 유동적으로 렌더링 */}
            {Array.from({ length: courseCount }).map((_, index) => (
              <div
                key={index}
                className="w-[120px] h-[120px] bg-primary-200 rounded-full flex items-center justify-center z-10"
              ></div>
            ))}

            {/* 가로줄 */}
            <div
              className="absolute top-1/2 border-t-2 border-dashed border-primary-600 transform -translate-y-1/2 z-[-1]"
              style={{
                width: `${120 * courseCount + 56 * (courseCount - 1)}px`, // 원의 개수에 맞춰 가로줄의 길이 계산
                left: `calc(50% - ${
                  (120 * courseCount) / 2 + (56 * (courseCount - 1)) / 2
                }px)`, // 원의 중앙에 맞춰 가로줄 위치 조정
              }}
            ></div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-10 text-center">
          <CreateMyCourseFlowButton
            setCurrentStep={setCurrentStep} // 단계 변경 함수
            currentStep={currentStep} // 현재 단계
            isCompleteThisPage={true} // 페이지 완료 여부
          >
            <button
              onClick={handleSave}
              className="w-full h-full text-white rounded-[30px] "
            >
              저장
            </button>
          </CreateMyCourseFlowButton>
        </div>
      </div>
    </div>
  );
}
