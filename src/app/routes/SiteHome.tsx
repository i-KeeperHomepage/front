import { useEffect, useState } from "react";
import ClubCalendar from "@/components/calendar/ClubCalendar";
import PostTable from "@/components/postable/PostTable";
import styles from "./SiteHome.module.css";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";

export default function SiteHome() {
  // 데모 이벤트 (백엔드 붙기 전 임시)
  const demo = [
    { title: "키퍼 세미나", startDate: "2025-10-02" },
    { title: "스터디", startDate: "2025-09-14", endDate: "2025-09-19" },
    //end는 마감이 18일까지면 19일로 표기해야함
  ];
  const [posts, setPosts] = useState<DemoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // ✅ 데모 데이터 사용
    setPosts(demoPosts);
    setLoading(false);

    // ✅ 나중에 백엔드 연결
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

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className={`site-container ${styles.home}`}>
      {/* 소개 영역 */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          ....................
        </p>
      </div>

      {/* 일정 + 공지 나란히 */}
      <div className={styles.section}>
        <h3 className={styles.subTitle}>일정</h3>
        <div className={styles.contentRow}>
          {/* 캘린더 */}
          <div className={styles.calendarBox}>
            <ClubCalendar events={demo} />
          </div>

          {/* 공지 미리보기 */}
          <div className={styles.noticeBox}>
            <PostTable
              posts={posts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={5}
              basePath="/notice"
              title="공지사항"
              showWriteButton = {false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}