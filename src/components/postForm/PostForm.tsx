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

// ==============================
// Props 정의 / Props Definition
// ==============================
// 한국어: 부모에서 카테고리 옵션, API 엔드포인트, 돌아갈 경로 등을 받아옴
// English: Receives category options, API endpoint, and basePath from parent
interface PostFormProps {
  categoryOptions: string[];   // 카테고리 목록 / Category list
  defaultCategory?: string;    // 기본 선택 카테고리 / Default selected category
  basePath: string;            // 작성 후 돌아갈 경로 (예: "/activities") / Redirect path after save
  apiEndpoint: string;         // 글 작성 API 엔드포인트 / API endpoint for saving post
}

export default function PostForm({
  categoryOptions,
  defaultCategory = categoryOptions[0],
  basePath,
  apiEndpoint, //선언되지 않는 이유: 백엔드 연결 전
}: PostFormProps) {
  const navigate = useNavigate();

  // ==============================
  // 상태 정의 / State Management
  // ==============================
  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null); // 첨부파일 / Attachment file

  // ==============================
  // 저장 처리 / Submit Handler
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 새 게시글 객체 생성 / Create new post object
    const newPost = {
      id: Date.now(), // 로컬에서는 timestamp 사용 / Use timestamp locally
      category,
      title,
      author_name: author,
      content,
      createAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식
      file: file ? URL.createObjectURL(file) : undefined, // demo 용 URL (실제는 서버 업로드 필요)
      fileName: file?.name,
    };

    // ==============================
    // 현재는 데모 동작 (navigate로 state 전달)
    // Currently demo mode (pass state via navigate)
    // ==============================
    if (window.confirm("저장하시겠습니까?")) {
      navigate(basePath, { state: { newPost } });
    }

    // ==============================
    // 추후 localStorage 저장 (주석 처리됨)
    // Later: Save to localStorage (commented out)
    // ==============================
    /*
    const savedPosts = JSON.parse(localStorage.getItem(basePath) || "[]");
    localStorage.setItem(basePath, JSON.stringify([newPost, ...savedPosts]));
    */

    // ==============================
    // 백엔드 연동 코드 (주석 처리)
    // Backend integration (commented out)
    // ==============================
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
      <h2 className={styles.title}>공지 작성</h2>

      {/* 작성 폼 / Write Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 카테고리 선택 / Category Select */}
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

        {/* 제목 / Title */}
        <div className={styles.row}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 작성자 / Author */}
        <div className={styles.row}>
          <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* 내용 / Content */}
        <div className={styles.row}>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            style={{
              width: "100%",          
              padding: "8px",          
              borderRadius: "4px",     
              border: "1px solid #ccc",
              fontFamily: "inherit",   
              fontSize: "14px",        
              lineHeight: "1.5",       
              resize: "none",      
              boxSizing: "border-box", 
              outline: "none",         
              backgroundColor: "#fff", 
            }}
          />
        </div>

        {/* 파일 업로드 / File Upload */}
        <div className={styles.row}>
          <label>첨부파일</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            accept="*"
          />

          {/* 다중 파일 업로드 버전 (주석) / Multiple file upload version (commented out) */}
          {/*
          <input
            type="file"
            multiple
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
            accept="*"
          />
          */}
        </div>

        {/* 버튼 / Buttons */}
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
