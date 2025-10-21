// ==============================
// SiteHeader.tsx (사이트 헤더 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 웹사이트의 상단(Header) 영역을 구성합니다.
// - 로고, 네비게이션 메뉴, 로그인/회원가입 또는 마이페이지/로그아웃 버튼이 포함됩니다.
// - 데스크톱에서는 드롭다운 메뉴로, 모바일에서는 햄버거 버튼으로 메뉴가 열립니다.
// - 로그인 여부는 localStorage의 token 값으로 확인하며, 로그인/로그아웃 이벤트를 감지합니다.
//
// English Explanation:
// This component represents the website's header (top bar).
// - It includes the logo, navigation menu, and either login/join buttons or mypage/logout buttons.
// - On desktop, dropdown menus are used; on mobile, a hamburger button opens the side menu.
// - Login status is determined via the `token` stored in localStorage, and reacts to login/logout events.

import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import styles from "./SiteHeader.module.css";
import cn from "classnames";

export default function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // 모바일 메뉴 열림 여부

  // 로그인 여부 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // hover 상태 관리 (각 dropdown별)
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setRole(savedRole);
    };

    checkLogin();
    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);
    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  // ESC 키로 사이드 메뉴 닫기
  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (open) window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [open, escHandler]);

  // 모바일 메뉴 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("logout"));
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.site_container}>
          {/* 로고 */}
          <div className={styles.logoWrap}>
            <Link to="/">
              <img
                src="/img/i-Keeper_logo(white, name).jpg"
                alt="i-keeper"
                className={styles.logoImg}
              />
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              {/* i-Keeper */}
              <li
                className={styles.dropdown}
                onMouseEnter={() => setHoverDropdown("iKeeper")}
                onMouseLeave={() => setHoverDropdown(null)}
              >
                <span className={styles.dropdown_container}>i-Keeper</span>
                <ul
                  className={styles.submenu}
                  style={{ display: hoverDropdown === "iKeeper" ? "block" : "none" }}
                >
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/rule">Rule</NavLink></li>
                </ul>
              </li>

              {/* Notice */}
              <li className={styles.dropdown_container}>
                <NavLink to="/notice">Notice</NavLink>
              </li>

              {/* Activity */}
              <li
                className={styles.dropdown}
                onMouseEnter={() => setHoverDropdown("activity")}
                onMouseLeave={() => setHoverDropdown(null)}
              >
                <span className={styles.dropdown_container}>Activity</span>
                <ul
                  className={styles.submenu}
                  style={{ display: hoverDropdown === "activity" ? "block" : "none" }}
                >
                  <li><NavLink to="/gallery">Gallery</NavLink></li>
                  <li><NavLink to="/activities">TeamBuild</NavLink></li>
                  <li><NavLink to="/seminar">Seminar</NavLink></li>
                </ul>
              </li>

              {/* ETC */}
              <li
                className={styles.dropdown}
                onMouseEnter={() => setHoverDropdown("etc")}
                onMouseLeave={() => setHoverDropdown(null)}
              >
                <span className={styles.dropdown_container}>ETC</span>
                <ul
                  className={styles.submenu}
                  style={{ display: hoverDropdown === "etc" ? "block" : "none" }}
                >
                  <li><NavLink to="/library">Library</NavLink></li>
                  <li><NavLink to="/cleaning">Clean</NavLink></li>
                  <li><NavLink to="/fee">Fee</NavLink></li>
                </ul>
              </li>

              {/* Support */}
              <li className={styles.dropdown_container}>
                <NavLink to="/support">Support</NavLink>
              </li>
            </ul>
          </nav>

          {/* 로그인/회원가입 or 마이페이지/로그아웃 */}
          <div className={styles.authLinks}>
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={styles.authLink}>LOGIN</NavLink>
                <NavLink to="/signup" className={styles.authLink}>JOIN</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/mypage" className={styles.authLink}>MYPAGE</NavLink>
                {role === "officer" && (
                  <NavLink to="/officer" className={styles.authLink}>MANAGEMENT</NavLink>
                )}
                <button onClick={handleLogout} className={styles.authLink}>LOGOUT</button>
              </>
            )}
          </div>

          {/* 모바일 전용 토글 버튼: ☰ ↔ ✕ */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 */}
      {open && (
        <div className={styles.sideMenuOverlay} onClick={() => setOpen(false)}>
          <aside
            className={`${styles.sideMenu} ${open ? styles.slideIn : styles.slideOut}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모바일 네비게이션 */}
            <nav className={styles.sideNav}>
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>i-Keeper</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>
                  <li><NavLink to="/rule" onClick={() => setOpen(false)}>Rule</NavLink></li>
                </ul>
              </div>

              <div className={cn(styles.sideDropdown, styles.dropdownLabel)}>
                <NavLink to="/notice" onClick={() => setOpen(false)}>Notice</NavLink>
              </div>

              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>Activity</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink></li>
                  <li><NavLink to="/activities" onClick={() => setOpen(false)}>TeamBuild</NavLink></li>
                  <li><NavLink to="/reference" onClick={() => setOpen(false)}>Seminar</NavLink></li>
                </ul>
              </div>

              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>ETC</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/library" onClick={() => setOpen(false)}>Library</NavLink></li>
                  <li><NavLink to="/cleaning" onClick={() => setOpen(false)}>Clean</NavLink></li>
                  <li><NavLink to="/fee" onClick={() => setOpen(false)}>Fee</NavLink></li>
                </ul>
              </div>

              <div className={cn(styles.sideDropdown, styles.dropdownLabel)}>
                <NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink>
              </div>
            </nav>

            {/* 모바일 로그인/회원가입 vs 마이페이지/로그아웃 */}
            <div className={styles.sideAuth}>
              {!isLoggedIn ? (
                <>
                  <NavLink to="/login" className={styles.authLink} onClick={() => setOpen(false)}>LOGIN</NavLink>
                  <NavLink to="/signup" className={styles.authLink} onClick={() => setOpen(false)}>JOIN</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/mypage" className={styles.authLink} onClick={() => setOpen(false)}>MYPAGE</NavLink>
                  {role === "officer" && (
                    <NavLink to="/officer" className={styles.authLink} onClick={() => setOpen(false)}>MANAGEMENT</NavLink>
                  )}
                  <button onClick={() => { handleLogout(); setOpen(false); }} className={styles.authLink}>
                    LOGOUT
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
