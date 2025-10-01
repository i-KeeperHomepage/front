// ==============================
// 활동 페이지 (Activities.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리의 "활동(Activities)" 게시판을 보여줍니다.
// 주요 기능:
// 1. 데모 데이터를 사용하여 게시글 목록을 표시 (나중에 백엔드 연결 예정)
// 2. 페이지네이션 기능 (한 페이지당 5개 글 표시)
// 3. 새로운 글 작성 시 목록에 추가
// 4. PostTable 컴포넌트를 사용하여 표 형태로 게시글 출력
//
// English Explanation:
// This component displays the club "Activities" board.
// Main features:
// 1. Displays posts using demo data (will connect to backend later)
// 2. Pagination (shows 5 posts per page)
// 3. Adds new posts to the list when created
// 4. Uses the PostTable component to render posts in a table format

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import PostTable from "@/components/postable/PostTable";
import { Outlet } from "react-router-dom";

export default function Activities() {
  const [posts, setPosts] = useState<DemoPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 한국어: 페이지네이션 상태 (현재 페이지 번호)
  // English: Pagination state (current page number)
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    // 한국어: 지금은 데모 데이터 사용
    // English: For now, use demo data
    setPosts(demoPosts);
    setLoading(false);
  }, []);

  // 한국어: 나중에 백엔드 연결 시 fetch API 주석 해제
  // English: Later, uncomment fetch API for backend connection
  /*
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts?category=activities&page=" + currentPage);
        const data = await res.json();

        // 한국어: 백엔드 데이터를 프론트 형식으로 매핑
        // English: Map backend data into frontend format
        const mapped: Post[] = data.items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "활동",
          title: p.title,
          author: p.author?.name || "알 수 없음",
          createdAt: p.createdAt,
          content: p.content,
          image: p.imageUrl,
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage]);
  */

  // ===========================
  // 새 글 반영
  // ===========================
  //
  // 한국어: location.state에 새 글이 있으면 기존 게시글 위에 추가
  // English: If a new post exists in location.state, prepend it to the list
  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section>
      <PostTable
        posts={posts}                // 게시글 목록 / Post list
        currentPage={currentPage}    // 현재 페이지 / Current page
        setCurrentPage={setCurrentPage} // 페이지 변경 함수 / Page change handler
        postsPerPage={5}             // 한 페이지당 글 개수 / Posts per page
        basePath="/activities"       // 상세보기, 글쓰기 경로 / Path for detail and write
        title="Team Bulid"        // 게시판 제목 / Board title
        showWriteButton={true}       // 작성 버튼 보이기 여부 / Show write button
      />
      <Outlet />
    </section>
  );
}
