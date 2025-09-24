import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<DemoPost | null>(null);

  useEffect(() => {
    // ✅ 지금은 데모 데이터에서 조회
    const found = demoPosts.find((p) => p.id === Number(id));
    if (found) setPost(found);

    // ✅ 나중에 백엔드 연결시 주석 해제
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

  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <PostDetail post={post} />
  );
}
