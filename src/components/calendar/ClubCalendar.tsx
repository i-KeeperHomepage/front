// ==============================
// ClubCalendar.tsx (동아리 일정 캘린더 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 FullCalendar 라이브러리를 활용하여
// 동아리 일정(세미나, 스터디, 행사 등)을 표시하는 UI입니다.
// 주요 기능:
// 1. events props를 받아 FullCalendar 형식으로 변환하여 출력
// 2. month/week/day 뷰 전환 가능 (FullCalendar 제공)
// 3. 한국어(koLocale) 적용
// 4. 날짜 클릭, 이벤트 클릭 시 콘솔 로그 출력 (추후 확장 가능)
//
// English Explanation:
// This component uses the FullCalendar library to display
// club schedules (seminars, study sessions, events, etc.).
// Main features:
// 1. Receives events as props and maps them to FullCalendar format
// 2. Allows switching between month/week/day views
// 3. Applies Korean locale (koLocale)
// 4. Logs dateClick and eventClick actions to console (can be extended later)

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "./ClubCalendar.module.css";

export interface ClubCalendarProps {
  // 한국어: 일정 데이터 (제목, 시작일, 종료일)
  // English: Event data (title, startDate, optional endDate)
  events?: { title: string; startDate: string; endDate?: string }[];

  // 한국어: 초기 표시 날짜 (예: "2025-09-01")
  // English: Initial display date (e.g., "2025-09-01")
  initialDate?: string;
}

export default function ClubCalendar({ events = [], initialDate }: ClubCalendarProps) {
  // 한국어: props로 받은 events를 FullCalendar 이벤트 객체 형식으로 변환
  // English: Map incoming events into FullCalendar event object format
  const mappedEvents = events.map((e) => ({
    title: e.title,
    start: e.startDate,
    end: e.endDate,
  }));

  return (
    <div className={styles.calendarWrap}>
      <FullCalendar
        // 한국어: 사용할 플러그인 (월/주/일 뷰 + 인터랙션)
        // English: Plugins (month/week/day view + interactions)
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}

        // 한국어: 기본 뷰는 월간 달력
        // English: Default view is monthly calendar
        initialView="dayGridMonth"

        // 한국어: 캘린더 상단 툴바 구성 (제목/이동 버튼/뷰 전환 버튼)
        // English: Configure header toolbar (title/nav/view switch)
        headerToolbar={{
          left: "title prev,next today",
          center: "",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        // 한국어: 한국어 로케일 적용
        // English: Apply Korean locale
        locale={koLocale}

        // 한국어: 현재 날짜 표시선 / English: Show now-indicator
        nowIndicator={true}

        // 한국어: 높이 자동 조정 / English: Auto-adjust height
        height="auto"

        // 한국어: 주 시작 요일 (0 = 일요일)
        // English: Week starts on Sunday (0)
        firstDay={0}

        // 한국어: 요일 헤더 짧게 표시 (일, 월, 화...)
        // English: Display short weekday names (Sun, Mon, Tue...)
        dayHeaderFormat={{ weekday: "short" }}

        // 한국어: 초기 표시 날짜 (없으면 오늘 기준)
        // English: Initial display date (defaults to today if not provided)
        initialDate={initialDate}

        // 한국어: 변환된 이벤트 전달
        // English: Pass mapped events
        events={mappedEvents}

        // 한국어: 날짜 클릭 시 콘솔 출력
        // English: Log date click action
        dateClick={(info) => console.log("dateClick:", info.dateStr)}

        // 한국어: 이벤트 클릭 시 콘솔 출력
        // English: Log event click action
        eventClick={(info) => console.log("eventClick:", info.event)}
      />
    </div>
  );
}
