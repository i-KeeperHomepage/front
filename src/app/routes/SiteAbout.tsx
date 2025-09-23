import styles from "./SiteAbout.module.css";

export default function SiteAbout() {
  const members = [
    {
      name: "너구리",
      info: "(3학년, 컴퓨터공학전공)",
      desc: <>출석을 왜함 어차피 교수가 출석가지고 뭐라 안함, 네?<br />그랬구나 또 말을 듣고싶었구나<br/>지금 수업을 듣는다고 지금의 저보다 많이 벌까요?(현재 재산: 1조 4040억원)</>,
      
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
    // ...필요한 만큼 추가
  ];

  return (
    <section className={`site-container ${styles.about}`}>
      {/* 동아리 소개 */}
      <div className={styles.intro}>
        <img src="/img/i-Keeper_logo(white, name).jpg" alt="i-Keeper" className={styles.logo} />
        <div>
          <h2 className={styles.title}>i-Keeper</h2>
          <p className={styles.desc}>
            SW & 정보보안 동아리 i-Keeper는 학과 내외 학우들이 지식을 나누고 성장할 수 있는 장을
            마련하고자 설립되었습니다. <br/>세미나, 프로젝트, 멘토링 등 다양한 활동을 통해 꾸준한 배움을
            추구합니다.
          </p>
        </div>
      </div>

      {/* 현재 임원진 */}
      <h3 className={styles.sectionTitle}>현재 임원진</h3>
      <div className={styles.members}>
        {members.map((m, idx) => (
          <div key={idx} className={styles.card}>
            <img src={m.img} alt={m.name} className={styles.memberImg} />
            <h4 className={styles.memberName}>{m.name} <span>{m.info}</span></h4>
            <p className={styles.memberDesc}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* 지도 + 위치 */}
      <div className={styles.mapSection}>
        <div className={styles.mapWrap}>
          <iframe
            src="https://map.naver.com/v5/"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className={styles.map}
          />
        </div>
        <div className={styles.address}>
          <h4>i-Keeper</h4>
          <p>경북 경산시 하양읍 하양로 13-13</p>
          <p>(대구가톨릭대학교) 공학관 D2-509</p>
          <p>.</p><br/>
          <p>.</p><br/>
          <p>.</p><br/>
          <p>.</p><br/>
        </div>
      </div>
    </section>
  );
}
