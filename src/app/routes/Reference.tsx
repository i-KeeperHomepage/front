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
// - 백엔드 API(`/api/posts?category=카테고리명&page=n&limit=5`)에서 데이터 로딩
// - 카테고리별 별도 페이지네이션 상태 관리
// - 새 글 작성 시 location.state.newPost를 통해 해당 카테고리에만 추가
// - 최신 글이 위로 오도록 날짜 기준 정렬

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const sortByDate = (a: Post, b: Post) =>
  new Date(b.createAt).getTime() - new Date(a.createAt).getTime();

type FetchResult = { posts: Post[]; totalPages: number };

// 특정 카테고리의 게시글을 불러오는 공통 함수
async function fetchCategoryPosts(category: string, page: number): Promise<FetchResult> {
  try {
    const qs = new URLSearchParams({
      category,
      page: String(page),
      limit: String(PAGE_LIMIT),
    });

    const res = await fetch(`/api/posts?${qs.toString()}`);
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
    })).sort(sortByDate);

    // totalPages 계산: 헤더 X-Total-Count 우선, 바디 totalCount 보조, 둘 다 없으면 안전망
    const headerCount = res.headers.get("X-Total-Count");
    const totalCount = headerCount
      ? Number(headerCount)
      : Number(data.totalCount ?? 0);

    const totalPages =
      totalCount > 0
        ? Math.max(1, Math.ceil(totalCount / PAGE_LIMIT))
        : Math.max(1, Math.ceil(items.length / PAGE_LIMIT)); // 안전망

    return { posts: mapped, totalPages };
  } catch (err) {
    console.error(`${category} 불러오기 실패:`, err);
    return { posts: [], totalPages: 1 };
  }
}

export default function Reference() {
  const [keeperSeminarPosts, setKeeperSeminarPosts] = useState<Post[]>([]);
  const [seminarPosts, setSeminarPosts] = useState<Post[]>([]);
  const [specialPosts, setSpecialPosts] = useState<Post[]>([]);

  const [keeperSeminarPage, setKeeperSeminarPage] = useState(1);
  const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);

  const [keeperTotalPages, setKeeperTotalPages] = useState(1);
  const [seminarTotalPages, setSeminarTotalPages] = useState(1);
  const [specialTotalPages, setSpecialTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 각 카테고리별 게시글 불러오기
  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [keeper, seminar, special] = await Promise.all([
        fetchCategoryPosts("Keeper 세미나", keeperSeminarPage),
        fetchCategoryPosts("정보공유세미나", seminarPage),
        fetchCategoryPosts("특강", specialPage),
      ]);

      setKeeperSeminarPosts(keeper.posts);
      setSeminarPosts(seminar.posts);
      setSpecialPosts(special.posts);

      setKeeperTotalPages(keeper.totalPages);
      setSeminarTotalPages(seminar.totalPages);
      setSpecialTotalPages(special.totalPages);

      setLoading(false);
    }

    loadAll();
  }, [keeperSeminarPage, seminarPage, specialPage]);

  // 새 글 작성 시 해당 카테고리에만 추가
  useEffect(() => {
    const state: any = location.state;
    if (state?.newPost) {
      const newPost: Post = { ...state.newPost };
      if (newPost.category === "Keeper 세미나") {
        setKeeperSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "정보공유세미나") {
        setSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "특강") {
        setSpecialPosts((prev) => [newPost, ...prev].sort(sortByDate));
      }
    }
  }, [location.state]);

  if (loading) return <Loading/>;

  // PostTable에 넘길 때만 PostRow로 표준화
  const keeperRows: PostRow[] = keeperSeminarPosts.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author_name,
    createdAt: p.createAt,
    content: p.content,
    image: p.image,
  }));

  const seminarRows: PostRow[] = seminarPosts.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author_name,
    createdAt: p.createAt,
    content: p.content,
    image: p.image,
  }));

  const specialRows: PostRow[] = specialPosts.map((p) => ({
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
      {/* Keeper Seminar 게시판 */}
      <PostTable
        posts={keeperRows}
        currentPage={keeperSeminarPage}
        setCurrentPage={setKeeperSeminarPage}
        totalPages={keeperTotalPages}
        basePath="/seminar/KeeperSeminar"
        title="Keeper Seminar"
        showWriteButton={true}
      />

      {/* Info Sharing Seminar 게시판 */}
      <PostTable
        posts={seminarRows}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        totalPages={seminarTotalPages}
        basePath="/seminar/seminar"
        title="Info Sharing Seminar"
        showWriteButton={true}
      />

      {/* Special Lecture 게시판 */}
      <PostTable
        posts={specialRows}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        totalPages={specialTotalPages}
        basePath="/seminar/special"
        title="Special Lecture"
        showWriteButton={true}
      />
    </section>
  );
}
