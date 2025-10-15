// ==============================
// 회비 관리 페이지 (Fee.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리 회비 관리 페이지를 담당합니다.
// 재사용 가능한 DataTable 컴포넌트를 활용하여 회비 납부 현황을 테이블 형식으로 출력합니다.
// 주요 기능:
// 1. 회비 관리에 필요한 컬럼 정의 (사용자, 금액, 연도, 날짜, 상태, 납부일시)
// 2. 예시 데이터(data)를 통해 납부/미납 여부 확인 가능
// 3. DataTable 컴포넌트를 호출하면서 columns, data, title을 props로 전달
//
// English Explanation:
// This component represents the club fee management page.
// It uses a reusable DataTable component to display fee payment records in a table format.
// Main features:
// 1. Define the required table columns (user, amount, year, date, status, payment time)
// 2. Provide mock data to demonstrate paid/unpaid status
// 3. Pass columns, data, and title props to the DataTable component

import { useEffect, useState } from "react";
import DataTable from "@/components/dataTable/DataTable";

export default function Fee() {
  // 한국어: 테이블의 컬럼 정의 (key는 데이터의 속성명, label은 테이블 헤더에 표시될 이름)
  // English: Define table columns (key = data field, label = table header name)
  const columns = [
    { key: "userId", label: "이름" },
    { key: "amount", label: "금액" },
    { key: "year", label: "연도" },
    { key: "date", label: "날짜" },
    { key: "status", label: "내역" },
    { key: "paidAt", label: "납부일시" },
  ];

  // 한국어: 예시 데이터 (나중에 백엔드 API 연동 시 교체 예정)
  // English: Example data (to be replaced with backend API later)
  const [data, setData] = useState([]);

  // 백엔드 연동 
  // 한국어: 나중에 백엔드 서버에서 회비 납부 데이터를 가져오기 위해 사용
  // English: Later, this will fetch fee payment data from the backend
  
  useEffect(() => {
    fetch("/api/fees")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("loading fail:", err));
  }, []);

  // 한국어: DataTable 컴포넌트 호출
  // English: Render DataTable component
  return <DataTable columns={columns} data={data} title="Fee" />;
}
