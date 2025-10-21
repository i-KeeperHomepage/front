import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/app/layout/publicLayout";

// 페이지 import
import SiteHome from "@/app/routes/SiteHome";
import SiteAbout from "@/app/routes/SiteAbout";
import Rule from "@/app/routes/Rule";

import Activities from "@/app/routes/Activities";
import ActivityDetail from "@/app/routes/ActivityDetail";

import Reference from "@/app/routes/Reference";
import ReferenceDetail from "@/app/routes/ReferenceDetail";

import Notice from "@/app/routes/Notice";
import NoticeDetail from "@/app/routes/NoticeDetail";

import Gallery from "@/app/routes/Gallery";

import Support from "@/app/routes/Support";
import SupportDetail from "@/app/routes/SupportDetail";

import Library from "@/app/routes/Library";
import Fee from "@/app/routes/Fee";
import Cleaning from "@/app/routes/Cleaning";

import PostForm from "@/components/postForm/PostForm";
import Login from "./app/routes/Login";
import Register from "./app/routes/Register";
import MyPage from "./app/routes/Mypage";
import ProtectedRoute from "@/components/ProtectedRoute";
import OfficerPage from "./app/routes/admin/OfficerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <SiteHome /> },
      { path: "about", element: <SiteAbout /> },
      { path: "rule", element: <Rule /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      {
        path: "mypage",
        element: <ProtectedRoute element={<MyPage />} />,
      },

      // Officer 전용
      {
        path: "officer",
        element: (
          <ProtectedRoute element={<OfficerPage />} requiredRole="officer" />
        ),
      },

      // Notice (categoryId = 1)
      { path: "notice", element: <Notice /> },
      {
        path: "notice/write",
        element: (
          <PostForm
            categoryOptions={["공지"]}
            basePath="/notice"
            apiEndpoint="/api/posts?categoryId=1"
          />
        ),
      },
      { path: "notice/:id", element: <NoticeDetail /> },

      // Activities (categoryId = 2)
      { path: "activities", element: <Activities /> },
      {
        path: "activities/write",
        element: (
          <PostForm
            categoryOptions={["팀빌딩"]}
            basePath="/activities"
            apiEndpoint="/api/posts?categoryId=2"
          />
        ),
      },
      { path: "activities/:id", element: <ActivityDetail /> },

      // Reference (세미나, 특강 등)
      { path: "seminar", element: <Reference /> },

      // Keeper Seminar (categoryId = 3)
      {
        path: "seminar/KeeperSeminar/write",
        element: (
          <PostForm
            categoryOptions={["Keeper 세미나"]}
            basePath="/seminar/KeeperSeminar"
            apiEndpoint="/api/posts?categoryId=3"
          />
        ),
      },
      { path: "seminar/KeeperSeminar/:id", element: <ReferenceDetail /> },

      // Info Sharing Seminar (categoryId = 4)
      {
        path: "seminar/seminar/write",
        element: (
          <PostForm
            categoryOptions={["정보공유세미나"]}
            basePath="/seminar/seminar"
            apiEndpoint="/api/posts?categoryId=4"
          />
        ),
      },
      { path: "seminar/seminar/:id", element: <ReferenceDetail /> },

      // Special Lecture (categoryId = 5)
      {
        path: "seminar/special/write",
        element: (
          <PostForm
            categoryOptions={["특강"]}
            basePath="/seminar/special"
            apiEndpoint="/api/posts?categoryId=5"
          />
        ),
      },
      { path: "seminar/special/:id", element: <ReferenceDetail /> },

      // Gallery (파일 관리 API 사용)
      { path: "gallery", element: <Gallery /> },

      // Support (1:1 문의, categoryId = 6)
      { path: "support", element: <Support /> },
      {
        path: "support/write",
        element: (
          <PostForm
            categoryOptions={["Inquiry"]}
            basePath="/support"
            apiEndpoint="/api/posts?categoryId=6"
          />
        ),
      },
      { path: "support/:id", element: <SupportDetail /> },

      // 기타 기능 페이지
      { path: "library", element: <Library /> },
      { path: "fee", element: <Fee /> },
      { path: "cleaning", element: <Cleaning /> },
    ],
  },
]);

export default router;
