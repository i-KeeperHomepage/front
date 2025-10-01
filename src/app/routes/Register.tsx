// ==============================
// Register.tsx (회원가입 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 회원가입(Register) 페이지입니다.
// 사용자는 이름, 학번, 전공, 이메일, 학년/학차, 비밀번호, 서명 이미지 파일(PNG)을 입력해야 합니다.
// 입력된 데이터는 `formData` 상태에 저장되며, 제출 시 콘솔에 출력됩니다.
// 추후 백엔드와 연결할 수 있도록 `fetch("/api/register")` 관련 코드를 주석으로 포함시켰습니다.
//
// 주요 기능:
// - useState로 입력값 관리 (문자열 및 파일)
// - handleChange: input 값이 변경될 때 상태 업데이트
// - handleSubmit: 폼 제출 시 현재 입력 데이터를 확인 (현재는 콘솔 출력)
// - FormData API 사용 준비 (백엔드 연결 시 사용)
// - 회원가입 성공 시 → 로그인 페이지로 이동 (백엔드 연동 시)
//
// English Explanation:
// This component represents the user registration (sign-up) page.
// Users must provide name, student ID, major, email, year/semester, password, and a PNG file (signature).
// Entered data is stored in `formData` state and logged to the console on submit.
// A commented `fetch("/api/register")` block is included for future backend integration.
//
// Key Features:
// - Manage input values with useState (strings + file)
// - handleChange: update state when inputs change
// - handleSubmit: logs form data (for now)
// - Prepared FormData API code (for backend connection later)
// - On success, navigate to the login page (once backend is connected)

import { useState } from "react";
import styles from "./Auth.module.css";

export default function Register() {

  // 한국어: 회원가입 입력값을 저장하는 상태
  // English: State to store registration form values
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    email: "",
    year: "",
    password: "",
    file: null as File | null, // 파일 입력 (PNG 서명)
  });

  // 한국어: input 값이 변경될 때 상태 업데이트
  // English: Update state when input values change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 한국어: 폼 제출 시 실행되는 함수
  // English: Function executed when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);

    // 한국어: 나중에 백엔드 연동 시 주석 해제
    // English: Uncomment when backend API is ready
    /*
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as Blob);
    });

    fetch("/api/register", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error("회원가입 실패"); // Registration failed
        navigate("/login"); // 성공 시 로그인 페이지로 이동
      })
      .catch(console.error);
    */
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
        <input type="password" name="password" placeholder="비밀번호" required onChange={handleChange} />
        <p>사인 파일 업로드 (PNG)</p>
        <input type="file" name="file" accept="image/png" required onChange={handleChange} />

        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
