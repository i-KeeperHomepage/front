import DataTable from "@/components/dataTable/DataTable";

export default function Cleaning() {
  const columns = [
    { key: "date", label: "날짜" },
    { key: "userId", label: "이름" },
    
  ];

  const data = [
    {  date: "2025-09-25" , userId: "user01, user02"},
    {  date: "2025-09-30", userId: "user02" },
  ];

  return <DataTable columns={columns} data={data} title="청소 관리" />;
}
