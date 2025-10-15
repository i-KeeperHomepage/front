// ==============================
// ClubCalendar.tsx (월 전용 동아리 일정 캘린더, TypeScript 호환)
// ==============================
//
// 한국어: FullCalendar를 사용하여 동아리 일정(세미나, 스터디, 행사 등)을 월간 달력으로 표시합니다.
// 주/일 뷰 관련 설정은 제거하여 월만 보여줍니다.
// TypeScript 환경에서 타입 에러 없이 동작하도록 설정합니다.
//
// English: Displays club schedules (seminars, study sessions, events, etc.) in a monthly calendar
// using FullCalendar. Week/day views are removed to show only month view.
// This version is fully TypeScript compatible.

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {EventInput} from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "./ClubCalendar.module.css";

// ==============================
// Props Interface / 프롭 인터페이스 정의
// ==============================
export interface ClubCalendarProps {
  /** 한국어: 일정 데이터 (제목, 시작일, 종료일)
   *  English: Event data (title, startDate, optional endDate)
   */
  events?: { title: string; startDate: string; endDate?: string }[];

  /** 한국어: 초기 표시 날짜 (예: "2025-09-01")
   *  English: Initial display date (e.g., "2025-09-01")
   */
  initialDate?: string | Date;
}

// ==============================
// 공휴일 타입 정의
// ==============================
interface HolidayItem {
  locdate: number;     // 예: "20251003"
  dateName: string;    // 예: "개천절"
  isHoliday: string;   // 예: "Y" 또는 "N"
}

// ==============================
// 날짜 포맷 함수
// ==============================
function formatLocdate(locdate: string) {
  // "20250101" → "2025-01-01"
  return `${locdate.slice(0, 4)}-${locdate.slice(4, 6)}-${locdate.slice(6, 8)}`;
}

// ==============================
// 공휴일 가져오기 함수
// ==============================
async function fetchHolidays(year: number): Promise<Record<string, string>> {
  const serviceKey = "여기에_발급받은_serviceKey";
  const numOfRows = 100;
  const pageNo = 1;

  const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${encodeURIComponent(
    serviceKey
  )}&solYear=${year}&numOfRows=${numOfRows}&pageNo=${pageNo}&_type=json`;

  try {
    const resp = await fetch(url);
    const json = await resp.json();

    const items = json.response?.body?.items?.item as
      | HolidayItem[]
      | HolidayItem
      | undefined;

    if (!items) return {};

    const list = Array.isArray(items) ? items : [items];
    const parsed: Record<string, string> = {};

    list.forEach((it) => {
      if (it.isHoliday === "Y") {
        parsed[formatLocdate(String(it.locdate))] = it.dateName;
      }
    });

    return parsed;
  } catch (err) {
    console.error("공휴일 API 오류:", err);
    return {};
  }
}

// ==============================
// ClubCalendar 컴포넌트
// ==============================
export default function ClubCalendar({ events = [], initialDate }: ClubCalendarProps) {
  const [holidays, setHolidays] = useState<Record<string, string>>({});

  // 한국어: props로 받은 events를 FullCalendar 이벤트 객체 형식으로 변환
  // English: Map incoming events into FullCalendar event object format
  const mappedEvents: EventInput[] = events.map((e) => ({
    title: e.title,
    start: e.startDate,
    end: e.endDate ?? undefined,
  }));

  // 컴포넌트 마운트 시 공휴일 가져오기
  useEffect(() => {
    const year = initialDate ? new Date(initialDate).getFullYear() : new Date().getFullYear();
    fetchHolidays(year).then(setHolidays);
  }, [initialDate]);

  // 공휴일 이벤트 생성 (글자 표시)
  const holidayEvents: EventInput[] = Object.entries(holidays).map(([date, name]) => ({
    title: name,
    start: date,
    allDay: true,
    className: "holiday-event",
    display: "auto",
  }));

// 공휴일 날짜에 클래스 추가
useEffect(() => {
  const dayCells = document.querySelectorAll(".fc-daygrid-day");
  dayCells.forEach((cell) => {
    const dateStr = cell.getAttribute("data-date");
    if (dateStr && holidays[dateStr]) {
      cell.classList.add("is-holiday"); // CSS에서 빨간색 처리
      cell.setAttribute("title", holidays[dateStr]); // 마우스 오버 시 툴팁
    }
  });
}, [holidays]);


  return (
    <div className={styles.calendarWrap}>
      <FullCalendar
        // 한국어: 사용할 플러그인 (월간 뷰 + 클릭 이벤트)
        // English: Plugins (monthly view + click handling)
        plugins={[dayGridPlugin, interactionPlugin]}

        // 한국어: 기본 뷰 설정 (월간 달력)
        // English: Default view (month grid)
        initialView="dayGridMonth"

        // 한국어: 툴바 구성
        // English: Header toolbar configuration
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: undefined, // 월 버튼만
        }}

        // 한국어: 로케일 설정
        // English: Apply Korean locale
        locale={koLocale}

        // 한국어: 현재 날짜 표시
        // English: Show current date indicator
        nowIndicator={true}

        // 한국어: 높이 자동 조정
        // English: Auto-adjust height
        height="auto"

        // 한국어: 주 시작 요일 (일요일)
        // English: Week starts on Sunday
        firstDay={0}

        // 한국어: 요일 헤더 짧게 표시
        // English: Short weekday header
        dayHeaderFormat={{ weekday: "short" }}

        // 한국어: 초기 날짜 설정
        // English: Initial date
        initialDate={initialDate}

        // 한국어: 이벤트 리스트 전달
        // English: Pass mapped events
        events={[...mappedEvents, ...holidayEvents]}

        // 한국어: 날짜 클릭 시 콘솔 출력
        // English: Log date click
        dateClick={(info) => console.log("dateClick:", info.dateStr)}

        // 한국어: 이벤트 클릭 시 콘솔 출력
        // English: Log event click
        eventClick={(info) => console.log("eventClick:", info.event.title)}

        eventContent={(arg) => {
          // 공휴일 이벤트 글자 빨간색
          if (arg.event.classNames.includes("holiday-event")) {
            return <span className="holiday-event">{arg.event.title}</span>;
          }
          return <span>{arg.event.title}</span>;
        }}
      />
    </div>
  );
}
