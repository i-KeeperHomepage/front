import styles from "./PostDetail.module.css";
import type { DemoPost } from "../../app/routes/demoPosts";
import { useNavigate } from "react-router-dom";
import CommentSection from "@/components/commentSection/CommentSection";

interface PostDetailProps {
  post: DemoPost;
}

export default function PostDetail({ post }: PostDetailProps) {
  const navigate = useNavigate();

  return (
    <section className={`site-container ${styles.detail}`}>
      <h2 className={styles.title}>{post.title}</h2>
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

      <div className={styles.content}>
        <p>{post.content}</p>
      </div>

      <CommentSection />

      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>
    </section>
  );
}
