// ==============================
// PostDetail.tsx (게시글 상세 보기 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 게시글 상세 페이지를 표시합니다.
// 제목, 카테고리, 작성자, 작성일, 본문 내용을 보여주며,
// 첨부파일이 있는 경우 다운로드 링크를 제공합니다.
// 또한 댓글(CommentSection) 컴포넌트를 포함하고 있으며,
// "목록" 버튼으로 이전 페이지로 돌아갈 수 있습니다.
//
// English Explanation:
// This component renders the detail view of a post.
// It displays the title, category, author, created date, and content.
// If there is an attached file, a download link is provided.
// It also includes a CommentSection component and
// has a "Back to List" button to navigate back.

import styles from "./PostDetail.module.css";
import type { DemoPost } from "../../app/routes/demoPosts";
import { useNavigate } from "react-router-dom";
import CommentSection from "@/components/commentSection/CommentSection";

// ==============================
// Props 인터페이스 정의
// ==============================
// 한국어: 게시글 데이터를 받아와서 표시하기 위한 타입 정의
// English: Type definition for the post data to display
interface PostDetailProps {
  post: DemoPost;
}

// ==============================
// PostDetail 컴포넌트
// ==============================
export default function PostDetail({ post }: PostDetailProps) {
  const navigate = useNavigate();

  return (
    <section className={`site-container ${styles.detail}`}>
      {/* 게시글 제목 / Post Title */}
      <h2 className={styles.title}>{post.title}</h2>

      {/* 메타 정보 (카테고리, 작성자, 작성일) */}
      {/* Meta Information (Category, Author, Date) */}
      <div className={styles.meta}>
        <span>{post.category}</span> · <span>{post.author_name}</span> · <span>{post.createAt}</span>
      </div>

      {/* 첨부파일 영역 / Attachment Section */}
      {post.file && (
        <div className={styles.fileWrap}>
          <p>첨부파일:</p>
          <a href={post.file} download target="_blank" rel="noopener noreferrer">
            {post.fileName || "파일 다운로드"}
          </a>
        </div>
      )}

      {/* 본문 내용 / Post Content */}
      <div className={styles.content}>
        <p>{post.content}</p>
      </div>

      {/* 댓글 컴포넌트 포함 / Comment Section */}
      <CommentSection />

      {/* 뒤로가기 버튼 / Back Button */}
      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>
    </section>
  );
}
