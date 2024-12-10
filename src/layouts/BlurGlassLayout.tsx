import { Outlet } from "react-router";
import Blur from "./Blur";
import Glass from "../components/Glass";

export default function BackgroundLayout() {
  return (
    <div
      id="background"
      className="relative flex items-center justify-center h-screen overflow-hidden bg-white"
    >
      <Blur />
      <section
        id="main-content-box"
        className="relative flex justify-center items-center w-[90vw] h-[90vh] max-w-[767px] max-h-[1080px] bg-transparent"
      >
        <Glass>
          <Outlet /> {/* 중첩된 라우트가 렌더링될 위치 */}
        </Glass>
      </section>
    </div>
  );
}
