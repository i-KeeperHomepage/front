import { useParams } from "react-router-dom";
import { demoPosts } from "./demoPosts";
import PostDetail from "@/components/postDetail/PostDetail";

export default function SupportDetail() {
  const { id } = useParams<{ id: string }>();
  const post = demoPosts.find((p) => p.id === Number(id));

  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <PostDetail post={post} />
  );
}
