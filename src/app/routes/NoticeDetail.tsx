// ==============================
// 공지 상세 페이지 (NoticeDetail.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 공지 게시판의 상세 페이지를 보여줍니다.
// URL 파라미터(:id)를 사용하여 해당 게시글을 찾아서 PostDetail 컴포넌트에 전달합니다.
// 현재는 demoPosts에서 데이터를 조회하지만, 추후에는 백엔드 API 연동이 필요합니다.
//
// 주요 기능:
// 1. useParams 훅을 사용해 URL에서 게시글 id 가져오기
// 2. demoPosts 배열에서 id가 일치하는 게시글 검색
// 3. 게시글이 존재하지 않으면 "게시글을 찾을 수 없습니다." 메시지 출력
// 4. 게시글이 존재하면 PostDetail 컴포넌트를 통해 내용 표시
//
// English Explanation:
// This component represents the Notice board detail page.
// It retrieves the post ID from the URL parameter (:id) and finds the corresponding post.
// Currently, it fetches data from demoPosts, but later it should be connected to a backend API.
//
// Key Features:
// 1. Get post id from URL using useParams
// 2. Find matching post in demoPosts array
// 3. If no post found, display "Post not found"
// 4. If post exists, render it via PostDetail component

import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function NoticeDetail() {
  // 한국어: URL 파라미터에서 id 가져오기
  // English: Get "id" from URL params
  const { id } = useParams<{ id: string }>();

  // 한국어: demoPosts에서 해당 id와 일치하는 게시글 찾기
  // English: Find post in demoPosts that matches id
  const post = demoPosts.find((p) => p.id === Number(id));

  // 한국어: 게시글이 없으면 메시지 표시
  // English: If no post found, show message
  if (!post) return <p>게시글을 찾을 수 없습니다. / Post not found</p>;

  // 한국어: 게시글이 있으면 PostDetail 컴포넌트 렌더링
  // English: If post exists, render PostDetail component
  return (
    <PostDetail post={post} />
  );
}
