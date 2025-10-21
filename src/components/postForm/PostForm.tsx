// ==============================
// PostForm.tsx (게시글 작성 폼 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 새로운 게시글을 작성하는 화면입니다.
// 제목, 작성자, 내용, 카테고리, 첨부파일 입력 기능을 제공합니다.
// 저장 시 `navigate`를 통해 목록 페이지로 이동하며, 새 글 데이터를 전달합니다.
// 나중에 백엔드가 연결되면 fetch 요청을 통해 DB에 저장되도록 연동할 수 있습니다.
//
// English Explanation:
// This component provides a form for creating a new post.
// It allows input of title, author, content, category, and an attachment file.
// On submit, it navigates back to the list page with the new post data.
// Later, with backend integration, it will send the data to the DB via fetch.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostForm.module.css";

interface PostFormProps {
  categoryOptions: string[];
  defaultCategory?: string;
  basePath: string;
  apiEndpoint: string; // 글 작성 API 엔드포인트
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
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 파일 업로드
      let uploadedFileId: number | null = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("purpose", "document");

        const uploadRes = await fetch("/api/files/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!uploadRes.ok) throw new Error("파일 업로드 실패");

        const uploadData = await uploadRes.json();
        uploadedFileId = uploadData.id;
      }

      // 게시글 데이터
      const newPost = {
        title,
        content,
        categoryId: categoryOptions.indexOf(category) + 1, // 단순 매핑 예시
        fileIds: uploadedFileId ? [uploadedFileId] : [],
      };

      // 전달받은 apiEndpoint 사용
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("게시글 등록 실패");

      alert("게시글이 저장되었습니다.");
      navigate(basePath);
    } catch (err) {
      console.error(err);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`site-container ${styles.formWrap}`}>
      <h2 className={styles.title}>게시글 작성</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
          />
        </div>

        <div className={styles.row}>
          <label>첨부파일</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            accept="*"
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={loading}>
            {loading ? "저장 중..." : "저장"}
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </section>
  );
}
