import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./SiteHeader.module.css";

const nav = [
  { to: "/about", label: "About" },
  { to: "/activities", label: "Activities" },
  { to: "/reference", label: "Reference" },
  { to: "/support", label: "Support" },
  { to: "/gallery", label: "Gallery" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.site_container}>
          {/* 로고 영역 */}
          <div className={styles.logoWrap}>
            <Link to="/">
            <img
              src="/img/i-Keeper_logo(white, name).jpg"
              alt="i-keeper"
              className={styles.logoImg}
            />
            </Link>
          </div>

          {/* 네비게이션 (데스크톱 전용) */}
          <nav className={styles.nav}>
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* 로그인/가입 (데스크톱 전용) */}
          <div className={styles.authLinks}>
            <NavLink to="/login" className={styles.authLink}>
              LOGIN
            </NavLink>
            <NavLink to="/signup" className={styles.authLink}>
              JOIN
            </NavLink>
          </div>

          {/* 모바일 전용 햄버거 버튼 */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      {open && (
        <div
          className={styles.sideMenuOverlay}
          onClick={() => setOpen(false)}
        >
          <aside
            className={`${styles.sideMenu} ${open ? styles.slideIn : styles.slideOut}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <nav className={styles.sideNav}>
              {nav.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${styles.sideNavLink} ${isActive ? styles.active : ""}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            {/* 로그인/가입 (모바일 전용, 사이드 하단) */}
            <div className={styles.sideAuth}>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                LOGIN
              </NavLink>
              <NavLink to="/signup" onClick={() => setOpen(false)}>
                JOIN
              </NavLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
