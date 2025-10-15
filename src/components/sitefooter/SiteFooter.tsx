// ==============================
// SiteFooter.tsx (사이트 푸터 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 모든 페이지 하단에 공통적으로 들어가는 Footer UI입니다.
// 왼쪽에는 네비게이션 메뉴, 동아리 정보, 저작권 표시가 있고,
// 오른쪽에는 협력기관(파트너) 로고들이 배치되어 있습니다.
//
// English Explanation:
// This component represents the common footer UI displayed at the bottom of every page.
// On the left side, it shows navigation links, club information, and copyright text.
// On the right side, it displays partner organization logos.

import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* -----------------------------
            왼쪽 영역: 네비게이션 + 동아리 정보 + 저작권
            Left section: Navigation + Club Info + Copyright
        ----------------------------- */}
        <div className={styles.left}>
          {/* 네비게이션 메뉴 / Navigation menu */}
          <nav className={styles.nav}>
            <a href="/about">i-Keeper</a>
            <a href="/notice">Notice</a>
            <a href="/reference">Activity</a>
            <a href="/library">ETC</a>
          </nav>

          {/* 동아리 정보 / Club information */}
          <div className={styles.info}>
            <p>
              ClubName : i-Keeper &nbsp;&nbsp; Address :
              경상북도 경산시 하양읍 하양로 13-13 대구가톨릭대학교 공학관 D2-509
              &nbsp;&nbsp;
            </p>
          </div>

          {/* 저작권 표기 / Copyright */}
          <div className={styles.copy}>
            COPYRIGHT (C) i-Keeper ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* -----------------------------
            오른쪽 영역: 협력기관 로고
            Right section: Partner logos
        ----------------------------- */}
        <div className={styles.right}>
          <img
            src="/img/kucis_logo.png"
            alt="KUCIS"
            className={styles.partnerLogo}
          />
          <img
            src="/img/incognito_logo.png"
            alt="INC0GNITO"
            className={styles.partnerLogo}
          />
          <img
            src="/img/Hspace_logo(white, name).png"
            alt="HSPACE"
            className={styles.partnerLogo}
          />
        </div>
      </div>
    </footer>
  );
}
