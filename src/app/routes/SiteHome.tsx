// ==============================
// SiteHome.tsx (홈 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 홈페이지 메인 화면입니다.
// 주요 구성:
// 1. 동아리 소개 (Hero Section)
// 2. 일정(Calendar) → ClubCalendar (자체 fetch)
// 3. 공지 미리보기 → PostTable (부모에서 fetch 후 전달)
//
// English:
// Home page with hero, calendar, and notice preview.

import ClubCalendar from "@/components/calendar/ClubCalendar";
import Loading from "@/components/common/Loading";
import type { PostRow } from "@/components/postable/PostTable";
import PostTable from "@/components/postable/PostTable";
import { useEffect, useState } from "react";
import styles from "./SiteHome.module.css";

const PAGE_LIMIT = 5;

export default function SiteHome() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const role = localStorage.getItem("role");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/posts?categoryId=1&page=${currentPage}&limit=${PAGE_LIMIT}`
        );
        if (!res.ok) throw new Error("공지 데이터를 불러오지 못했습니다.");

        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : data;

        const mapped: PostRow[] = items.posts.map((p: any) => ({
          id: p.id,
          category: p.category?.name ?? "공지",
          title: p.title ?? "제목 없음",
          author: p.author?.name ?? "관리자",
          createdAt: p.createdAt ?? "",
          content: p.content ?? "",
          image: p.imageUrl,
        }));

        setPosts(mapped);

        const headerCount = res.headers.get("X-Total-Count");
        const totalCount = headerCount
          ? Number(headerCount)
          : Number(data.totalCount ?? 0);
        const pages =
          totalCount > 0
            ? Math.max(1, Math.ceil(totalCount / PAGE_LIMIT))
            : Math.max(1, Math.ceil(items.length / PAGE_LIMIT));
        setTotalPages(pages);
      } catch (e: any) {
        setError(e.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);

  if (loading) return <Loading />;

  return (
    <section className={`site-container ${styles.home}`}>
      {/* 동아리 소개 */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          소프트웨어 개발 & 보안 동아리 'i-Keeper'는 2002년에 설립되어,
          대구가톨릭대학교 소프트웨어융합대학 소속으로 활동하고 있습니다.
          <br />
          다양한 프로젝트, 세미나, 멘토링을 통해 함께 배우고 성장하는 개발자
          커뮤니티입니다.
        </p>
      </div>

      {/* 일정 + 공지 미리보기 */}
      <div className={styles.section}>
        <div className={styles.contentRow}>
          {/* 일정 캘린더: props 없이 사용 */}
          <div className={styles.calendarBox}>
            <ClubCalendar />
          </div>

          {/* 공지 미리보기 */}
          <div className={styles.noticeBox}>
            <PostTable
              posts={posts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              basePath="/notice"
              title="Notice"
              showWriteButton={role === "officer"}
              error={error}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
