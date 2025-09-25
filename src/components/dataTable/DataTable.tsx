import styles from "./DataTable.module.css";

interface Column {
  key: string;      // 데이터 키 (예: "title", "author")
  label: string;    // 화면에 보여줄 제목
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[]; // key-value 구조
  title?: string;              // 테이블 제목
}

export default function DataTable({ columns, data, title }: DataTableProps) {
  return (
    <div className={styles.wrapper}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
