// ==============================
// SupportDetail.tsx (문의 게시글 상세 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 문의(Inquiry) 게시판의 상세보기 페이지입니다.
// 주요 기능:
// 1. useParams 훅으로 URL에서 게시글 ID를 가져옴
// 2. demoPosts에서 해당 ID에 맞는 게시글을 찾아 렌더링 (임시 데이터)
// 3. 해당 게시글이 없으면 "게시글을 찾을 수 없습니다." 메시지를 출력
// 4. PostDetail 컴포넌트를 재사용하여 UI 일관성 유지
//
// English Explanation:
// This component is the detail page for the 1:1 Inquiry board.
// Main features:
// 1. Uses useParams hook to get the post ID from the URL
// 2. Finds the matching post in demoPosts (temporary data)
// 3. If no post is found, shows "Post not found" message
// 4. Reuses the PostDetail component to maintain consistent UI

import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function SupportDetail() {
  // 한국어: URL에서 게시글 ID 가져오기 / English: Get post ID from URL
  const { id } = useParams<{ id: string }>();

  // 한국어: demoPosts 배열에서 해당 ID의 게시글 찾기 / English: Find post by ID in demoPosts
  const post = demoPosts.find((p) => p.id === Number(id));

  // 한국어: 게시글이 없으면 안내 메시지 출력 / English: Show message if post not found
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  // 한국어: 게시글이 있으면 PostDetail 컴포넌트로 렌더링 / English: Render with PostDetail component if found
  return (
    <PostDetail post={post} />
  );
}
