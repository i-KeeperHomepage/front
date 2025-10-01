// ==============================
// 마이페이지 (MyPage.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 로그인한 사용자의 마이페이지를 보여줍니다.
// 로그인 상태를 확인하고, 회원 정보와 사용자가 작성한 글 목록을 렌더링합니다.
// 현재는 프론트엔드에서 임시 데이터를 사용하며, 추후 백엔드 API 연동이 가능합니다.
//
// 주요 기능:
// 1. 로그인 여부 확인 (localStorage의 token 검사)
// 2. 회원 프로필 표시 (이름, 학번, 전공, 이메일, 학년/학차, 사인 이미지)
// 3. 사용자가 작성한 글 목록 표시 (카테고리, 제목, 작성일)
// 4. 백엔드 연결 시 fetch("/api/mypage")를 통해 실제 데이터 불러오기
//
// English Explanation:
// This component displays the My Page of a logged-in user.
// It checks login status, then renders user profile info and the list of posts they authored.
// Currently, demo data is used in the frontend, but a backend API can be integrated later.
//
// Key Features:
// 1. Check login status (validate token in localStorage)
// 2. Display user profile (name, studentId, major, email, year, signature image)
// 3. Display user-authored posts (category, title, created date)
// 4. On backend integration, fetch("/api/mypage") to retrieve real data

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import type { DemoPost } from "./demoPosts";

// 한국어: 사용자 프로필 타입 정의
// English: Define user profile type
interface UserProfile {
  name: string;
  studentId: string;
  major: string;
  email: string;
  year: string;
  fileUrl?: string; // optional signature image
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

    // 한국어: 프론트엔드 임시 데이터
    // English: Temporary frontend demo data
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

    // 한국어: 백엔드 연동 (주석 처리)
    // English: Backend integration (currently commented out)
    /*
    fetch("/api/mypage", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
      })
      .catch((err) => console.error("마이페이지 불러오기 실패 / Failed to load MyPage:", err));
    */
  }, [navigate]);

  if (!user) return <p className={styles.loading}>Loading...</p>;

  return (
    <section className={`site-container ${styles.mypage}`}>
      <h2 className={styles.title}>My Page</h2>

      {/* 회원 정보 / User Profile */}
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

      {/* 내가 작성한 글 / My Posts */}
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
