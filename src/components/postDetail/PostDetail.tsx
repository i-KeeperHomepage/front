import styles from "./PostDetail.module.css";
import { Post } from "../../app/routes/demoPosts";
import { useNavigate } from "react-router-dom";
import CommentSection from "@/components/commentSection/CommentSection";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const navigate = useNavigate();

  return (
    <section className={`site-container ${styles.detail}`}>
      <h2 className={styles.title}>{post.subject}</h2>
      <div className={styles.meta}>
        <span>{post.category}</span> · <span>{post.name}</span> · <span>{post.date}</span> ·{" "}
        <span>조회 {post.hit}</span>
      </div>

      {post.image && (
        <div className={styles.imageWrap}>
          <img src={post.image} alt={post.subject} />
        </div>
      )}

      <div className={styles.content}>
        <p>{post.content}</p>
      </div>

      {/* ✅ 댓글 영역 */}
      <CommentSection />

      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>
    </section>
  );
}
