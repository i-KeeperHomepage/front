// ==============================
// SiteHome.tsx (홈 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 홈페이지 메인 화면입니다.
// 주요 구성:
// 1. 동아리 소개 (Hero Section)
// 2. 일정(Calendar) → ClubCalendar 컴포넌트 사용
// 3. 공지 미리보기(Notice Preview) → PostTable 컴포넌트 사용
//
// English Explanation:
// This component is the homepage (main screen).
// Main sections:
// 1. Club introduction (Hero Section)
// 2. Schedule (Calendar) → using ClubCalendar component
// 3. Notice preview → using PostTable component

import { useEffect, useState } from "react";
import ClubCalendar from "@/components/calendar/ClubCalendar";
import PostTable from "@/components/postable/PostTable";
import styles from "./SiteHome.module.css";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";

export default function SiteHome() {
  // 한국어: 데모 이벤트 데이터 (백엔드 연결 전 임시 사용)
  // English: Demo event data (temporary, before backend integration)
  const demo = [
    { title: "키퍼 세미나", startDate: "2025-10-02" },
    { title: "스터디", startDate: "2025-09-14", endDate: "2025-09-19" },
    // 한국어: end 값은 마지막 날 +1로 표기 필요
    // English: The `end` value should be last day +1
  ];

  // 한국어: 상태값 - 공지글(Post) 관리
  // English: State - manage notice posts
  const [posts, setPosts] = useState<DemoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 한국어: 데모 데이터 사용
    // English: Use demo data
    setPosts(demoPosts);
    setLoading(false);

    // 한국어: 백엔드 연결 시 사용
    // English: For backend integration
    /*
    async function fetchNotice() {
      try {
        const res = await fetch("/api/posts?category=notice&page=1&limit=5");
        const data = await res.json();

        const mapped: DemoPost[] = data.items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "공지",
          title: p.title,
          author: p.author?.name || "관리자",
          createdAt: p.createdAt,
          content: p.content,
          image: p.imageUrl,
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("공지 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotice();
    */
  }, []);

  if (loading) return <p>불러오는 중...</p>; // Loading 상태 표시 / Show loading state

  return (
    <section className={`site-container ${styles.home}`}>
      {/* 한국어: 동아리 소개 영역 / English: Club introduction section */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          ....................
        </p>
      </div>

      {/* 한국어: 일정 + 공지 미리보기 레이아웃 / English: Schedule + Notice preview layout */}
      <div className={styles.section}>
        <div className={styles.contentRow}>
          {/* 한국어: 일정 캘린더 / English: Schedule calendar */}
          <div className={styles.calendarBox}>
            <ClubCalendar events={demo} />
          </div>

          {/* 한국어: 공지 미리보기 / English: Notice preview */}
          <div className={styles.noticeBox}>
            <PostTable
              posts={posts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={5}
              basePath="/notice"
              title="Notice"
              showWriteButton={false} // 한국어: 공지 작성 버튼 숨김 / English: Hide notice write button
            />
          </div>
        </div>
      </div>
    </section>
  );
}
