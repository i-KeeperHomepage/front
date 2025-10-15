// ==============================
// 활동 페이지 (Activities.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리의 "활동(Activities)" 게시판을 보여줍니다.
// 주요 기능:
// 1. 백엔드에서 게시글 목록을 가져와 표시
// 2. 페이지네이션 기능 (한 페이지당 5개 글 표시)
// 3. 새로운 글 작성 시 목록에 반영
// 4. PostTable 컴포넌트를 사용하여 표 형태로 게시글 출력
//
// English Explanation:
// This component displays the club "Activities" board.
// Main features:
// 1. Fetch posts from backend and display them
// 2. Pagination (shows 5 posts per page)
// 3. Adds new posts when created
// 4. Uses PostTable component to render posts in a table format

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import { Outlet } from "react-router-dom";

interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  image?: string;
}

export default function Activities() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  // 한국어: 백엔드 데이터 불러오기
  // English: Fetch posts from backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts?category=activities&page=${currentPage}`);
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : data; // items 키가 없을 수도 있음

        const mapped: Post[] = items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "활동",
          title: p.title || "제목 없음",
          author_name: p.author?.name || "알 수 없음",
          createAt: p.createdAt || "-",
          content: p.content || "",
          image: p.imageUrl || "",
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

  // 한국어: 새 글 반영
  // English: Add newly created post from location.state
  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section>
      <PostTable
        posts={posts}                 // 게시글 목록
        currentPage={currentPage}     // 현재 페이지
        setCurrentPage={setCurrentPage} // 페이지 변경 함수
        postsPerPage={5}              // 페이지당 글 개수
        basePath="/activities"        // 상세보기, 글쓰기 경로
        title="Team Build"            // 게시판 제목
        showWriteButton={true}        // 작성 버튼 표시 여부
      />
      <Outlet />
    </section>
  );
}
