import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    email: "",
    year: "",
    password: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);

    // 나중에 백엔드 연동
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
        if (!res.ok) throw new Error("회원가입 실패");
        navigate("/login");
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
