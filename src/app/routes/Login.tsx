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
//    - 데모용: officer@officer.com / user@user.com 계정을 이용해 권한별 로그인
//    - 백엔드 연동: fetch("/api/login") 호출로 서버 인증
// 4. 로그인 성공 시 localStorage에 token과 role 저장, 로그인 이벤트 발생 후 메인 페이지로 이동
//
// English Explanation:
// This component handles the login functionality.
// When a user enters their email and password and clicks the login button,
// authentication is performed via either a frontend demo logic or a backend API.
//
// Key Features:
// 1. useState hook stores email and password in formData
// 2. handleChange: updates state when input values change
// 3. handleSubmit: attempts login
//    - demo: use officer@officer.com / user@user.com for role-based login
//    - backend: call fetch("/api/login") for server authentication
// 4. On success, store token and role in localStorage, dispatch a login event, then navigate to home

// - 엔드포인트: POST /api/auth/login
// - 응답: { message, user, accessToken }
// - 성공 시: accessToken, role(localStorage 저장), login 이벤트 발행

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { loginApi } from "@/api/api";

export default function Login() {
  const navigate = useNavigate();

  // 한국어: 로그인 입력값 상태 관리 (이메일, 비밀번호)
  // English: State for login inputs (email, password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 한국어: 입력값 변경 처리
  // English: Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  // 한국어: 로그인 버튼 클릭 시 실행
  // English: Execute when login button is clicked
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 한국어: 데모 로그인 먼저 처리
    // English: Handle demo login first
    // 데모 계정:
    // - officer@officer.com / officer  -> role: "officer"
    // - user@user.com / user           -> role: "member"
    if (formData.email === "officer@officer.com" && formData.password === "officer") {
      localStorage.setItem("token", "test-officer-token");
      localStorage.setItem("role", "officer");
      window.dispatchEvent(new Event("login"));
      navigate("/");
      return;
    }
    // 한국어: 데모 계정이 아니면 백엔드 로그인 시도
    // English:  If not a demo account, try backend authentication
    try {
      const data = await loginApi(formData.email, formData.password);
      // accessToken/role 저장
      localStorage.setItem("token", data.accessToken || "");
      localStorage.setItem("role", data.user?.role || "member");
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } catch (err: any) {
      alert(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`site-container ${styles.auth}`}>
      <h2>로그인</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 한국어: 이메일 입력 */}
        {/* English: Email input */}
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* 한국어: 비밀번호 입력 */}
        {/* English: Password input */}
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* 한국어: 로그인 버튼 */}
        {/* English: Login button */}
        <button type="submit" disabled={loading}>
          {loading ? "로그인 중" : "로그인"}
        </button>
      </form>
    </section>
  );
}
