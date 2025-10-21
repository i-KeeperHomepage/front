// ==============================
// ReferenceDetail.tsx
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 Reference(자료실) 페이지에서 개별 게시글 상세 내용을 보여줍니다.
// useParams 훅을 사용하여 URL에서 글 ID를 가져온 뒤, 해당 ID로 백엔드 API(`/api/posts/:id`)를 호출하여 데이터를 불러옵니다.
// 불러온 데이터는 PostDetail 컴포넌트에 전달되어 상세 화면으로 렌더링됩니다.
//
// 주요 기능:
// - useParams로 글 ID 추출
// - 백엔드 API(`/api/posts/:id`)를 통해 게시글 데이터 요청
// - 로딩 및 에러 상태 처리
// - 게시글이 없을 경우 안내 문구 출력
//
// English Explanation:
// This component displays the detail of an individual Reference post.
// It uses the useParams hook to extract the post ID from the URL and fetches
// the post data from the backend API (`/api/posts/:id`).
// The result is rendered via the PostDetail component.

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

export default function ReferenceDetail() {
  // 한국어: URL에서 게시글 ID 가져오기
  // English: Get post ID from the URL
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // 한국어: 백엔드에서 게시글 상세 데이터 불러오기
    // English: Fetch post data from backend API
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("서버 응답 실패");

        const data = await res.json();

        // 한국어: 백엔드 데이터를 프론트 구조에 맞게 매핑
        // English: Map backend data to frontend format
        const mapped: Post = {
          id: data.id,
          category: data.category?.name || "자료실",
          title: data.title || "제목 없음",
          author_name: data.author?.name || "알 수 없음",
          createAt: new Date(data.createdAt).toLocaleDateString("ko-KR"),
          content: data.content || "",
          image: data.files?.[0]?.url || "",
        };

        setPost(mapped);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // 상태별 출력 처리
  if (loading) return <Loading/>;
  if (error) return <p>{error}</p>;
  if (!post) return <Loading message="게시글을 찾을 수 없습니다."/>;

  // 한국어: PostDetail 컴포넌트로 게시글 렌더링
  // English: Render the post with PostDetail component
  return <PostDetail/>;
}
