// ==============================
// CommentSection.tsx (댓글 기능 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 게시글에 댓글을 작성, 수정, 삭제할 수 있는 UI를 제공합니다.
// 현재는 프론트엔드 상태(useState)만 사용하고 있으며,
// 나중에 백엔드 API와 연결될 수 있도록 fetch 코드가 주석으로 포함되어 있습니다.
//
// 주요 기능:
// 1. 댓글 작성 (작성자, 내용 입력 후 등록)
// 2. 댓글 수정 (수정 버튼 클릭 시 textarea로 전환 → 저장/취소 가능)
// 3. 댓글 삭제
// 4. 백엔드 연결 시 fetch POST/PUT/DELETE 요청 주석 처리
//
// English Explanation:
// This component provides a UI for adding, editing, and deleting comments on a post.
// Currently, it only updates frontend state using useState,
// but fetch code is included as comments for future backend integration.
//
// Features:
// 1. Add comments (author, content input then submit)
// 2. Edit comments (switch to textarea on "edit" → save/cancel)
// 3. Delete comments
// 4. Fetch POST/PUT/DELETE calls are commented out for backend integration

import { useState } from "react";
import styles from "./CommentSection.module.css";

// 한국어: 댓글 데이터 타입 정의
// English: Define Comment type
interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function CommentSection() {
  // 한국어: 댓글 목록 상태 / English: State for comment list
  const [comments, setComments] = useState<Comment[]>([]);
  // 한국어: 입력 중인 작성자 / English: Input value for author
  const [author, setAuthor] = useState("");
  // 한국어: 입력 중인 댓글 내용 / English: Input value for content
  const [content, setContent] = useState("");
  // 한국어: 현재 수정 중인 댓글 ID / English: ID of comment being edited
  const [editingId, setEditingId] = useState<number | null>(null);
  // 한국어: 수정 textarea에 입력되는 값 / English: Value inside edit textarea
  const [editContent, setEditContent] = useState("");

  // ==============================
  // 댓글 작성 (Add Comment)
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newComment: Comment = {
      id: comments.length + 1, // 한국어: 실제 백엔드에서는 DB에서 자동 생성됨 / English: In backend, ID would be auto-generated
      author,
      content,
      date: new Date().toLocaleString(),
    };

    // 한국어: 현재는 로컬 상태만 업데이트 / English: Update local state only for now
    setComments([newComment, ...comments]);

    // 한국어: 백엔드 연동 시 fetch POST 사용 / English: Use fetch POST when backend is connected
    /*
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("댓글 등록 실패 / Failed to add comment");
      const saved = await res.json();
      setComments([saved, ...comments]);
    } catch (err) {
      console.error(err);
    }
    */

    setAuthor("");
    setContent("");
  };

  // ==============================
  // 댓글 삭제 (Delete Comment)
  // ==============================
  const handleDelete = (id: number) => {
    // 한국어: 로컬 상태에서 삭제 / English: Remove from local state
    setComments(comments.filter((c) => c.id !== id));

    // 한국어: 백엔드 연동 시 fetch DELETE 사용 / English: Use fetch DELETE when backend is connected
    /*
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    */
  };

  // ==============================
  // 댓글 수정 시작 (Start Editing)
  // ==============================
  const handleEditStart = (id: number, oldContent: string) => {
    setEditingId(id);
    setEditContent(oldContent);
  };

  // ==============================
  // 댓글 수정 저장 (Save Edited Comment)
  // ==============================
  const handleEditSave = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, content: editContent } : c
      )
    );
    setEditingId(null);
    setEditContent("");

    // 한국어: 백엔드 연동 시 fetch PUT 사용 / English: Use fetch PUT when backend is connected
    /*
    await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    */
  };

  return (
    <div className={styles.comments}>
      <h3>댓글 {comments.length}</h3>

      {/* 댓글 입력 폼 / Comment Input Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <textarea
            placeholder="댓글 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">등록</button>
        </div>
      </form>

      {/* 댓글 리스트 / Comment List */}
      <ul className={styles.list}>
        {comments.map((c) => (
          <li key={c.id}>
            <div className={styles.meta}>
              <span>{c.author}</span> · <span>{c.date}</span>
            </div>

            {editingId === c.id ? (
              // 수정 중일 때 / When Editing
              <div className={styles.editBox}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className={styles.buttons}>
                  <button onClick={() => handleEditSave(c.id)}>저장</button>
                  <button onClick={() => setEditingId(null)}>취소</button>
                </div>
              </div>
            ) : (
              // 기본 보기 / Default View
              <>
                <p>{c.content}</p>
                <div className={styles.actions}>
                  <button onClick={() => handleEditStart(c.id, c.content)}>
                    수정
                  </button>
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
