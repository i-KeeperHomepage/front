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

// 게시글 타입 정의
interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image?: string;
}

// 일정 데이터 타입 정의
interface Event {
  title: string;
  startDate: string;
  endDate?: string;
}

export default function SiteHome() {
  // 한국어: 상태값 - 공지글(Post) 및 일정(Event) 관리
  // English: State - manage notice posts and calendar events
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 한국어: 로그인한 사용자의 role 확인 (localStorage에서 가져옴)
  // English: Get logged-in user role from localStorage
  const role = localStorage.getItem("role");

  // ==============================
  // 공지 & 일정 데이터 백엔드에서 불러오기
  // ==============================
  useEffect(() => {
    async function fetchData() {
      try {
        // 1️⃣ 공지 데이터 불러오기
        const noticeRes = await fetch(`/api/posts?category=notice&page=${currentPage}&limit=5`);
        if (!noticeRes.ok) throw new Error("공지 데이터를 불러오지 못했습니다.");
        const noticeData = await noticeRes.json();

        const mappedPosts: Post[] = noticeData.items.map((p: any) => ({
          id: p.id,
          category: p.category?.name || "공지",
          title: p.title,
          author: p.author?.name || "관리자",
          createdAt: p.createdAt,
          content: p.content,
          image: p.imageUrl,
        }));

        setPosts(mappedPosts);

        // 2️⃣ 일정 데이터 불러오기
        const eventRes = await fetch("/api/events");
        if (!eventRes.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
        const eventData = await eventRes.json();

        const mappedEvents: Event[] = eventData.map((e: any) => ({
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate,
        }));

        setEvents(mappedEvents);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  if (loading) return <p>불러오는 중...</p>; // Loading 상태 표시 / Show loading state

  return (
    <section className={`site-container ${styles.home}`}>
      {/* 한국어: 동아리 소개 영역 / English: Club introduction section */}
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>우리 동아리에 대하여</h2>
        <p className={styles.heroText}>
          소프트웨어 개발 & 보안 동아리 'i-Keeper'는 2002년에 설립되어,
          대구가톨릭대학교 소프트웨어융합대학 소속으로 활동하고 있습니다.
          <br />
          다양한 프로젝트, 세미나, 멘토링을 통해 함께 배우고 성장하는 개발자 커뮤니티입니다.
        </p>
      </div>

      {/* 한국어: 일정 + 공지 미리보기 레이아웃 / English: Schedule + Notice preview layout */}
      <div className={styles.section}>
        <div className={styles.contentRow}>
          {/* 한국어: 일정 캘린더 / English: Schedule calendar */}
          <div className={styles.calendarBox}>
            <ClubCalendar events={events} />
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
              // 한국어: officer 권한일 때만 글쓰기 버튼 노출
              // English: Only show write button for officer role
              showWriteButton={role === "officer"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
