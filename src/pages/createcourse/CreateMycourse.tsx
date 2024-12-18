import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images/importImages";
import SelectTag from "./SelectTag";
import SelectCourseMain from "./SelectCourseMain";
import ExplainCourse from "./ExpainCourse";
import SucessMyPost from "./SucessMyPost";
import Mapview from "./MapView";
import {
  InputTagsContext,
  InputCourseDetailsContext,
  InputLocationContext,
  InputExplainationContext,
} from "./postingcontext";

type ContextByStep = {
  태그입력: InputTagsContext;
  코스상세입력: InputCourseDetailsContext;
  장소선택: InputLocationContext;
  게시글작성: InputExplainationContext;
  완료: object;
};

export default function CreateMyCourse() {
  const navigate = useNavigate(); // useNavigate를 컴포넌트 최상단에서 호출
  // 진행 상태에 따른 이미지를 가져오는 함수
  const getProgressBarImage = (step: keyof ContextByStep) => {
    const stepNumber = {
      태그입력: 1,
      코스상세입력: 2,
      장소선택: 2,
      게시글작성: 3,
      완료: 4,
    }[step];

    return images[`progress_bar${stepNumber}`] || images["default_progress"]; // 안전한 접근
  };

  // UseFunnelResults 타입 정의
  const funnel = useFunnel<ContextByStep>({
    id: "my-funnel-app",
    initial: {
      step: "태그입력",
      context: { withWhom: [], styles: [], locationObjs: [] },
    },
  });

  console.log(funnel.step); // current step 확인

  return (
    <div className="mt-[95px] max-w-[767px]  flex flex-col items-center">
      <aside>
        <figure>
          <img src={getProgressBarImage(funnel.step)} alt="Progress bar" />
        </figure>
      </aside>

      {/* step별 렌더링 */}
      {(() => {
        switch (funnel.step) {
          case "태그입력":
            return (
              <SelectTag
                onNext={(withWhom, styles) =>
                  funnel.history.push("코스상세입력", {
                    withWhom,
                    styles,
                  })
                }
              />
            );
          case "코스상세입력":
            return (
              <SelectCourseMain
                locationObjs={funnel.context.locationObjs || []}
                locationObjDelete={(id: number) => {
                  const updatedLocationObjs =
                    funnel.context.locationObjs?.filter(
                      (_, index) => index !== id
                    );

                  funnel.history.replace("코스상세입력", {
                    ...funnel.context,
                    locationObjs: updatedLocationObjs,
                  });

                  console.log(updatedLocationObjs);
                }}
                onPlus={(estimatedTime, estimatedCost, locationObjs) => {
                  funnel.history.push("장소선택", {
                    estimatedTime,
                    estimatedCost,
                    locationObjs,
                  });
                }}
                onNext={(
                  estimatedTime,
                  estimatedCost,
                  locationObjs,
                  channelIdList
                ) => {
                  funnel.history.push("게시글작성", {
                    estimatedTime,
                    estimatedCost,
                    locationObjs,
                    channelIdList,
                  });
                }}
                onBack={funnel.history.back}
              />
            );
          case "장소선택":
            return (
              <Mapview
                onNext={(location) => {
                  const updatedLocationObjs = [
                    ...(funnel.context.locationObjs || []),
                    location,
                  ];
                  funnel.history.replace("코스상세입력", {
                    locationObjs: updatedLocationObjs,
                  });
                }}
                onBack={funnel.history.back}
              />
            );
          case "게시글작성":
            return (
              <ExplainCourse
                locationObjs={funnel.context.locationObjs}
                withWhom={funnel.context.withWhom}
                styles={funnel.context.styles}
                estimatedTime={funnel.context.estimatedTime}
                estimatedCost={funnel.context.estimatedCost}
                onNext={(courseTitle, courseDescription, image) =>
                  funnel.history.push("완료", {
                    courseTitle,
                    courseDescription,
                    image,
                  })
                }
                onBack={funnel.history.back}
              />
            );
          case "완료":
            return (
              <SucessMyPost
                onNext={() => {
                  navigate("/"); // 홈으로 이동
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

