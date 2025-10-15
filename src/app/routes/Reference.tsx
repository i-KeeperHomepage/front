// ==============================
// Reference.tsx
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 "Reference(자료실)" 페이지를 담당합니다.
// Reference 페이지는 세 개의 하위 카테고리 게시판으로 구성됩니다:
// 1) Keeper 세미나
// 2) 정보공유세미나
// 3) 특강
//
// 각 카테고리별로 PostTable 컴포넌트를 재사용하여 백엔드에서 데이터를 가져옵니다.
//
// 주요 기능:
// - 백엔드 API(`/api/posts?category=카테고리명&page=n`)에서 데이터 로딩
// - 카테고리별 별도 페이지네이션 상태 관리
// - 새 글 작성 시 location.state.newPost를 통해 해당 카테고리에만 추가
// - 최신 글이 위로 오도록 날짜 기준 정렬
//
// English Explanation:
// This component handles the "Reference" page.
// It has three category boards: Keeper Seminar, Info Sharing Seminar, and Special Lecture.
// Each board fetches its posts from backend API and displays via PostTable component.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";

interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  image?: string;
}

const sortByDate = (a: Post, b: Post) =>
  new Date(b.createAt).getTime() - new Date(a.createAt).getTime();

export default function Reference() {
  const [keeperSeminarPosts, setKeeperSeminarPosts] = useState<Post[]>([]);
  const [seminarPosts, setSeminarPosts] = useState<Post[]>([]);
  const [specialPosts, setSpecialPosts] = useState<Post[]>([]);

  const [keeperSeminarPage, setKeeperSeminarPage] = useState(1);
  const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 한국어: 특정 카테고리의 게시글을 불러오는 공통 함수
  // English: Common function to fetch posts by category
  const fetchCategoryPosts = async (category: string, page: number) => {
    try {
      const res = await fetch(`/api/posts?category=${encodeURIComponent(category)}&page=${page}`);
      if (!res.ok) throw new Error(`Failed to fetch ${category}`);
      const data = await res.json();

      const items = Array.isArray(data.items) ? data.items : data;
      const mapped: Post[] = items.map((p: any) => ({
        id: p.id,
        category: p.category?.name || category,
        title: p.title || "제목 없음",
        author_name: p.author?.name || "알 수 없음",
        createAt: p.createdAt || "-",
        content: p.content || "",
        image: p.imageUrl || "",
      }));
      return mapped.sort(sortByDate);
    } catch (err) {
      console.error(`${category} 불러오기 실패:`, err);
      return [];
    }
  };

  // 한국어: 각 카테고리별 게시글 불러오기
  // English: Fetch posts for each category
  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [keeper, seminar, special] = await Promise.all([
        fetchCategoryPosts("Keeper 세미나", keeperSeminarPage),
        fetchCategoryPosts("정보공유세미나", seminarPage),
        fetchCategoryPosts("특강", specialPage),
      ]);

      setKeeperSeminarPosts(keeper);
      setSeminarPosts(seminar);
      setSpecialPosts(special);
      setLoading(false);
    }

    loadAll();
  }, [keeperSeminarPage, seminarPage, specialPage]);

  // 한국어: 새 글 작성 시 해당 카테고리에만 추가
  // English: Add new post to its respective category when created
  useEffect(() => {
    if (location.state?.newPost) {
      const newPost: Post = { ...location.state.newPost };
      if (newPost.category === "Keeper 세미나") {
        setKeeperSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "정보공유세미나") {
        setSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "특강") {
        setSpecialPosts((prev) => [newPost, ...prev].sort(sortByDate));
      }
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section>
      {/* Keeper Seminar 게시판 */}
      <PostTable
        posts={keeperSeminarPosts}
        currentPage={keeperSeminarPage}
        setCurrentPage={setKeeperSeminarPage}
        postsPerPage={5}
        basePath="/reference/KeeperSeminar"
        title="Keeper Seminar"
        showWriteButton={true}
      />

      {/* Info Sharing Seminar 게시판 */}
      <PostTable
        posts={seminarPosts}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        postsPerPage={5}
        basePath="/reference/seminar"
        title="Info Sharing Seminar"
        showWriteButton={true}
      />

      {/* Special Lecture 게시판 */}
      <PostTable
        posts={specialPosts}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        postsPerPage={5}
        basePath="/reference/special"
        title="Special Lecture"
        showWriteButton={true}
      />
    </section>
  );
}
