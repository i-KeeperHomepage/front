import ClubCalendar from "@/components/calendar/ClubCalendar";
import styles from "./SiteHome.module.css";

export default function SiteHome() {
  // 데모 이벤트 (백엔드 붙기 전 임시)
  const demo = [
    { title: "키퍼 세미나", start: "2025-10-02" },
    { title: "스터디", start: "2025-09-14", end: "2025-09-19" },
    //end는 마감이 18일까지면 19일로 표기해야함
  ];

  return (
    <section className={`site_container ${styles.headerInner}`}>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          SW & 정보보안 동아리 <strong>i-Keeper</strong>는 교육의 선순환이라는 모토 아래,
          학과 내외의 학우들이 지식을 나누고 성장할 수 있는 장을 마련하고자 설립되었습니다.
          세미나, 프로젝트, 멘토링 등 다양한 활동을 통해 꾸준히 배움을 추구합니다.
        </p>
      </div>

      {/* 섹션 타이틀 */}
      <h3 className={styles.subTitle}>일정</h3>

      {/* 캘린더 컴포넌트 */}
      <ClubCalendar events={demo} />
    </section>
  );
}
