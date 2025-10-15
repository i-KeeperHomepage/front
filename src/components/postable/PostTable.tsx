// ==============================
// PostTable.tsx (게시판 테이블 컴포넌트 - 백엔드 연동 버전)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 게시판 형태로 백엔드에서 불러온 게시글을 보여줍니다.
// 로컬 스토리지는 더 이상 사용하지 않으며, props의 basePath에 따라 백엔드 요청 경로를 동적으로 지정합니다.
//
// 주요 기능:
// 1. 백엔드에서 게시글 데이터 불러오기 (GET /api/posts)
// 2. 페이지네이션 적용 (page, limit 파라미터 기반)
// 3. 글쓰기 버튼 표시 여부 제어 (officer 권한 확인 가능)
// 4. 로딩 및 에러 상태 표시
//
// English Explanation:
// This component renders a paginated post list fetched from the backend.
// It no longer uses localStorage and instead requests data from `/api/posts`.
// Pagination and write button visibility are included.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostTable.module.css";
import { FaPen } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// ==============================
// Post 타입 정의
// ==============================
interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  content: string;
  createAt: string;
}

// ==============================
// Props 정의
// ==============================
interface PostTableProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage?: number;
  basePath: string;
  title?: string;
  showWriteButton?: boolean;
  category?: string; // 선택적으로 카테고리 지정 가능
}

// ==============================
// PostTable 컴포넌트
// ==============================
export default function PostTable({
  currentPage,
  setCurrentPage,
  postsPerPage = 5,
  basePath,
  title = "게시판",
  showWriteButton = true,
  category,
}: PostTableProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // ==============================
  // 백엔드 게시글 불러오기
  // ==============================
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          page: String(currentPage),
          limit: String(postsPerPage),
          ...(category ? { category } : {}),
        });

        const res = await fetch(`/api/posts?${queryParams.toString()}`);
        if (!res.ok) throw new Error("게시글을 불러올 수 없습니다.");

        const data = await res.json();

        // 서버 응답 구조에 맞춰 매핑
        const mapped: Post[] = data.items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "공지",
          title: p.title,
          author_name: p.author?.name || "알 수 없음",
          content: p.content,
          createAt: new Date(p.createdAt).toLocaleDateString(),
        }));

        setPosts(mapped);
        setTotalPages(data.totalPages || 1);
      } catch (err: any) {
        console.error("게시글 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage, category, postsPerPage]);

  // ==============================
  // 로딩 / 에러 처리
  // ==============================
  if (loading) return <p>게시글을 불러오는 중입니다...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  // ==============================
  // 렌더링 영역
  // ==============================
  return (
    <div className={styles.wrapper}>
      {/* 헤더 영역 */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{title}</h2>
        {showWriteButton && (
          <Link to={`${basePath}/write`} className={styles.writeBtn}>
            <FaPen />
          </Link>
        )}
      </div>

      {/* 게시글 테이블 */}
      {posts.length > 0 ? (
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: "12%" }} />
            <col style={{ width: "58%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
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
      ) : (
        <div className={styles.emptyMessage}>등록된 게시글이 없습니다.</div>
      )}

      {/* 페이지네이션 */}
      {posts.length > 0 && totalPages > 1 && (
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
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <FaAnglesRight />
          </button>
        </div>
      )}
    </div>
  );
}
