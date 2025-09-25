import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostTable.module.css"; 
import type { DemoPost } from "../../app/routes/demoPosts";
import { FaPen } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  content: string;
  createAt: string;
}

interface PostTableProps {
  posts: DemoPost[];                    // 게시글 배열
  currentPage: number;              // 현재 페이지 번호
  setCurrentPage: (page: number) => void; // 페이지 변경 함수
  postsPerPage?: number;            // 한 페이지당 게시글 수 (기본값 5)
  basePath: string;                // 상세 페이지 이동 기본 경로 
  title?: string;
  showWriteButton?: boolean;
}

export default function PostTable({
  posts =[],
  currentPage,
  setCurrentPage,
  postsPerPage = 5,
  basePath,
  title = "게시판",
  showWriteButton = true,
}: PostTableProps) {
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem(basePath) || "[]");
    setLocalPosts(savedPosts);
  }, [basePath]);

  // localStorage + props(posts) 합치기
  const allPosts = [...localPosts, ...posts];

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        {/* 제목 & 작성 버튼 */}
        <h2 className={styles.title}>{title}</h2>
        {showWriteButton && (
          <Link to={`${basePath}/write`} className={styles.writeBtn}>
            <FaPen />
          </Link>
        )}
      </div>

      {/* 게시글 */}
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: "12%" }} />
          <col style={{ width: "58%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>

        <thead>
          <tr>
            <th>CATEGORY</th>
            <th>TITLE</th>
            <th>NAME</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.category}</td>
              <td className={styles.subject}>
                <Link to={`${basePath}/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.author_name}</td>
              <td>{post.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaAnglesLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? styles.active : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
}
