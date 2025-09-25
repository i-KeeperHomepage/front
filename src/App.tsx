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

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <SiteHome /> },
      { path: "about", element: <SiteAbout /> },
      { path: "rule", element: <Rule /> },

      // Notice
      {
        path: "notice",
        element: <Notice />,
      },
      {
        path: "notice/write",
        element: (
          <PostForm
            categoryOptions={["공지"]}
            basePath="/notice"
            apiEndpoint="/api/posts"
          />
        ),
      },
      {
        path: "notice/:id",
        element: <NoticeDetail />,
      },

      // Activities
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "activities/write",
        element: (
          <PostForm
            categoryOptions={["팀빌딩"]}
            basePath="/activities"
            apiEndpoint="/api/posts"
          />
        ),
      },
      {
        path: "activities/:id",
        element: <ActivityDetail />,
      },

      // Reference (3개 게시판)
      {
        path: "reference",
        element: <Reference />,
      },
      {
        path: "reference/KeeperSeminar/write",
        element: (
          <PostForm
            categoryOptions={["Keeper 세미나"]}
            basePath="/reference/"
            apiEndpoint="/api/posts"
          />
        ),
      }, {
        path: "reference/KeeperSeminar/:id",
        element: <ReferenceDetail />,
      },
      {
        path: "reference/seminar/write",
        element: (
          <PostForm
            categoryOptions={["Info Sharing Seminar"]}
            basePath="/reference/"
            apiEndpoint="/api/posts"
          />
        ),
      }, { path: "reference/seminar/:id", element: <ReferenceDetail /> },
      {
        path: "reference/special/write",
        element: (
          <PostForm
            categoryOptions={["Special Lecture"]}
            basePath="/reference/"
            apiEndpoint="/api/posts"
          />
        ),
      },

      { path: "reference/special/:id", element: <ReferenceDetail /> },

      //gallery
      {
        path: "gallery",
        element: <Gallery />,
      },

      // Support
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "support/write",
        element: (
          <PostForm
            categoryOptions={["Inquiry"]}
            basePath="/support"
            apiEndpoint="/api/posts"
          />
        ),
      },
      { path: "support/:id", element: <SupportDetail /> },
      { path: "library", element: <Library /> },
      { path: "fee", element: <Fee /> },
      { path: "cleaning", element: <Cleaning /> },
    ],
  },
]);

export default router;