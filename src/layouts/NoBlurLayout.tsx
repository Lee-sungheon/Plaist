import { Outlet } from "react-router";

export default function BackgroundLayout() {
  return (
    <div
      id="background"
      className="relative flex justify-center items-center h-screen bg-white overflow-hidden"
    >
      <section
        id="main-content-box"
        className="relative flex justify-center items-center w-[100vw] h-[100vh]  bg-transparent "
      >
        <Outlet /> {/* 중첩된 라우트가 렌더링될 위치 */}
      </section>
    </div>
  );
}
