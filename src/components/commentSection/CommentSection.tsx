// ==============================
// CommentSection.tsx (댓글 기능, 백엔드 연동 버전)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 게시글 상세 페이지 내 댓글 섹션을 담당합니다.
// 댓글 목록 조회, 작성, 수정, 삭제 기능을 제공하며 백엔드 API와 연동됩니다.
//
// 주요 기능:
// 1. useEffect를 통해 특정 게시글(postId)의 댓글을 백엔드에서 불러옴 (GET /api/posts/:id/comments)
// 2. 새 댓글 작성 시 POST 요청으로 서버에 저장 (POST /api/posts/:id/comments)
// 3. 댓글 수정 시 PUT 요청으로 서버 업데이트 (PUT /api/comments/:commentId)
// 4. 댓글 삭제 시 DELETE 요청으로 서버에서 제거 (DELETE /api/comments/:commentId)
// 5. localStorage에서 로그인 사용자 정보(author) 불러오기
//
// English Explanation:
// This component manages comments within a post detail page.
// It supports loading, posting, editing, and deleting comments using backend API endpoints.
// Features include backend integration, state management, and inline editing support.

import { useRef, useState, useEffect } from "react";
import styles from "./CommentSection.module.css";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  postId: number; // 게시글 ID
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [_content, setContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userName") || "익명";
    setAuthor(loggedInUser);
  }, []);

  // ==============================
  // 댓글 불러오기 (GET /api/posts/:postId/comments)
  // ==============================
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/posts/${postId}/comments`);
        if (!res.ok) throw new Error("댓글 데이터를 불러올 수 없습니다.");

        const data = await res.json();

        const mapped: Comment[] = data.map((c: any) => ({
          id: c.id,
          author: c.author?.name || "익명",
          content: c.content,
          date: new Date(c.createdAt).toLocaleString(),
        }));

        setComments(mapped);
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
      }
    }

    fetchComments();
  }, [postId]);

  // contenteditable 내용 추출 함수
  const extractText = (el: HTMLDivElement | null) => {
    if (!el) return "";
    return el.innerHTML
      .replace(/<div>/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/div>/g, "")
      .replace(/&nbsp;/g, " ");
  };

  const handleInput = () => {
    setContent(extractText(contentRef.current));
  };

  // Shift+Enter 줄바꿈 / Enter로 등록
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // ==============================
  // 댓글 등록 (POST /api/posts/:postId/comments)
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = extractText(contentRef.current).trim();
    if (!text) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");

      const data = await res.json();
      const newComment: Comment = {
        id: data.id,
        author: data.author?.name || author,
        content: data.content.replace(/\n/g, "<br>"),
        date: new Date(data.createdAt).toLocaleString(),
      };

      setComments([newComment, ...comments]);
      setContent("");
      if (contentRef.current) contentRef.current.innerHTML = "";
    } catch (err) {
      console.error(err);
    }
  };

  // ==============================
  // 댓글 삭제 (DELETE /api/comments/:commentId)
  // ==============================
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("댓글 삭제 실패");

      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      console.error("댓글 삭제 오류:", err);
    }
  };

  // ==============================
  // 댓글 수정 (PUT /api/comments/:commentId)
  // ==============================
  const handleEditStart = (id: number, oldContent: string) => {
    setEditingId(id);
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.innerHTML = oldContent;
      }
    }, 0);
  };

  const handleEditSave = async (id: number) => {
    const newText = extractText(editRef.current).trim().replace(/\n/g, "<br>");
    if (!newText) return;

    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newText }),
      });

      if (!res.ok) throw new Error("댓글 수정 실패");

      setComments(
        comments.map((c) =>
          c.id === id ? { ...c, content: newText } : c
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("댓글 수정 오류:", err);
    }
  };

  return (
    <div className={styles.comments}>
      <h3>댓글 {comments.length}</h3>

      {/* 댓글 작성 영역 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.authorInput}>{author}</div>
        <div className={styles.inputWrap}>
          <div
            ref={contentRef}
            className={styles.inputLike}
            contentEditable
            data-placeholder="댓글 입력"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          ></div>
          <button type="submit" className={styles.submitBtn}>등록</button>
        </div>
      </form>

      {/* 댓글 리스트 */}
      <ul className={styles.list}>
        {comments.map((c) => (
          <li key={c.id} className={styles.item}>
            <div className={styles.meta}>
              <span>{c.author}</span> · <span>{c.date}</span>
            </div>

            {editingId === c.id ? (
              <div className={styles.editBox}>
                <div
                  ref={editRef}
                  className={styles.inputLike}
                  contentEditable
                  data-placeholder="댓글 수정 중..."
                ></div>
                <div className={styles.buttons}>
                  <button type="button" onClick={() => handleEditSave(c.id)}>저장</button>
                  <button type="button" onClick={() => setEditingId(null)}>취소</button>
                </div>
              </div>
            ) : (
              <>
                <p
                  className={styles.commentText}
                  dangerouslySetInnerHTML={{ __html: c.content }}
                />
                <div className={styles.actions}>
                  <button onClick={() => handleEditStart(c.id, c.content)}>수정</button>
                  <button onClick={() => handleDelete(c.id)}>삭제</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
