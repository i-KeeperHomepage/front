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
import Loading from "@/components/common/Loading";

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

// 한국어: 사용자가 작성한 게시글 타입 정의
// English: Define post type authored by user
interface UserPost {
  id: number;
  category: string;
  title: string;
  createAt: string;
}

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 백엔드 연동
    // 한국어: 로그인한 사용자의 마이페이지 정보 및 작성한 글을 불러옴
    // English: Fetch user profile and authored posts from backend
    async function fetchMyPage() {
      try {
        const res = await fetch("/api/mypage", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("마이페이지 불러오기 실패");
        }

        const data = await res.json();

        // 한국어: 백엔드 응답 구조에 따라 데이터 매핑
        // English: Map backend response to frontend structure
        const mappedUser: UserProfile = {
          name: data.user?.name || "이름 없음",
          studentId: data.user?.studentId || "-",
          major: data.user?.major || "-",
          email: data.user?.email || "-",
          year: data.user?.year || "-",
          fileUrl: data.user?.fileUrl || "",
        };

        const mappedPosts: UserPost[] = Array.isArray(data.posts)
          ? data.posts.map((p: any) => ({
              id: p.id,
              category: p.category?.name || "기타",
              title: p.title || "제목 없음",
              createAt: p.createdAt || "-",
            }))
          : [];

        setUser(mappedUser);
        setPosts(mappedPosts);
      } catch (err) {
        console.error("마이페이지 데이터 불러오기 실패:", err);
        alert("서버 연결 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyPage();
  }, [navigate]);

  if (loading) return <Loading/>;
  if (!user) return <Loading message="회원 정보를 불러올 수 없습니다"/>;

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
