import { useState } from "react";
import styles from "./CommentSection.module.css";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newComment: Comment = {
      id: comments.length + 1, // 백엔드에서는 DB에서 자동 생성
      author,
      content,
      date: new Date().toLocaleString(),
    };

    // 지금은 로컬 상태만 업데이트
    setComments([newComment, ...comments]);

    // 나중에 백엔드 연결할 때는 fetch 사용
    /*
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("댓글 등록 실패");
      const saved = await res.json();
      setComments([saved, ...comments]);
    } catch (err) {
      console.error(err);
    }
    */

    setAuthor("");
    setContent("");
  };

  const handleDelete = (id: number) => {
    // 로컬에서는 그냥 삭제
    setComments(comments.filter((c) => c.id !== id));

    // 백엔드 연결시
    /*
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    */
  };

  const handleEditStart = (id: number, oldContent: string) => {
    setEditingId(id);
    setEditContent(oldContent);
  };

  const handleEditSave = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, content: editContent } : c
      )
    );
    setEditingId(null);
    setEditContent("");

    // 백엔드 연결시
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

      {/* 댓글 입력 폼 */}
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

      {/* 댓글 리스트 */}
      <ul className={styles.list}>
        {comments.map((c) => (
          <li key={c.id}>
            <div className={styles.meta}>
              <span>{c.author}</span> · <span>{c.date}</span>
            </div>

            {editingId === c.id ? (
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
