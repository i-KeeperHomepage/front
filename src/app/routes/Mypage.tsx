import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import type { DemoPost } from "./demoPosts";

interface UserProfile {
  name: string;
  studentId: string;
  major: string;
  email: string;
  year: string;
  fileUrl?: string;
}

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<DemoPost[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 프론트 임시 데이터
    setUser({
      name: "홍길동",
      studentId: "20250001",
      major: "컴퓨터공학과",
      email: "test@example.com",
      year: "3학년 1학기",
      fileUrl: "/img/sign.png",
    });

    setPosts([
      {
        id: 1,
        category: "공지",
        title: "i-Keeper 세미나 안내",
        author_name: "홍길동",
        content: "2025년 보안 세미나 일정입니다.",
        createAt: "2025-09-26",
      },
      {
        id: 2,
        category: "특강",
        title: "웹 보안 특강",
        author_name: "홍길동",
        content: "웹 취약점 분석 특강 예정.",
        createAt: "2025-09-20",
      },
    ]);

    // 나중에 백엔드 연결
    /*
    fetch("/api/mypage", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
      })
      .catch((err) => console.error("마이페이지 불러오기 실패:", err));
    */
  }, [navigate]);

  if (!user) return <p className={styles.loading}>불러오는 중...</p>;

  return (
    <section className={`site-container ${styles.mypage}`}>
      <h2 className={styles.title}>My Page</h2>

      {/* 회원 정보 */}
      <h3 className={styles.subTitle}>회원 정보</h3>
      <table className={styles.infoTable}>
        <tbody>
          <tr><th>이름</th><td>{user.name}</td></tr>
          <tr><th>학번</th><td>{user.studentId}</td></tr>
          <tr><th>전공</th><td>{user.major}</td></tr>
          <tr><th>이메일</th><td>{user.email}</td></tr>
          <tr><th>학년/학차</th><td>{user.year}</td></tr>
          {user.fileUrl && (
            <tr>
              <th>사인 파일</th>
              <td><img src={user.fileUrl} alt="사인 이미지" className={styles.signImg} /></td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 내가 작성한 글 */}
      <h3 className={styles.subTitle}>내가 작성한 글</h3>
      {posts.length > 0 ? (
        <table className={styles.postTable}>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.category}</td>
                <td>{post.title}</td>
                <td>{post.createAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>작성한 글이 없습니다.</p>
      )}
    </section>
  );
}
