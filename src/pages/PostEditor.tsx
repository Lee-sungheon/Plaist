import CreateMyCourseFlowButton from "../components/createMyCourseMain/CreateMyCourseFlowButton";
import TitleInputField from "../components/postEditor/TitleInputField";
import TagDisplay from "../components/postEditor/TagDisplay";
import CourseDetailDisplay from "../components/postEditor/CourseDetailDisplay";
import ImageUpLoadField from "../components/postEditor/ImageUpLoadField";
import DescriptionInputField from "../components/postEditor/DescriptionInputField";
import SelectedLocationsDisplay from "../components/postEditor/SelectedLocationsDisplay";
import useImageUpload from "../hooks/useImageUpload";
import { useEffect, useState } from "react";
import { editMyCourse } from "../api/postMyCourse";
import { getChannelIdList } from "../utills/mycourse/setPostTitle";

export default function PostEditor({
  isEditorOpened,
  onExitEditor,
  courseObj,
}: {
  isEditorOpened: boolean;
  onExitEditor: () => void;
  courseObj: CourseData;
}) {
  const { imagePreview, selectedImage, handleImageUpload } = useImageUpload();
  const titleStringtoObj = JSON.parse(courseObj.title);
  const {
    courseTitle,
    courseDescription,
    estimatedTime,
    estimatedCost,
    locationObjs,
    withWhom,
    style,
  }: TitleObj = titleStringtoObj;

  console.log(courseTitle);

  const [editedTitle, setTitle] = useState(courseTitle);
  const [editedDescription, setDescription] = useState(courseDescription);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    if (isEditorOpened) setTimeout(() => setIsVisible(true), 200);
    else setIsVisible(false);
  }, [isEditorOpened]);

  const handleEditComplete = async () => {
    const title = JSON.stringify({
      ...titleStringtoObj,
      courseTitle: editedTitle,
      courseDescription: editedDescription,
    });

    console.log(title, "변화한 타이틀 객체을 문자열로 변환한 값");
    const postId = courseObj._id;
    const imageToDeletePublicId = null;
    const channelIdList = getChannelIdList(titleStringtoObj.locationObjs);

    try {
      // `selectedImage` 여부에 따라 요청 생성
      const results = await Promise.allSettled(
        channelIdList.map((channelId) =>
          selectedImage
            ? editMyCourse({
                postId,
                title,
                image: selectedImage, // 이미지 추가
                imageToDeletePublicId,
                channelId,
              })
            : editMyCourse({
                postId,
                title,
                channelId, // 이미지 제외
              })
        )
      );

      // 결과 처리
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(
            `Success for channelId ${channelIdList[index]}:`,
            result.value
          );
        } else {
          console.error(
            `Error for channelId ${channelIdList[index]}:`,
            result.reason
          );
        }
      });
    } catch (error) {
      console.error("Unexpected error during course posting:", error);
    }
  };

  const onPutEditedData = () => {
    onExitEditor();
    handleEditComplete();
  };

  return (
    <>
      <div
        onClick={onExitEditor}
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${
          isEditorOpened ? "" : "hidden"
        }`}
      />
      <section
        className={`w-[767px] h-[1000px] bg-white shadow-lg rounded-3xl p-8 relative z-50 transform transition-all duration-700 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[1000px]"
        }`}
        style={{
          paddingLeft: "60px",
          paddingTop: "82px",
          paddingRight: "59px",
        }}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-6 w-[488px]">
            <TitleInputField
              value={editedTitle}
              handleTitleChange={handleTitleChange}
            />
            <TagDisplay tags={[...(withWhom ?? []), ...(style ?? [])]} />

            <CourseDetailDisplay
              estimatedTime={estimatedTime}
              estimatedCost={estimatedCost}
            />
          </div>
          <ImageUpLoadField
            imagePreview={imagePreview}
            handleImageUpload={handleImageUpload}
          />
        </div>

        <DescriptionInputField
          guidanceMessage="설명을 수정해주세요"
          value={editedDescription}
          handleDescriptionChange={handleDescriptionChange}
        />

        <SelectedLocationsDisplay locationObjs={locationObjs} />

        {/* isCompleteThisPage 로직 바꿔야  */}
        <div className="mt-10 text-center">
          <CreateMyCourseFlowButton
            onNext={onPutEditedData}
            isCompleteThisPage={true}
          >
            변경내용 저장
          </CreateMyCourseFlowButton>
        </div>
      </section>
    </>
  );
}
