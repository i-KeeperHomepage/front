import { useRef, useState, useEffect } from "react";
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);

  // 로그인된 사용자 ID 불러오기
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId"); // 로그인 시 저장된 값
    if (loggedInUser) {
      setAuthor(loggedInUser);
    } else {
      setAuthor("익명"); // fallback
    }
  }, []);

  // contenteditable에서 입력값 추출
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

  // Shift+Enter 줄바꿈 / Enter 등록
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // 댓글 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = extractText(contentRef.current).trim();
    if (!author.trim() || !text) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author,
      content: text.replace(/\n/g, "<br>"), // 줄바꿈 표시 유지
      date: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setContent("");
    if (contentRef.current) contentRef.current.innerHTML = "";
  };

  // 댓글 삭제
  const handleDelete = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // 수정 시작
  const handleEditStart = (id: number, oldContent: string) => {
    setEditingId(id);
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.innerHTML = oldContent;
      }
    }, 0);
  };

  // 수정 저장
  const handleEditSave = (id: number) => {
    const newText = extractText(editRef.current).trim().replace(/\n/g, "<br>");
    if (!newText) return;

    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, content: newText } : c
      )
    );
    setEditingId(null);
  };

  return (
    <div className={styles.comments}>
      <h3>댓글 {comments.length}</h3>

      {/* 댓글 작성 */}
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
