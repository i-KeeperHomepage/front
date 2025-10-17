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

import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import type { PostRow } from "@/components/postable/PostTable";
import Loading from "@/components/common/Loading";

interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  image?: string;
}

const PAGE_LIMIT = 5;

export default function Activities() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();

  // 백엔드 데이터 불러오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/posts?category=activities&page=${currentPage}&limit=${PAGE_LIMIT}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : data;

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

        // totalPages 계산: 헤더 X-Total-Count 우선, 없으면 바디 totalCount 사용, 둘 다 없으면 안전망
        const headerCount = res.headers.get("X-Total-Count");
        const totalCount = headerCount
          ? Number(headerCount)
          : Number(data.totalCount ?? 0);

        const pages =
          totalCount > 0
            ? Math.max(1, Math.ceil(totalCount / PAGE_LIMIT))
            : Math.max(1, Math.ceil(items.length / PAGE_LIMIT));
        setTotalPages(pages);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  // 새 글 반영
  useEffect(() => {
    const state: any = location.state;
    if (state?.newPost) {
      const np = state.newPost as Post;
      setPosts((prev) => [np, ...prev]);
    }
  }, [location.state]);

  if (loading) return <Loading/>;

  // PostTable에 넘길 때만 필드명 표준화
  const normalizedPosts: PostRow[] = posts.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author_name,
    createdAt: p.createAt,
    content: p.content,
    image: p.image,
  }));

  return (
    <section>
      <PostTable
        posts={normalizedPosts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        basePath="/activities"
        title="Team Build"
        showWriteButton={true}
      />
      <Outlet />
    </section>
  );
}
