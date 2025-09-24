import { Link } from "react-router-dom";
import styles from "./PostTable.module.css"; // 테이블 스타일 공통 사용
import type { DemoPost } from "../../app/routes/demoPosts";

interface PostTableProps {
  posts: DemoPost[];                    // 게시글 배열
  currentPage: number;              // 현재 페이지 번호
  setCurrentPage: (page: number) => void; // 페이지 변경 함수
  postsPerPage?: number;            // 한 페이지당 게시글 수 (기본값 5)
  basePath?: string;                // 상세 페이지 이동 기본 경로 (예: "/activities")
  title?: string; 
}

export default function PostTable({
  posts,
  currentPage,
  setCurrentPage,
  postsPerPage = 5,
  basePath = "/activities",
  title= "게시판",
}: PostTableProps) {
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className={styles.wrapper}>
      {/* ✅ 제목 */}
      <h2 className={styles.title}>{title}</h2>

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

      {/* ✅ 페이지네이션 */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          «
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
          »
        </button>
      </div>
    </div>
  );
}
