// ==============================
// 청소 관리 페이지 (Cleaning.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리 청소 관리 페이지를 담당합니다.
// 재사용 가능한 DataTable 컴포넌트를 활용하여 테이블 형식으로 데이터를 출력합니다.
// 주요 기능:
// 1. DataTable에 전달할 컬럼 정의 (날짜, 사용자 ID/이름)
// 2. 예시 데이터(data) 제공 (추후 백엔드 연동 시 교체 예정)
// 3. DataTable 컴포넌트를 호출하면서 columns, data, title을 props로 전달
//
// English Explanation:
// This component represents the club cleaning management page.
// It uses a reusable DataTable component to display data in a table format.
// Main features:
// 1. Define the table columns (date, user ID/name)
// 2. Provide example data (to be replaced with backend data later)
// 3. Pass columns, data, and title props to the DataTable component

import DataTable from "@/components/dataTable/DataTable";
import { useEffect, useState } from "react";

export default function Cleaning() {
  // 한국어: 테이블의 컬럼 정의 (key는 데이터의 속성명, label은 테이블 헤더에 표시될 이름)
  // English: Define table columns (key = data field, label = table header name)
  const columns = [
    { key: "date", label: "날짜" },
    { key: "userName", label: "이름" },
  ];

  // 한국어: 실제 표시할 데이터 (현재는 예시 데이터, 추후 백엔드에서 가져올 예정)
  // English: Table data (currently mock data, will be fetched from backend later)
  const [data, setData] = useState<{ date: string; userName: string }[]>([]);

  // 백엔드 연동
  // 한국어: 나중에 백엔드 서버에서 청소 일정 데이터를 가져오기 위해 사용
  // English: Later, this will fetch cleaning schedule data from backend
  useEffect(() => {
    fetch("/api/cleanings", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("서버 응답 오류");
        return res.json();
      })
      .then((result) => {
        // API 응답 구조를 테이블에 맞게 매핑
        const mapped = result.cleanings.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString("ko-KR"),
          userName:
            item.assignedUsers && item.assignedUsers.length > 0
              ? item.assignedUsers.map((u: any) => u.name).join(", ")
              : "배정 없음",
        }));
        setData(mapped);
      })
      .catch((err) => console.error("loading fail:", err));
  }, []);

  // 한국어: DataTable 컴포넌트 호출 (컬럼, 데이터, 제목을 전달)
  // English: Render DataTable component with columns, data, and title
  return <DataTable columns={columns} data={data} title="Clean" />;
}
