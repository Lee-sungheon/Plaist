import { NavLink, Outlet, useNavigate } from "react-router";

export default function RootLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <nav className="flex gap-4 p-4 bg-gray-100 shadow">
        <button
          onClick={handleBack}
          className="flex items-center px-3 py-1 text-gray-700 bg-gray-200 rounded"
        >
          ← 뒤로 가기
        </button>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          피드
        </NavLink>
        <NavLink
          to="/category"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          카테고리
        </NavLink>
        <NavLink
          to="/createCourse"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          코스생성
        </NavLink>
        <NavLink
          to="/my-page"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          마이페이지
        </NavLink>
        {/* test */}
        {/* test */}
        {/* test */}
        <NavLink
          to="/channelTest"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          test-채널
        </NavLink>
        <NavLink
          to="/authTest"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          test-권한
        </NavLink>
        <NavLink
          to="/userTest"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          test-유저
        </NavLink>
        <NavLink
          to="/searchTest"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          test-검색
        </NavLink>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
