import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostForm.module.css";

interface PostFormProps {
  categoryOptions: string[];   // 게시판 카테고리 목록
  defaultCategory?: string;    // 기본 선택 카테고리
  basePath: string;            // 작성 후 돌아갈 경로 (예: "/activities")
  apiEndpoint: string;         // 글 작성 API 엔드포인트 (예: "/api/posts")
}

export default function PostForm({
  categoryOptions,
  defaultCategory = categoryOptions[0],
  basePath,
  apiEndpoint,
}: PostFormProps) {
  const navigate = useNavigate();

  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(), // 로컬에서는 timestamp로 ID 생
      category,
      title,
      author_name: author,
      content,
      createAt: new Date().toISOString().split("T")[0],
    };
    
    // 데모: navigate로 전달
    if (window.confirm("저장하시겠습니까?")) {
      navigate(basePath, { state: { newPost } });
    }

    // // confirm으로 작성 확인
    // const confirmed = window.confirm("게시글을 저장하시겠습니까?");
    // if (!confirmed) return;

    // // 지금은 localStorage에 저장
    // const savedPosts = JSON.parse(localStorage.getItem(basePath) || "[]");
    // localStorage.setItem(basePath, JSON.stringify([newPost, ...savedPosts]));


    // 나중에 백엔드 연동
    /*
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("게시글 등록 실패");

      alert("게시글이 저장되었습니다.");
      navigate(basePath);
    } catch (err) {
      console.error(err);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
    */
  };


  return (
    <section className={`site-container ${styles.formWrap}`}>
      <h2 className={styles.title}>게시글 작성</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 카테고리 선택 */}
        <div className={styles.row}>
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 */}
        <div className={styles.row}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 작성자 */}
        <div className={styles.row}>
          <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* 내용 */}
        <div className={styles.row}>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* 버튼 */}
        <div className={styles.actions}>
          <button type="submit">저장</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </section>
  );
}
