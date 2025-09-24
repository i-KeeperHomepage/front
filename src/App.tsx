import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/app/layout/publicLayout";

// 페이지 import
import SiteHome from "@/app/routes/SiteHome";
import SiteAbout from "./app/routes/SiteAbout";
import Activities from "./app/routes/Activities";
import ActivityDetail from "@/app/routes/ActivityDetail";
import Reference from "@/app/routes/Reference";
import PostDetail from "@/components/postDetail/PostDetail";

import { demoPosts } from "@/app/routes/demoPosts";
import Support from "./app/routes/Support";
// import Login from "@/app/routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <SiteHome /> },
      { path: "about", element: <SiteAbout /> },
      // Activities
      {
        path: "activities",
        children: [
          { index: true, element: <Activities /> },
          {
            path: ":id",
            element: <ActivityDetail />,
          },
        ],
      },
      // Reference (3개 게시판)
      {
        path: "reference",
        children: [
          { index: true, element: <Reference /> },

          // Keeper세미나 상세
          {
            path: "KeeperSeminar/:id",
            element: <PostDetail post={demoPosts[0]} />, // ← 데모 데이터 (나중에 fetch로 교체)
          },
          // 정보공유세미나 상세
          {
            path: "seminar/:id",
            element: <PostDetail post={demoPosts[2]} />,
          },
          // 특강 상세
          {
            path: "special/:id",
            element: <PostDetail post={demoPosts[1]} />,
          },

        ],
      },
      {
        path: "support",
        children: [
          { index: true, element: <Support /> },
          {
            path: ":id",
            element: <PostDetail post={demoPosts[0]} />, // 데모용
          },
        ],
      }   

    ],
  },
]);

export default router;
