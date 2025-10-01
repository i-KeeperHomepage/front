// ==============================
// DataTable.tsx (범용 데이터 테이블 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 컬럼 정의(columns)와 데이터(data)를 받아서 표 형태로 렌더링하는 범용 테이블 컴포넌트입니다.
// 어떤 데이터 구조든 `columns` 배열에서 key와 label을 지정해주면 그에 맞춰 데이터를 표시할 수 있습니다.
// 
// 주요 기능:
// 1. 컬럼 헤더를 동적으로 생성 (columns 배열 기반)
// 2. 데이터 행을 동적으로 생성 (data 배열 기반)
// 3. 데이터가 없을 경우 "데이터가 없습니다." 메시지 출력
// 4. title props가 있으면 상단에 제목 출력
//
// English Explanation:
// This is a reusable table component that renders tabular data using
// a given list of column definitions and data rows.
// As long as you provide `columns` with `key` and `label`, the table
// will render rows dynamically.
//
// Features:
// 1. Dynamically generate column headers (based on columns array)
// 2. Dynamically generate data rows (based on data array)
// 3. Display "No data available" when there is no data
// 4. Display table title if `title` prop is provided

import styles from "./DataTable.module.css";

// ==============================
// Column 타입 정의
// ==============================
// 한국어: 각 열의 key(데이터 접근용), label(화면에 보여줄 이름)을 정의
// English: Defines key (for accessing data) and label (for display text)
interface Column {
  key: string;      // e.g., "title", "author"
  label: string;    // e.g., "책 제목", "저자"
}

// ==============================
// DataTable Props 정의
// ==============================
// 한국어: columns, data, title을 전달받아 테이블 구성
// English: Component receives columns, data, and optional title
interface DataTableProps {
  columns: Column[];                // 테이블 헤더 정의 / Column headers
  data: Record<string, any>[];      // 실제 데이터 / Data rows
  title?: string;                   // 테이블 제목 (선택) / Optional table title
}

// ==============================
// DataTable 컴포넌트
// ==============================
// 한국어: 범용 테이블을 출력하는 컴포넌트
// English: Reusable DataTable component
export default function DataTable({ columns, data, title }: DataTableProps) {
  return (
    <div className={styles.wrapper}>
      {/* 테이블 제목 / Table Title */}
      {title && <h2 className={styles.title}>{title}</h2>}

      <table className={styles.table}>
        <thead>
          <tr>
            {/* 컬럼 헤더 생성 / Render column headers */}
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 데이터가 있을 경우 → 행 생성 / If data exists → render rows */}
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            // 데이터가 없을 경우 / If no data available
            <tr>
              <td colSpan={columns.length}>데이터가 없습니다. / No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
