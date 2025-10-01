// ==============================
// 도서 관리 페이지 (Library.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리 내 도서 관리 페이지를 담당합니다.
// 책 제목, 저자, 출판사, ISBN, 책장 번호, 반납 예정일을 테이블 형식으로 보여줍니다.
// DataTable 컴포넌트를 재사용하여 간단하게 구성합니다.
// 
// 주요 기능:
// 1. columns 배열에 테이블의 컬럼 정의 (key: 데이터 키, label: 표시 이름)
// 2. data 배열에 실제 데이터 정의 (추후 백엔드 연동으로 대체 가능)
// 3. DataTable 컴포넌트에 props로 전달하여 테이블 렌더링
//
// English Explanation:
// This component is responsible for the library management page inside the club.
// It displays book title, author, publisher, ISBN, shelf number, and due date in a table format.
// It reuses the DataTable component for easy rendering.
// 
// Main features:
// 1. Define table columns in the `columns` array (key: data key, label: display name)
// 2. Define actual data in the `data` array (can be replaced with backend data later)
// 3. Pass columns and data as props to the DataTable component for rendering

import DataTable from "@/components/dataTable/DataTable";

export default function Library() {
  // 한국어: 테이블 컬럼 정의
  // English: Define table columns
  const columns = [
    { key: "title", label: "책 제목" },       // Book Title
    { key: "author", label: "저자" },         // Author
    { key: "publisher", label: "출판사" },    // Publisher
    { key: "isbn", label: "ISBN" },           // ISBN
    { key: "shelf", label: "책장 번호" },     // Shelf Number
    { key: "dueDate", label: "반납 예정일" }, // Due Date
  ];

  // 한국어: 도서 데이터 (샘플)
  // English: Sample book data
  const data = [
    {
      title: "해킹의 기술",         // Book title
      author: "홍길동",            // Author
      publisher: "보안출판사",      // Publisher
      isbn: "978-1234567890",     // ISBN
      shelf: "A-12",              // Shelf number
      dueDate: "2025-10-10",      // Due date
    },
    {
      title: "정보보호 개론",       // Book title
      author: "이몽룡",            // Author
      publisher: "ITBooks",       // Publisher
      isbn: "978-0987654321",     // ISBN
      shelf: "B-07",              // Shelf number
      dueDate: "2025-11-01",      // Due date
    },
  ];

  // 한국어: DataTable 컴포넌트로 렌더링
  // English: Render with DataTable component
  return <DataTable columns={columns} data={data} title="Library" />;
}
