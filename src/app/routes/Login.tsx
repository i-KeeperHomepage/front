// ==============================
// 로그인 페이지 (Login.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 로그인 기능을 담당합니다.
// 사용자가 이메일과 비밀번호를 입력하고 로그인 버튼을 누르면,
// 백엔드 API 연동 또는 프론트엔드 데모 로그인 로직을 통해 인증이 이루어집니다.
//
// 주요 기능:
// 1. useState 훅을 사용해 email, password를 formData에 저장
// 2. handleChange: 입력값이 변경될 때 상태 업데이트
// 3. handleSubmit: 로그인 시도
//    - (주석 처리) fetch로 백엔드 API와 연동
//    - 데모용: officer@officer.com / user@user.com 계정을 이용해 권한별 로그인
// 4. 로그인 성공 시 localStorage에 token과 role 저장, 이벤트 발생 후 메인 페이지로 이동
//
// English Explanation:
// This component handles the login functionality.
// When a user enters their email and password and clicks the login button,
// authentication is performed via either a backend API (future) or frontend demo logic.
//
// Key Features:
// 1. useState hook stores email and password in formData
// 2. handleChange: updates state when input values change
// 3. handleSubmit: attempts login
//    - (commented out) fetch call to backend API
//    - demo: use officer@test.com / user@test.com accounts for role-based login
// 4. On success, store token and role in localStorage, trigger event, then navigate to home

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Login() {
  const navigate = useNavigate();

  // 한국어: 로그인 입력값 상태 관리 (이메일, 비밀번호)
  // English: State for login inputs (email, password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 한국어: 입력값 변경 처리
  // English: Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 한국어: 로그인 버튼 클릭 시 실행
  // English: Execute when login button is clicked
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 한국어: 백엔드 연동 코드
    // English: Backend integration code (uncomment when ready)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        alert("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      const data = await res.json();

      // 한국어: 서버에서 받은 토큰과 역할 저장
      // English: Store token and role from server
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("서버 연결 중 오류가 발생했습니다.");
    }

    
    // 한국어: 프론트엔드 데모 로그인 (테스트용)
    // English: Frontend demo login (for testing only)
    if (formData.email === "officer@officer.com" && formData.password === "officer") {
      localStorage.setItem("token", "test-officer-token");
      localStorage.setItem("role", "officer");
      window.dispatchEvent(new Event("login"));
      navigate("/");
      return;
    }

    if (formData.email === "user@user.com" && formData.password === "user") {
      localStorage.setItem("token", "test-user-token");
      localStorage.setItem("role", "member");
      window.dispatchEvent(new Event("login"));
      navigate("/");
      return;
    }
    
  };

  return (
    <section className={`site-container ${styles.auth}`}>
      <h2>로그인</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {/* 비밀번호 입력 */}
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}
