// ==============================
// ClubCalendar.tsx (월 전용 동아리 일정 캘린더, 백엔드 연동 버전)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 FullCalendar를 사용해 동아리의 일정(세미나, 스터디, 행사 등)을 월간 달력으로 표시합니다.
// props로 일정 데이터를 받지 않고, 백엔드 API(`/api/events`)로부터 데이터를 자동으로 불러옵니다.
// 또한 공공데이터포털 공휴일 API를 연동하여 공휴일을 표시합니다.
//
// English Explanation:
// Displays club schedules (seminars, study sessions, events, etc.) using FullCalendar in month view.
// Events are fetched from the backend API (`/api/events`) automatically.
// Also fetches public holidays via the Korean Open API.

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "./ClubCalendar.module.css";

// ==============================
// 일정(Event) 타입 정의 / Define Event type
// ==============================
interface ClubEvent {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
}

// ==============================
// 공휴일 타입 정의 / Define Holiday type
// ==============================
interface HolidayItem {
  locdate: number;
  dateName: string;
  isHoliday: string;
}

// ==============================
// 날짜 포맷 함수
// ==============================
function formatLocdate(locdate: string) {
  return `${locdate.slice(0, 4)}-${locdate.slice(4, 6)}-${locdate.slice(6, 8)}`;
}

// ==============================
// 공휴일 가져오기 함수
// ==============================
async function fetchHolidays(year: number): Promise<Record<string, string>> {
  const serviceKey = "여기에_발급받은_serviceKey"; // 실제 발급받은 API 키 입력 필요
  const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${encodeURIComponent(
    serviceKey
  )}&solYear=${year}&numOfRows=100&pageNo=1&_type=json`;

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
export default function ClubCalendar() {
  const [clubEvents, setClubEvents] = useState<ClubEvent[]>([]);
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // 백엔드에서 일정 불러오기
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");

        const data = await res.json();

        // 백엔드 데이터를 ClubEvent 형식으로 매핑
        const mapped: ClubEvent[] = (data.events || []).map((e: any) => ({
          id: e.id,
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate ?? undefined,
        }));

        setClubEvents(mapped);
      } catch (err) {
        console.error("동아리 일정 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();

    // 공휴일도 같이 불러오기
    const year = new Date().getFullYear();
    fetchHolidays(year).then(setHolidays);
  }, []);

  // 이벤트 데이터 매핑
  const mappedEvents: EventInput[] = clubEvents.map((e) => ({
    title: e.title,
    start: e.startDate,
    end: e.endDate ?? undefined,
  }));

  // 공휴일 이벤트 매핑
  const holidayEvents: EventInput[] = Object.entries(holidays).map(([date, name]) => ({
    title: name,
    start: date,
    allDay: true,
    className: "holiday-event",
    display: "auto",
  }));

  // 공휴일 날짜 스타일 적용
  useEffect(() => {
    const dayCells = document.querySelectorAll(".fc-daygrid-day");
    dayCells.forEach((cell) => {
      const dateStr = cell.getAttribute("data-date");
      if (dateStr && holidays[dateStr]) {
        cell.classList.add("is-holiday");
        cell.setAttribute("title", holidays[dateStr]);
      }
    });
  }, [holidays]);

  if (loading) return <p>일정 불러오는 중...</p>;

  return (
    <div className={styles.calendarWrap}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: undefined,
        }}
        locale={koLocale}
        nowIndicator={true}
        height="auto"
        firstDay={0}
        dayHeaderFormat={{ weekday: "short" }}
        events={[...mappedEvents, ...holidayEvents]}
        dateClick={(info) => console.log("dateClick:", info.dateStr)}
        eventClick={(info) => console.log("eventClick:", info.event.title)}
        eventContent={(arg) => {
          if (arg.event.classNames.includes("holiday-event")) {
            return <span className="holiday-event">{arg.event.title}</span>;
          }
          return <span>{arg.event.title}</span>;
        }}
      />
    </div>
  );
}
