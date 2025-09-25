import { useEffect, useState } from "react";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import PostTable from "@/components/postable/PostTable"; 
import { Outlet } from "react-router-dom";

export default function Activities() {
  const [posts, setPosts] = useState<DemoPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 지금은 데모 데이터 사용
    setPosts(demoPosts);
    setLoading(false);

    // 나중에 백엔드 연결시 주석 해제
    /*
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts?category=activities&page=" + currentPage);
        const data = await res.json();

        // 백엔드 → 프론트 매핑
        const mapped: Post[] = data.items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "활동",
          title: p.title,
          author: p.author?.name || "알 수 없음",
          createdAt: p.createdAt,
          content: p.content,
          image: p.imageUrl,
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
    */
  }, [currentPage]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section>
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/notice"
        title="Notice"
        showWriteButton = {false}
      />
      <Outlet/>
    </section>
  );
}
