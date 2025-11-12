// ==============================
// Support.tsx (1대1 문의 게시판 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 1대1 문의(Inquiry) 게시판 화면입니다.
// 주요 기능:
// 1. 게시글(Post) 목록 불러오기 (백엔드 API 연동)
// 2. 페이지네이션 (currentPage 상태로 관리)
// 3. 새로운 글 작성 시 location.state를 통해 목록에 반영
//
// English Explanation:
// This component is the 1:1 Inquiry board page.

import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import PostTable, { type PostRow } from "@/components/postable/PostTable";
import Loading from "@/components/common/Loading";

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image?: string;
}

const PAGE_LIMIT = 5;

export default function Support() {
  // 목록 원본 상태
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        // categoryId 기반 요청 (API 가이드 기준)
        const res = await fetch(
          `/api/posts?categoryId=6&page=${currentPage}&limit=${PAGE_LIMIT}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("서버 응답 실패");

        const data = await res.json();
        const items = data.posts || [];

        const mapped: Post[] = items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "문의",
          title: p.title ?? "제목 없음",
          author: p.author?.name || "알 수 없음",
          createdAt: new Date(p.createdAt).toLocaleDateString("ko-KR"),
          content: p.content ?? "",
          image: p.files?.[0]?.url || "",
        }));

        setPosts(mapped);

        // pagination.totalPages 사용
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err: any) {
        console.error("1대1 Inquiry 게시판 불러오기 실패:", err);
        setError(err.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  // 새 글 추가 반영
  useEffect(() => {
    const state: any = location.state;
    if (state?.newPost) {
      const np = state.newPost as Partial<Post>;
      const normalized: Post = {
        id: np.id as number,
        category: np.category ?? "문의",
        title: np.title ?? "제목 없음",
        author: np.author ?? "알 수 없음",
        createdAt: np.createdAt ?? "",
        content: np.content ?? "",
        image: np.image,
      };
      setPosts((prev) => [normalized, ...prev]);
    }
  }, [location.state]);

  // 글로벌 로딩 UI 사용
  if (loading) return <Loading />;

  // PostTable에 넘길 때만 PostRow로 표준화
  const rows: PostRow[] = posts.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author,
    createdAt: p.createdAt,
    content: p.content,
    image: p.image,
  }));

  return (
    <section>
      <PostTable
        posts={rows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        basePath="/support"
        title="Support"
        showWriteButton={true}
        error={error}
      />
      <Outlet />
    </section>
  );
}
