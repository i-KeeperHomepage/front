// ==============================
// ClubCalendar.tsx
// ==============================
//
// 한국어 설명:
// FullCalendar 기반 월간 동아리 일정 + 공공데이터포털 공휴일 표시 (Vite + Proxy 버전)
//
// English Explanation:
// FullCalendar-based monthly club calendar with Korean public holidays via Open API.
//

import type { EventInput } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import styles from "./ClubCalendar.module.css";

interface ClubEvent {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
}

interface HolidayItem {
  locdate: number;
  dateName: string;
  isHoliday: string;
}

// YYYYMMDD → YYYY-MM-DD 변환
function formatLocdate(locdate: string) {
  return `${locdate.slice(0, 4)}-${locdate.slice(4, 6)}-${locdate.slice(6, 8)}`;
}

// 공휴일 API 요청 함수 (프록시 경유)
async function fetchHolidays(year: number): Promise<Record<string, string>> {
  const key = import.meta.env.VITE_HOLIDAY_API_KEY;
  const url = `/openapi/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${key}&solYear=${year}&numOfRows=100&_type=json`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("공휴일 API 요청 실패");
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

export default function ClubCalendar() {
  const [clubEvents, setClubEvents] = useState<ClubEvent[]>([]);
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
        const data = await res.json();

        const mapped: ClubEvent[] = (data.events || []).map((e: any) => ({
          id: e.id,
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate ?? undefined,
        }));
        setClubEvents(mapped);

        const year = new Date().getFullYear();
        const holidayData = await fetchHolidays(year);
        setHolidays(holidayData);
      } catch (err: any) {
        console.error("데이터 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const clubEventInputs: EventInput[] = clubEvents.map((e) => ({
    title: e.title,
    start: e.startDate,
    end: e.endDate ?? undefined,
  }));

  const holidayEventInputs: EventInput[] = Object.entries(holidays).map(
    ([date, name]) => ({
      title: name,
      start: date,
      allDay: true,
      className: "holiday-event",
      display: "auto",
    })
  );

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.calendarWrap}>
        <p style={{ color: "red" }}>데이터 로드 중 오류 발생: {error}</p>
      </div>
    );
  }

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
        events={[...clubEventInputs, ...holidayEventInputs]}
        dateClick={(info) => console.log("dateClick:", info.dateStr)}
        eventClick={(info) => console.log("eventClick:", info.event.title)}
        eventContent={(arg) => {
          if (arg.event.classNames.includes("holiday-event")) {
            return <span className="holiday-event">{arg.event.title}</span>;
          }
          return <span>{arg.event.title}</span>;
        }}
      />

      <style>{`
        .holiday-event {
          color: red !important;
          font-weight: 600;
        }
        .is-holiday {
          background-color: #fff1f1 !important;
        }
      `}</style>
    </div>
  );
}
