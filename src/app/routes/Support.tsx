import { useState, useEffect } from "react";
import PostTable from "@/components/postable/PostTable";
import { demoPosts, Post } from "./demoPosts";
import styles from "./Support.module.css";

export default function Support() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // ✅ 지금은 데모 데이터 사용
    setPosts(demoPosts);
    setLoading(false);

    // ✅ 나중에 백엔드 연결시 주석 해제
    /*
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:4000/api/support");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("1대1 문의 게시판 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
    */
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className="site-container">
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/support"
        title="1:1 문의"
      />
    </section>
  );
}
