import DataTable from "@/components/dataTable/DataTable";

export default function Library() {
  const columns = [
    { key: "title", label: "책 제목" },
    { key: "author", label: "저자" },
    { key: "publisher", label: "출판사" },
    { key: "isbn", label: "ISBN" },
    { key: "shelf", label: "책장 번호" },
    { key: "dueDate", label: "반납 예정일" },
  ];

  const data = [
    {
      title: "해킹의 기술",
      author: "홍길동",
      publisher: "보안출판사",
      isbn: "978-1234567890",
      shelf: "A-12",
      dueDate: "2025-10-10",
    },
    {
      title: "정보보호 개론",
      author: "이몽룡",
      publisher: "ITBooks",
      isbn: "978-0987654321",
      shelf: "B-07",
      dueDate: "2025-11-01",
    },
  ];

  return <DataTable columns={columns} data={data} title="도서 관리" />;
}
