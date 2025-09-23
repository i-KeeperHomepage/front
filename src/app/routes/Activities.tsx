import { useEffect, useState } from "react";
import styles from "./Activities.module.css";
import { Link } from "react-router-dom";
import { demoPosts, Post } from "./demoPosts";
import PostTable from "@/components/postable/PostTable"; 
export default function Activities() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // ✅ 지금은 데모 데이터 사용
    setPosts(demoPosts);
    setLoading(false);

    // ✅ 나중에 백엔드 연결시 주석 해제
    /*
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:4000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
    */
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className={`site-container ${styles.activities}`}>

      {/* ✅ PostTable 사용 */}
      <PostTable
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={5}
        basePath="/activities"
        title="Team Buliding"
      />
    </section>
  );
}
