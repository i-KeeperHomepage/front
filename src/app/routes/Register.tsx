// ==============================
// Register.tsx (회원가입 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 회원가입(Register) 페이지입니다.
// 사용자는 이름, 학번, 전공, 이메일, 학년/학차, 비밀번호, 서명 이미지 파일(PNG)을 입력해야 합니다.
// 이메일 인증 후, 백엔드 API(`/api/register`)를 통해 회원가입 요청을 보냅니다.
//
// 주요 기능:
// - FormData를 이용한 파일 포함 회원가입 요청
// - 이메일 인증 코드 발송 및 검증(`/api/send-auth-code`, `/api/verify-auth-code`)
// - 회원가입 성공 시 로그인 페이지로 이동
//
// English Explanation:
// This component is the user registration page.
// Users fill in required fields and upload a PNG signature file.
// After email verification, a FormData POST request is sent to `/api/register`.
// On success, the user is redirected to the login page.

// - 엔드포인트: POST /api/auth/register
// - 요청: { email, password, name, major, class }
// - 가이드는 이메일 인증 엔드포인트를 제공하지 않으므로(별도 문서 없을 때)
//   이메일 인증 UI는 잠시 비활성화하고 바로 register 호출.
// - 가입 성공 시: "관리자 승인 대기" 메시지 후 로그인 페이지로 이동.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
//import { registerApi } from "@/api/api";

export default function Register() {
  const navigate = useNavigate();

  // 한국어: 입력값 상태
  // English: Form data state
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    email: "",
    year: "",
    password: "",
    file: null as File | null, // 서명 파일
  });

  const [authCode, setAuthCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // input 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 이메일 인증 코드 전송
  const sendEmailAuth = async () => {
    if (!formData.email) return alert("이메일을 입력해주세요.");

    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!res.ok) throw new Error("인증 코드 전송 실패");
      alert("이메일로 인증 코드를 보냈습니다.");
      setIsEmailSent(true);
    } catch (err) {
      console.error("이메일 인증코드 전송 실패:", err);
      alert("이메일 인증코드 전송 중 오류가 발생했습니다.");
    }
  };

  // 인증 코드 확인
  const verifyCode = async () => {
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: authCode }),
      });

      const data = await res.json();
      if (data.success) {
        alert("인증 성공!");
        setIsVerified(true);
      } else {
        alert("인증 실패. 코드를 확인해주세요.");
      }
    } catch (err) {
      console.error("인증 확인 실패:", err);
      alert("서버 오류로 인증을 완료할 수 없습니다.");
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) return alert("이메일 인증을 먼저 완료해주세요.");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as Blob);
      });

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("회원가입 실패");
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 중 오류:", err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section className={`site-container ${styles.auth}`}>
      <h2>회원가입</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" placeholder="이름" required onChange={handleChange} />
        <input name="studentId" placeholder="학번" required onChange={handleChange} />
        <input name="year" placeholder="학년/학차" required onChange={handleChange} />
        <input name="major" placeholder="전공" required onChange={handleChange} />
        <input type="email" name="email" placeholder="이메일" required onChange={handleChange} />
        <button type="button" onClick={sendEmailAuth}>인증코드 전송</button>

        {isEmailSent && !isVerified && (
          <>
            <input
              type="text"
              placeholder="인증코드 입력"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button type="button" onClick={verifyCode}>인증 확인</button>
          </>
        )}

        {isVerified && <p>이메일 인증 완료</p>}

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          onChange={handleChange}
        />
        <p>사인 파일 업로드 (PNG)</p>
        <input
          type="file"
          name="file"
          accept="image/png"
          required
          onChange={handleChange}
        />

        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
