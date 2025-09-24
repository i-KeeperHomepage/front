import ClubCalendar from "@/components/calendar/ClubCalendar";
import styles from "./SiteHome.module.css";

export default function SiteHome() {
  // 데모 이벤트 (백엔드 붙기 전 임시)
  const demo = [
    { title: "키퍼 세미나", startDate: "2025-10-02" },
    { title: "스터디", startDate: "2025-09-14", endDate: "2025-09-19" },
    //end는 마감이 18일까지면 19일로 표기해야함
  ];

  return (
    <section className={`site_container ${styles.headerInner}`}>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          .....................
        </p>
      </div>

      {/* 섹션 타이틀 */}
      <h3 className={styles.subTitle}>일정</h3>

      {/* 캘린더 컴포넌트 */}
      <ClubCalendar events={demo} />
    </section>
  );
}
