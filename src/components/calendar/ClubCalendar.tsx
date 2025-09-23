import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "./ClubCalendar.module.css";

export interface ClubCalendarProps {
  events?: { title: string; start: string; end?: string }[];
  initialDate?: string; // "2025-09-01"
}

export default function ClubCalendar({ events = [], initialDate }: ClubCalendarProps) {
  return (
    <div className={styles.calendarWrap}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title prev,next today",
          center: "",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={koLocale}
        nowIndicator={true}
        height="auto"
        firstDay={0}
        dayHeaderFormat={{ weekday: 'short' }}
        initialDate={initialDate}
        events={events}
        dateClick={(info) => console.log("dateClick:", info.dateStr)}
        eventClick={(info) => console.log("eventClick:", info.event)}
      />
    </div>
  );
}
