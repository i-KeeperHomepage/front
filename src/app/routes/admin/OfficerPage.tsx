// ==============================
// 임원진 전용 페이지 (OfficerPage.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리 임원진만 접근할 수 있는 관리자 페이지입니다.
// 주요 기능:
// 1. 공지 작성 버튼 (공지 등록 페이지로 연결 예정)
// 2. 회원 목록 표시 (데모 데이터 사용 중, 추후 백엔드와 연동)
// 3. 회원 권한 변경 (일반 회원 <-> 임원진)
// 4. 회원 삭제 기능
// 현재는 데모 데이터로 작동하며, 나중에 fetch API를 주석 해제하면 서버와 연결됩니다.
//
// English Explanation:
// This component is an admin page only accessible to officers.
// Main features:
// 1. "Write Notice" button (will connect to notice posting page later)
// 2. Display member list (currently demo data, will connect to backend later)
// 3. Toggle member roles (member <-> officer)
// 4. Delete members
// Currently works with demo data. Later, uncomment the fetch API code to connect with the backend.
//

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OfficerPage.module.css";

// 한국어: 회원(Member) 타입 정의 (id, 이름, 학번, 전공, 이메일, 권한)
// English: Member type definition (id, name, studentId, major, email, role)
interface Member {
  id: number;
  name: string;
  studentId: string;
  major: string;
  email: string;
  role: string; // "member" or "officer"
}

export default function OfficerPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 한국어: 나중에 백엔드와 연결될 fetch API (현재 주석 처리됨)
    // English: Backend fetch API (commented out for now)
    fetch("/api/admin/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.users.map((u: any) => ({
          id: u.id,
          name: u.name,
          studentId: u.studentId ?? "-",
          major: u.major ?? "-",
          email: u.email,
          role: u.role?.name || "member",
        }));
        setMembers(mapped);
      })
      .catch(console.error);
  }, []);

  // ===========================
  // 권한 변경 함수
  // ===========================
  //
  // 한국어:
  // 선택한 회원의 권한을 member <-> officer 로 전환합니다.
  // 추후에는 PATCH API 요청을 통해 DB에도 반영할 수 있습니다.
  //
  // English:
  // Toggle the role of a selected member between "member" and "officer".
  // Later, this will also send a PATCH API request to update the database.
  const handleRoleToggle = async (id: number) => {
    if (!window.confirm("정말로 이 회원의 권한을 변경하시겠습니까?")) return;

    const target = members.find((m) => m.id === id);
    if (!target) return;

    const newRole = target.role === "member" ? "officer" : "member";

    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );

    alert(`${target.name}님의 권한이 ${newRole === "officer" ? "임원진" : "일반 회원"}으로 변경되었습니다.`);

    // 백엔드 연동 시
    try {
      const res = await fetch(`/api/members/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("서버 응답 오류");
    } catch (err) {
      console.error("권한 변경 실패:", err);
      alert("서버와의 통신 중 오류가 발생했습니다.");
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, role: target.role } : m))
      );
    }

  };

  // ===========================
  // 회원 삭제 함수
  // ===========================
  //
  // 한국어:
  // confirm 창을 통해 삭제 여부를 묻고, 확인 시 회원 목록에서 제거합니다.
  // 추후 DELETE API 요청을 통해 서버 DB에서도 삭제하도록 변경할 수 있습니다.
  //
  // English:
  // Ask for confirmation using a confirm dialog, and if confirmed,
  // remove the member from the list.
  // Later, you can add a DELETE API request to remove from the backend DB.
  const handleDelete = async (id: number) => {
    if (!window.confirm("정말로 이 회원을 삭제하시겠습니까?")) return;

    const target = members.find((m) => m.id === id);
    if (!target) return;

    setMembers((prev) => prev.filter((m) => m.id !== id));

    // 백엔드 연결 시
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
    } catch (err) {
      console.error("회원 삭제 실패:", err);
      alert("서버 통신 중 오류가 발생했습니다.");
      setMembers((prev) => [...prev, target]);
    }
  };

  // ===========================
  // 렌더링 영역
  // ===========================
  //
  // 한국어:
  // - 공지 작성 버튼
  // - 회원 관리 테이블 (이름, 학번, 전공, 이메일, 권한, 관리 버튼)
  //
  // English:
  // - "Write Notice" button
  // - Member management table (name, student ID, major, email, role, management buttons)
  return (
    <section className={`site-container ${styles.officerPage}`}>
      <h2 className={styles.title}>임원진 페이지</h2>

       {/* 공지 작성 버튼 / Notice Write Button */}
      <div className={styles.actions}>
        <button
          className={styles.noticeBtn}
          onClick={() => navigate("/notice/write")} // 버튼 클릭 시 이동
        >
          공지 작성
        </button>
      </div>

      {/* 회원 관리 테이블 / Member Management Table */}
      <h3 className={styles.subTitle}>회원 관리</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>전공</th>
            <th>이메일</th>
            <th>권한</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.studentId}</td>
              <td>{m.major}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td>
                <button
                  className={styles.manageBtn}
                  onClick={() => handleRoleToggle(m.id)}
                >
                  권한변경
                </button>
                <button
                  className={styles.manageBtn}
                  onClick={() => handleDelete(m.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
