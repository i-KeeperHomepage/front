// ==============================
// PostTable.tsx (게시판 테이블 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 게시판 형식으로 글 목록을 보여주는 UI입니다.
// localStorage에 저장된 게시글과 props로 전달된 게시글을 합쳐서 화면에 출력합니다.
// 페이징 처리, 작성 버튼, 카테고리/제목/작성자/날짜 컬럼을 포함합니다.
//
// 주요 기능:
// 1. localStorage에 저장된 글 불러오기
// 2. props(posts)와 localPosts를 합쳐서 렌더링
// 3. 페이징 처리 (한 페이지당 postsPerPage 개수)
// 4. 글 작성 버튼 표시 여부(showWriteButton) 제어
// 5. basePath를 기준으로 상세 페이지/작성 페이지로 이동
//
// English Explanation:
// This component renders a board-style table of posts.
// It merges posts from localStorage and props, then displays them with pagination.
// The table includes columns for category, title, author, and date.
//
// Features:
// 1. Load posts stored in localStorage
// 2. Merge localStorage posts with props(posts)
// 3. Pagination (controlled by postsPerPage)
// 4. Toggle write button visibility using showWriteButton
// 5. Navigate to post detail and write page using basePath

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostTable.module.css"; 
import type { DemoPost } from "../../app/routes/demoPosts";
import { FaPen } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// ==============================
// Post 인터페이스 정의
// ==============================
// 한국어: 게시글 데이터 구조 (카테고리, 제목, 작성자, 내용, 작성일)
// English: Post data structure (category, title, author, content, date)
interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  content: string;
  createAt: string;
}

// ==============================
// 컴포넌트 Props 정의
// ==============================
// 한국어: 게시글 배열, 페이징 상태, basePath(라우팅용), 작성 버튼 여부
// English: Props include posts array, pagination state, basePath, and write button toggle
interface PostTableProps {
  posts: DemoPost[];                    
  currentPage: number;              
  setCurrentPage: (page: number) => void; 
  postsPerPage?: number;            
  basePath: string;                
  title?: string;
  showWriteButton?: boolean;
}

// ==============================
// PostTable 컴포넌트
// ==============================
export default function PostTable({
  posts = [],
  currentPage,
  setCurrentPage,
  postsPerPage = 5,
  basePath,
  title = "게시판",
  showWriteButton = true,
}: PostTableProps) {
  // localStorage에서 불러온 게시글
  // Posts loaded from localStorage
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  // 컴포넌트 로드 시 localStorage 불러오기
  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem(basePath) || "[]");
    setLocalPosts(savedPosts);
  }, [basePath]);

  // localStorage + props(posts) 합치기
  // Merge localStorage posts with props
  const allPosts = [...localPosts, ...posts];

  // 페이징 계산
  // Pagination calculation
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        {/* 게시판 제목 / Board Title */}
        <h2 className={styles.title}>{title}</h2>
        
        {/* 글 작성 버튼 (officer 권한일 때만 보이도록 조정 가능) */}
        {/* Write button (can be restricted to officer role later) */}
        {showWriteButton && (
          <Link to={`${basePath}/write`} className={styles.writeBtn}>
            <FaPen />
          </Link>
        )}
      </div>

      {/* 게시글 테이블 / Post Table */}
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

      {/* 페이지네이션 / Pagination */}
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
