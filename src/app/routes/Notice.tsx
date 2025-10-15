// ==============================
// 공지 페이지 (Notice.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 공지 게시판 페이지입니다.
// 게시글 목록을 표시하며, 임원진(officer) 권한을 가진 사용자만 글쓰기 버튼을 볼 수 있습니다.
// 현재는 demoPosts를 사용하고 있으며, 추후 백엔드 API와 연동하여 실제 데이터를 불러옵니다.
//
// 주요 기능:
// 1. 게시글 목록 출력 (PostTable 컴포넌트 사용)
// 2. 페이지네이션 상태 관리 (currentPage)
// 3. location.state를 통해 새 게시글이 추가되면 목록 갱신
// 4. role === "officer"인 경우에만 글쓰기 버튼 노출
// 5. 백엔드 연동 시 fetch("/api/posts") 부분을 주석 해제하여 사용
//
// English Explanation:
// This component represents the Notice board page.
// It displays a list of posts, and only users with officer role can see the "write" button.
// Currently, demoPosts are used as mock data, but later this will be replaced with backend API calls.
//
// Key Features:
// 1. Display post list (using PostTable component)
// 2. Manage pagination state (currentPage)
// 3. Update list when a new post is passed via location.state
// 4. Show write button only if role === "officer"
// 5. For backend integration, uncomment fetch("/api/posts") logic

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

export default function Notice() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  // 한국어: 로그인한 사용자의 role 확인 (localStorage에서 가져옴)
  // English: Get logged-in user role from localStorage
  const role = localStorage.getItem("role");

  // 한국어: 백엔드에서 게시글 목록 불러오기
  // English: Fetch posts from backend API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts?category=notice&page=${currentPage}`);
        if (!res.ok) throw new Error("게시글 요청 실패");

        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : data;

        const mapped: Post[] = items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "공지",
          title: p.title || "제목 없음",
          author_name: p.author?.name || "알 수 없음",
          createAt: p.createdAt || "-",
          content: p.content || "",
          image: p.imageUrl || "",
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("게시글 불러오기 실패 / Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  // 한국어: location.state에 newPost가 있으면 목록에 추가
  // English: If location.state.newPost exists, prepend it to the list
  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중... / Loading...</p>;

  return (
    <section>
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/notice"
        title="Notice"
        // 한국어: officer 권한일 때만 글쓰기 버튼 노출
        // English: Only show write button for officer role
        showWriteButton={role === "officer"}
      />
      <Outlet />
    </section>
  );
}
