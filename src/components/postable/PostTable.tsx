// ==============================
// PostTable.tsx (프리젠테이셔널 + 글로벌 Loading 사용)
// ==============================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostTable.module.css";
import { FaPen } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Loading from "@/components/common/Loading";

// 게시글 행 타입
export interface PostRow {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image?: string;
}

// 컴포넌트 Props
export interface PostTableProps {
  posts: PostRow[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  basePath: string;
  title?: string;
  showWriteButton?: boolean;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export default function PostTable({
  posts,
  currentPage,
  setCurrentPage,
  totalPages,
  basePath,
  title = "게시판",
  showWriteButton = true,
  loading,
  error,
  emptyMessage = "등록된 게시글이 없습니다.",
}: PostTableProps) {
  // 로딩 / 에러

  // 로그인 상태 확인 (localStorage의 token 기준)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{title}</h2>
          {showWriteButton && isLoggedIn && (
            <Link to={`${basePath}/write`} className={styles.writeBtn} aria-label="글쓰기">
              <FaPen />
            </Link>
          )}
        </div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{title}</h2>
          {showWriteButton && isLoggedIn && (
            <Link to={`${basePath}/write`} className={styles.writeBtn} aria-label="글쓰기">
              <FaPen />
            </Link>
          )}
        </div>
        <div className={styles.emptyMessage}>오류 발생: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* 헤더 */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{title}</h2>
        {showWriteButton && isLoggedIn && (
          <Link to={`${basePath}/write`} className={styles.writeBtn} aria-label="글쓰기">
            <FaPen />
          </Link>
        )}

      </div>

      {/* 테이블 / 빈 상태 */}
      {posts && posts.length > 0 ? (
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
                <td>{post.author}</td>
                <td>{formatDate(post.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className={styles.pagination} role="navigation" aria-label="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
          >
            <FaAnglesLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={isActive ? styles.active : ""}
                aria-current={isActive ? "page" : undefined}
                aria-label={`${page} 페이지로 이동`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
          >
            <FaAnglesRight />
          </button>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
