// ==============================
// 공지 상세 페이지 (NoticeDetail.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 공지 게시판의 상세 페이지를 보여줍니다.
// URL 파라미터(:id)를 사용하여 해당 게시글을 가져와 PostDetail 컴포넌트에 전달합니다.
// 현재는 demoPosts가 아닌, 실제 백엔드 API(`/api/posts/:id`)와 연동됩니다.
//
// 주요 기능:
// 1. useParams 훅으로 URL에서 게시글 id 가져오기
// 2. 백엔드 API(`/api/posts/:id`)를 통해 게시글 데이터 요청
// 3. 로딩 중 표시 및 에러 처리
// 4. 게시글 데이터를 PostDetail 컴포넌트로 전달
//
// English Explanation:
// This component represents the Notice board detail page.
// It fetches the post ID from the URL parameter (:id) and retrieves the post
// via the backend API (`/api/posts/:id`).
// Displays loading/error states and renders the post via PostDetail.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "@/components/postDetail/PostDetail";

interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  image?: string;
}

export default function NoticeDetail() {
  // 한국어: URL 파라미터에서 id 가져오기
  // English: Get "id" from URL params
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // 한국어: 백엔드에서 게시글 상세 정보 불러오기
    // English: Fetch post detail from backend
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("서버 응답 실패");

        const data = await res.json();

        // 한국어: 백엔드 데이터를 프론트 형식으로 매핑
        // English: Map backend data to frontend structure
        const mappedPost: Post = {
          id: data.id,
          category: data.category?.name || "공지",
          title: data.title || "제목 없음",
          author_name: data.author?.name || "알 수 없음",
          createAt: data.createdAt || "-",
          content: data.content || "",
          image: data.imageUrl || "",
        };

        setPost(mappedPost);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // ==========================
  // 상태별 렌더링
  // ==========================
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  // 한국어: 게시글이 있으면 PostDetail 렌더링
  // English: Render PostDetail when post exists
  return <PostDetail post={post} />;
}
