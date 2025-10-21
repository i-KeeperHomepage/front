// ==============================
// PostDetail.tsx (게시글 상세 보기 컴포넌트 - 백엔드 연동 버전)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 백엔드에서 특정 게시글 데이터를 불러와 상세 내용을 표시합니다.
// 게시글의 제목, 카테고리, 작성자, 작성일, 본문, 첨부파일을 출력하며
// 댓글(CommentSection) 컴포넌트를 함께 포함합니다.
//
// 주요 기능:
// 1. useParams로 게시글 ID 추출
// 2. 백엔드 API(`/api/posts/:id`)로 게시글 상세 데이터 요청
// 3. 로딩 및 에러 상태 처리
// 4. 댓글(CommentSection) 포함
// 5. "목록" 버튼으로 이전 페이지 이동
//
// English Explanation:
// This component fetches a specific post from the backend API (`/api/posts/:id`)
// and renders its detailed view. It includes the title, category, author, date,
// content, attachments, and the CommentSection component.

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "@/components/commentSection/CommentSection";
import styles from "./PostDetail.module.css";
import Loading from "../common/Loading";

// ==============================
// Post 타입 정의
// ==============================
// 한국어: 백엔드에서 받아올 게시글 구조
// English: Structure of post data from backend
interface Post {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  file?: string;
  fileName?: string;
}

// ==============================
// PostDetail 컴포넌트
// ==============================
export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==============================
  // 백엔드 게시글 불러오기
  // ==============================
  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("게시글을 불러올 수 없습니다.");

        const data = await res.json();

        // 데이터 매핑 (백엔드 응답 구조에 맞게 수정 가능)
        const mapped: Post = {
          id: data.id,
          category: data.category?.name || "공지",
          title: data.title,
          author_name: data.author?.name || "알 수 없음",
          createAt: new Date(data.createdAt).toLocaleString(),
          content: data.content,
          file: data.fileUrl,
          fileName: data.fileName,
        };

        setPost(mapped);
      } catch (err: any) {
        console.error("게시글 불러오기 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPost();
  }, [id]);

  // ==============================
  // 로딩 / 에러 처리
  // ==============================
  if (loading) return <Loading/>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!post) return  <Loading message="게시글을 찾을 수 없습니다."/>

  // ==============================
  // 렌더링 영역
  // ==============================
  return (
    <section className={`site-container ${styles.detail}`}>
      {/* 제목 */}
      <h2 className={styles.title}>{post.title}</h2>

      {/* 메타 정보 */}
      <div className={styles.meta}>
        <span>{post.category}</span> · <span>{post.author_name}</span> · <span>{post.createAt}</span>
      </div>

      {/* 첨부파일 */}
      {post.file && (
        <div className={styles.fileWrap}>
          <p>첨부파일:</p>
          <a href={post.file} download target="_blank" rel="noopener noreferrer">
            {post.fileName || "파일 다운로드"}
          </a>
        </div>
      )}

      {/* 본문 내용 */}
      <div className={styles.content}>
        <p>{post.content}</p>
      </div>

      {/* 댓글 영역 */}
      <CommentSection postId={post.id} />

      {/* 목록으로 돌아가기 */}
      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>
    </section>
  );
}
