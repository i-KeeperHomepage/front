import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.site_container}>
        <nav className={styles.nav}>
          <a href="/about">About</a>
          <a href="/activities">Activities</a>
          <a href="/reference">Reference</a>
          <a href="/support">Support</a>
          <a href="/gallery">Gallery</a>
        </nav>

        <div className={styles.info}>
          <p>
            ClubName : i-Keeper  &nbsp;&nbsp; Address :
            경상북도 경산시 하양읍 하양로 13-13 대구가톨릭대학교 공학관 D2-509 &nbsp;&nbsp;
          </p>
        </div>

        <div className={styles.copy}>
          COPYRIGHT (C) i-Keeper ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
