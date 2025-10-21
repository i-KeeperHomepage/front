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
      name: "은은솔",
      title: "회장",
      info: "(3학년, 컴퓨터공학전공)",
      desc: (
        <>
          안녕하세요, i-Keeper 회장 은은솔입니다.<br />
          i-Keeper는 소프트웨어 개발과 보안에 관심 있는 학우들이 모여 지식을 공유하고 성장하는 동아리입니다.<br />
          다양한 프로젝트와 세미나를 통해 함께 배우고 발전해 나가길 기대합니다.
        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "김시은",
      title: "부회장",
      info: "(3학년, 컴퓨터공학전공)",
      desc: (
        <>
          안녕하세요, i-Keeper 부회장 김시은입니다.<br />
          인공지능에 관심있으신 분,,데이터 분석에 관심있으신 분 연락주세요<br />
          dil 연구실 소속. 항시대기중.
        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "이시언",
      title: "써트장",
      info: "(3학년, 컴퓨터공학전공)",
      desc: (
        <>
          서연 법인재단 산하 제약사업부 이사장<br />
          코딩하다 몸이 아프면 찾아오세요, 무료로 진료해드립니다.<br />
        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "권구준",
      title: "써트부장",
      info: "(2학년, 사이버보안전공)",
      desc: (
        <>

        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "이대근",
      title: "교육부장",
      info: "(2학년, 컴퓨터공학전공)",
      desc: (
        <>
          안녕하세요. 교육부장입니다.
        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "남우석",
      title: "장비부장",
      info: "(2학년, 사이버보안전공)",
      desc: (
        <>

        </>
      ),
      img: "/img/racoon.png",
    },
    {
      name: "이사윤",
      title: "총무",
      info: "(2학년, 컴퓨터공학전공)",
      desc: (
        <>

        </>
      ),
      img: "/img/racoon.png",
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
            <p className={styles.memberRole}>{m.title}</p>
            <p className={styles.memberDesc}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* 한국어: 지도 + 주소 / English: Map + Address */}
      <div className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <KakaoMap lat={35.913655} lng={128.802581} level={3} />
        </div>

        <div className={styles.address}>
          <h4>i-Keeper</h4>
          <p>경북 경산시 하양읍 하양로 13-13</p>
          <p>대구가톨릭대학교 공학관 D2-509</p>
        </div>
      </div>

    </section>
  );
}
