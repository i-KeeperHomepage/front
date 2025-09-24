import { useState } from "react";
import styles from "./CommentSection.module.css";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  password: string; // ✅ 비밀번호 저장
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // ✅ 댓글 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content || !password) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author,
      content,
      date: new Date().toLocaleString(),
      password,
    };

    setComments([newComment, ...comments]);
    setAuthor("");
    setPassword("");
    setContent("");
  };

  // ✅ 댓글 삭제
  const handleDelete = (id: number) => {
    const pw = prompt("비밀번호를 입력하세요:");
    const target = comments.find((c) => c.id === id);
    if (target && pw === target.password) {
      setComments(comments.filter((c) => c.id !== id));
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  // ✅ 댓글 수정 시작
  const handleEditStart = (id: number, oldContent: string) => {
    setEditingId(id);
    setEditContent(oldContent);
  };

  // ✅ 댓글 수정 완료
  const handleEditSave = (id: number) => {
    const pw = prompt("비밀번호를 입력하세요:");
    const target = comments.find((c) => c.id === id);
    if (target && pw === target.password) {
      setComments(
        comments.map((c) =>
          c.id === id ? { ...c, content: editContent } : c
        )
      );
      setEditingId(null);
      setEditContent("");
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
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
