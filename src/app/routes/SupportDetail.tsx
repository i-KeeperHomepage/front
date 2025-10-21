// ==============================
// SupportDetail.tsx (문의 게시글 상세 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 문의(Inquiry) 게시판의 상세보기 페이지입니다.
// 주요 기능:
// 1. useParams 훅으로 URL에서 게시글 ID를 가져옴
// 2. 백엔드 API(`/api/posts/:id`)에서 해당 게시글을 가져와 렌더링
// 3. 해당 게시글이 없으면 "게시글을 찾을 수 없습니다." 메시지를 출력
// 4. PostDetail 컴포넌트를 재사용하여 UI 일관성 유지
//
// English Explanation:
// This component is the detail page for the 1:1 Inquiry board.
// Main features:
// 1. Uses useParams hook to get the post ID from the URL
// 2. Fetches the matching post from backend API (`/api/posts/:id`)
// 3. If no post is found, shows "Post not found" message
// 4. Reuses the PostDetail component to maintain consistent UI

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "@/components/postDetail/PostDetail";
import Loading from "@/components/common/Loading";

// 게시글 타입 정의 / Define post type
interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image?: string;
}

export default function SupportDetail() {
  // 한국어: URL에서 게시글 ID 가져오기 / English: Get post ID from URL
  const { id } = useParams<{ id: string }>();

  // 한국어: 게시글 상태 및 로딩 상태 / English: Post state and loading flag
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 한국어: 백엔드에서 게시글 가져오기 / English: Fetch post from backend
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("게시글 불러오기 실패");

        const data = await res.json();

        // 한국어: 백엔드 데이터를 프론트 구조로 매핑 / English: Map backend data
        const mappedPost: Post = {
          id: data.id,
          category: data.category?.name || "문의",
          title: data.title,
          author: data.author?.name || "알 수 없음",
          createdAt: data.createdAt,
          content: data.content,
          image: data.imageUrl,
        };

        setPost(mappedPost);
      } catch (err) {
        console.error("문의 상세 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // 한국어: 로딩 상태 처리 / English: Handle loading state
  if (loading) return <Loading/>;

  // 한국어: 게시글이 없을 경우 메시지 출력 / English: Show message if no post found
  if (!post) return <Loading message="게시글을 찾을 수 없습니다."/>;

  // 한국어: 게시글이 있으면 PostDetail로 렌더링 / English: Render with PostDetail if found
  return <PostDetail/>;
}
