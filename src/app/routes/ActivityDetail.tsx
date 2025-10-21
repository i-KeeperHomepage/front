// ==============================
// 활동 상세 페이지 (ActivityDetail.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 활동 게시판에서 특정 게시글을 클릭했을 때,
// 해당 게시글의 상세 내용을 보여줍니다.
// 주요 기능:
// 1. URL 파라미터(id)를 이용하여 특정 게시글 식별
// 2. 나중에 백엔드 API(`/api/posts/:id`)와 연결 가능하도록 코드 준비
// 3. PostDetail 컴포넌트를 사용하여 게시글 상세 내용 렌더링
//
// English Explanation:
// This component displays the details of a specific activity post
// when a user clicks on it in the activities board.
// Main features:
// 1. Uses URL parameter (id) to identify the selected post
// 2. Prepared for backend API connection (`/api/posts/:id`)
// 3. Uses the PostDetail component to render post details

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "@/components/postDetail/PostDetail";
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

export default function ActivityDetail() {
  // 한국어: URL 경로에서 게시글 id 추출
  // English: Extract post id from URL path
  const { id } = useParams<{ id: string }>();

  // 한국어: 현재 게시글 상태 관리
  // English: Manage the state of the current post
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 한국어: 백엔드에서 게시글 상세정보 불러오기
    // English: Fetch post details from backend
    async function fetchPost() {
      try {
        // ✅ API_GUIDE 기준: GET /api/posts/{postId}
        const res = await fetch(`/api/posts/${id}`, { credentials: "include" });
        if (!res.ok) {
          throw new Error("서버 응답 실패");
        }

        const data = await res.json();

        // 한국어: 백엔드 데이터 → 프론트용 형식으로 매핑
        // English: Map backend data to frontend format
        const mappedPost: Post = {
          id: data.id,
          category: data.category?.name || "활동",
          title: data.title || "제목 없음",
          author_name: data.author?.name || "알 수 없음",
          createAt: data.createdAt || "-",
          content: data.content || "",
          image: data.files?.[0]?.url || "",
        };

        setPost(mappedPost);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // 한국어: 게시글을 찾을 수 없을 경우 메시지 출력
  // English: Show message if no post is found
  if (loading) return <Loading />;
  if (!post) return <Loading message="게시글을 찾을 수 없습니다." />;

  // 한국어: PostDetail 컴포넌트를 이용해 상세내용 표시
  // English: Render post details using PostDetail component
  return <PostDetail />;
}
