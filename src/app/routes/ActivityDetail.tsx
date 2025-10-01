// ==============================
// 활동 상세 페이지 (ActivityDetail.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 활동 게시판에서 특정 게시글을 클릭했을 때,
// 해당 게시글의 상세 내용을 보여줍니다.
// 주요 기능:
// 1. URL 파라미터(id)를 이용하여 특정 게시글 식별
// 2. 현재는 demoPosts 배열에서 게시글을 찾음 (백엔드 연결 전 상태)
// 3. 나중에 백엔드 API(`/api/posts/:id`)와 연결 가능하도록 코드 준비
// 4. PostDetail 컴포넌트를 사용하여 게시글 상세 내용 렌더링
//
// English Explanation:
// This component displays the details of a specific activity post
// when a user clicks on it in the activities board.
// Main features:
// 1. Uses URL parameter (id) to identify the selected post
// 2. Currently searches from the demoPosts array (before backend integration)
// 3. Prepared for future backend API connection (`/api/posts/:id`)
// 4. Uses the PostDetail component to render post details

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function ActivityDetail() {
  // 한국어: URL 경로에서 게시글 id 추출
  // English: Extract post id from URL path
  const { id } = useParams<{ id: string }>();

  // 한국어: 현재 게시글 상태 관리
  // English: Manage the state of the current post
  const [post, setPost] = useState<DemoPost | null>(null);

  useEffect(() => {
    // 한국어: 현재는 demoPosts 배열에서 id가 일치하는 게시글 찾기
    // English: For now, find the post with matching id from demoPosts
    const found = demoPosts.find((p) => p.id === Number(id));
    if (found) setPost(found);

    // 한국어: 나중에 백엔드 연결 시 아래 fetch 코드 사용
    // English: Later, use the fetch code below when backend is connected
    /*
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:4000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    }
    fetchPost();
    */
  }, [id]);

  // 한국어: 게시글을 찾을 수 없을 경우 메시지 출력
  // English: Show message if no post is found
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  // 한국어: PostDetail 컴포넌트를 이용해 상세내용 표시
  // English: Render post details using PostDetail component
  return (
    <PostDetail post={post} />
  );
}
