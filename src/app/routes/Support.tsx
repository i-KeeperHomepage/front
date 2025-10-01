// ==============================
// Support.tsx (1대1 문의 게시판 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 1대1 문의(Inquiry) 게시판 화면입니다.
// 주요 기능:
// 1. 게시글(Post) 목록 불러오기 (현재는 demoPosts 사용, 나중엔 백엔드 API 연결)
// 2. 페이지네이션 (currentPage 상태로 관리)
// 3. 새로운 글 작성 시 location.state를 통해 목록에 반영
//
// English Explanation:
// This component is the 1:1 Inquiry board page.
// Main features:
// 1. Fetch posts (currently using demoPosts, later will connect to backend API)
// 2. Pagination (managed with currentPage state)
// 3. Reflect new posts using location.state after writing

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import { Outlet } from "react-router-dom";

export default function Support() {
  // 한국어: 게시글 목록 상태 / English: State for post list
  const [posts, setPosts] = useState<DemoPost[]>([]);
  // 한국어: 로딩 상태 / English: Loading state
  const [loading, setLoading] = useState(true);
  // 한국어: 현재 페이지 번호 / English: Current page number
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    // 한국어: 현재는 demoPosts 사용 / English: Using demoPosts for now
    setPosts(demoPosts);
    setLoading(false);

    // 한국어: 나중에 백엔드 연결시 주석 해제 / English: Uncomment when connecting to backend
    /*
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:4000/api/support");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("1대1 Inquiry 게시판 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
    */
  }, []);

  // 한국어: 새로운 글 작성 시 state로 전달된 글 추가 / English: Add new post when passed via state
  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중...</p>; // Loading 메시지 / Loading message

  return (
    <section>
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/support"
        title="Inquiry"
        showWriteButton={true} // 한국어: 글쓰기 버튼 항상 표시 / English: Always show write button
      />
      <Outlet /> {/* 한국어: 상세 페이지 렌더링 / English: Render nested routes (post detail) */}
    </section>
  );
}
