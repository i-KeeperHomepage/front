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
//    - 데모용: officer@test.com / user@test.com 계정을 이용해 권한별 로그인
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 한국어: 백엔드 연동 코드 (나중에 주석 해제)
    // English: Backend integration code (uncomment later)
    /*
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("로그인 실패 / Login failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // 서버에서 role을 받아옴 / role from server
        window.dispatchEvent(new Event("login"));
        navigate("/");
      })
      .catch(console.error);
    */

    // 한국어: 프론트엔드 데모 로그인 (임원진 계정)
    // English: Frontend demo login (officer account)
    if (formData.email === "officer@officer.com" && formData.password === "officer") {
      localStorage.setItem("token", "test-officer-token");
      localStorage.setItem("role", "officer");
      window.dispatchEvent(new Event("login"));
      navigate("/");
      return;
    }

    // 한국어: 프론트엔드 데모 로그인 (일반 회원 계정)
    // English: Frontend demo login (member account)
    if (formData.email === "user@user.com" && formData.password === "user") {
      localStorage.setItem("token", "test-user-token");
      localStorage.setItem("role", "member");
      window.dispatchEvent(new Event("login"));
      navigate("/");
      return;
    }

    // 한국어: 로그인 실패 시 경고창
    // English: Show alert when login fails
    alert("아이디 또는 비밀번호가 올바르지 않습니다. / Invalid email or password.");
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
