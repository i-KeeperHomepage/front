import DataTable from "@/components/dataTable/DataTable";

export default function Fee() {
  const columns = [
    { key: "userId", label: "이름" },
    { key: "amount", label: "금액" },
    { key: "year", label: "연도" },
    { key: "date", label: "날짜" },
    { key: "status", label: "내역" },
    { key: "paidAt", label: "납부일시" },
  ];

  const data = [
    {
      userId: "user01",
      amount: "20,000원",
      year: "2025",
      date: "2025-09-01",
      status: "완납",
      paidAt: "2025-09-01 10:00",
    },
    {
      userId: "user02",
      amount: "20,000원",
      year: "2025",
      date: "2025-09-01",
      status: "미납",
      paidAt: "-",
    },
  ];

  return <DataTable columns={columns} data={data} title="회비 관리" />;
}
