import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 왼쪽: 네비 + 정보 */}
        <div className={styles.left}>
          <nav className={styles.nav}>
            <a href="/about">i-Keeper</a>
            <a href="/notice">Notice</a>
            <a href="/reference">Activity</a>
            <a href="/library">ETC</a>
          </nav>

          <div className={styles.info}>
            <p>
              ClubName : i-Keeper &nbsp;&nbsp; Address :
              경상북도 경산시 하양읍 하양로 13-13 대구가톨릭대학교 공학관 D2-509
              &nbsp;&nbsp;
            </p>
          </div>

          <div className={styles.copy}>
            COPYRIGHT (C) i-Keeper ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* 오른쪽: 협력기관 로고 */}
        <div className={styles.right}>
          <img
            src="/img/kucis_logo.png"
            alt="협력기관1"
            className={styles.partnerLogo}
          />
          <img
            src="/img/kucis_logo.png"
            alt="협력기관2"
            className={styles.partnerLogo}
          />
          <img
            src="/img/kucis_logo.png"
            alt="협력기관3"
            className={styles.partnerLogo}
          />
        </div>
      </div>
    </footer>
  );
}
