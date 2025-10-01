// ==============================
// ReferenceDetail.tsx
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 Reference(자료실) 페이지에서 개별 게시글 상세 내용을 보여줍니다.
// useParams 훅을 사용하여 URL에서 글 ID를 가져온 뒤, 해당 ID로 demoPosts 배열에서 게시글을 찾습니다.
// 찾은 게시글은 PostDetail 컴포넌트에 전달하여 상세 화면을 렌더링합니다.
// 현재는 demoPosts(프론트엔드 임시 데이터)를 사용하지만, 나중에 백엔드 API와 연결할 수 있도록 주석 코드를 추가해 두었습니다.
//
// 주요 기능:
// - useParams로 글 ID 추출
// - demoPosts 배열에서 해당 ID에 맞는 게시글 검색
// - PostDetail 컴포넌트를 통해 상세 정보 출력
// - 게시글이 없으면 안내 문구 출력
//
// English Explanation:
// This component displays the details of an individual post within the Reference page.
// It uses the useParams hook to get the post ID from the URL, then finds the matching post from demoPosts.
// The found post is passed to the PostDetail component for rendering.
// Currently, demoPosts (frontend demo data) is used, but commented code is included for future backend integration.
//
// Key Features:
// - Extract post ID from URL using useParams
// - Find the corresponding post in demoPosts by ID
// - Render the post details via PostDetail component
// - Show a message if the post is not found

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function ReferenceDetail() {
  // 한국어: URL에서 게시글 ID 가져오기
  // English: Get post ID from the URL
  const { id } = useParams<{ id: string }>();

  // 한국어: 현재 선택된 게시글 상태
  // English: State for the selected post
  const [post, setPost] = useState<DemoPost | null>(null);
  
  useEffect(() => {
    // 한국어: 현재는 demoPosts에서 게시글 찾기
    // English: For now, find the post from demoPosts
    const found = demoPosts.find((p) => p.id === Number(id));
    if (found) setPost(found);

    // 한국어: 나중에 백엔드 API 연결 시 아래 주석 해제
    // English: Uncomment below when backend API is available
    /*
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err); // "Failed to fetch post"
      }
    }
    fetchPost();
    */
  }, [id]);

  // 한국어: 게시글이 없는 경우 안내 문구 출력
  // English: Show a message if the post is not found
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  // 한국어: PostDetail 컴포넌트에 post 전달하여 렌더링
  // English: Render PostDetail with the selected post
  return (
    <PostDetail post={post} />
  );
}
