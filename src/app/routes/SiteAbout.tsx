// ==============================
// SiteAbout.tsx (동아리 소개 페이지)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 동아리 소개(About) 페이지입니다.
// 주요 구성:
// 1. 동아리 소개 텍스트와 로고
// 2. 현재 임원진(회원 리스트): 이름, 학년/전공, 소개글, 프로필 이미지
// 3. 동아리 위치 지도 (카카오맵 API 활용)
//
// English Explanation:
// This component represents the club introduction (About) page.
// Main sections:
// 1. Club introduction text and logo
// 2. Current officers (member list): name, year/major, description, profile image
// 3. Club location map (using Kakao Map API)

import KakaoMap from "@/components/map/KakaoMap";
import styles from "./SiteAbout.module.css";

export default function SiteAbout() {
  // 한국어: 현재 임원진 데이터 (이름, 학번/전공, 설명, 이미지)
  // English: Current officers data (name, year/major, description, image)
  const members = [
    {
      name: "너구리",
      info: "(3학년, 컴퓨터공학전공)",
      desc: (
        <>
          출석을 왜함 어차피 교수가 출석가지고 뭐라 안함, 네?<br />
          그랬구나 또 말을 듣고싶었구나<br />
          지금 수업을 듣는다고 지금의 저보다 많이 벌까요?(현재 재산: 1조 4040억원)<br />
          어이가 없다에요
        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "김신",
      info: "(3학년, 컴퓨터공학전공)",
      desc: <>나 배드민턴 치고싶어 저 그냥 연구실 사람이라 건들 노노 건들면 물어버림</>,
      img: "/img/sieun.png",
    },
    {
      name: "소현",
      info: "(2학년, 컴퓨터공학과)",
      desc: "설명글이 들어갑니다. 동아리에서의 역할과 주요 활동 내용...",
      img: "/img/member3.jpg",
    },
  ];

  return (
    <section className={`site-container ${styles.about}`}>
      {/* 한국어: 동아리 소개 영역 / English: Club introduction section */}
      <div className={styles.intro}>
        <img
          src="/img/i-Keeper_logo(white, name).jpg"
          alt="i-Keeper"
          className={styles.logo}
        />
        <div>
          <p className={styles.desc}>
            소프트웨어 개발 & 보안 동아리 'i-Keeper'는 대구가톨릭대학교 소프트웨어융합대학 소속으로,<br />
            '교육의 선순환'이라는 모토 아래 학교 내외 학우들이 지식을 공유하고 성장할 수 있는 기회를 마련하고자 2002년 9월 처음 설립되었습니다.<br />
            멘토링 및 프로젝트, 세미나 등 다양한 활동을 통해 꾸준한 배움을 추구합니다.
          </p>
        </div>
      </div>

      {/* 한국어: 현재 임원진 소개 / English: Current officers */}
      <h3 className={styles.sectionTitle}>임원진</h3>
      <div className={styles.members}>
        {members.map((m, idx) => (
          <div key={idx} className={styles.card}>
            <img src={m.img} alt={m.name} className={styles.memberImg} />
            <h4 className={styles.memberName}>
              {m.name} <span>{m.info}</span>
            </h4>
            <p className={styles.memberDesc}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* 한국어: 지도 + 주소 / English: Map + Address */}
      <div className={styles.mapSection}>
        {/* 한국어: 카카오맵 컴포넌트 / English: Kakao Map component */}
        <KakaoMap lat={35.9135} lng={128.8091} level={3} />
        <div className={styles.address}>
          <h4>i-Keeper</h4>
          <p>경북 경산시 하양읍 하양로 13-13</p>
          <p>대구가톨릭대학교 공학관 D2-509</p>
          {/* 한국어: 아래의 점(.)은 공간 확보용 / English: The dots (.) below are just placeholders for spacing */}
          <p>.</p><br />
          <p>.</p><br />
          <p>.</p><br />
          <p>.</p><br />
        </div>
      </div>
    </section>
  );
}
