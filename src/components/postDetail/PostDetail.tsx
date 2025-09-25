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
        <span>{post.category}</span> · <span>{post.author_name}</span> · <span>{post.createAt}</span> ·{" "}
        <span>조회</span>
      </div>

      {post.image && (
        <div className={styles.imageWrap}>
          <img src={post.image} alt={post.title} />
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
