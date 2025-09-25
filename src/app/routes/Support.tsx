import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import { Outlet } from "react-router-dom";

export default function Support() {
  const [posts, setPosts] = useState<DemoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    // 지금은 데모 데이터 사용
    setPosts(demoPosts);
    setLoading(false);

    // 나중에 백엔드 연결시 주석 해제
    /*
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:4000/api/support");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("1대1 Inquiry 게시판 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
    */
  }, []);

  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
    }
  }, [location.state]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section>
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/support"
        title="Inquiry"
        showWriteButton={true}
      />
      <Outlet />
    </section>
  );
}
