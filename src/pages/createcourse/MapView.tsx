import images from "../../assets/images/importImages";

export default function SelectCourseMain() {
  return (
    <div>
      <aside>
        <figure>
          <img src={images.progress_bar2} alt="Progress bar-select-course2" />
        </figure>
      </aside>
      <section>
        <h1>첫번째 코스 선택</h1>
        <section>
          <div className="w-96 h-80 rounded-tl-2xl rounded-tr-2xl">
            지도 뷰 들어갈 위치
          </div>
          서치바
          <div>검색 결과 렌더링될 위치</div>
        </section>
      </section>
      {/* 단계 변경 버튼 예시 */}
      <button>다음</button>
    </div>
  );
}
