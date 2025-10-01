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

import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";
import cn from 'classnames';

export default function SiteHeader() {
  const [open, setOpen] = useState(false); // 모바일 메뉴 열림 여부 / Mobile menu state

  // 로그인 여부 상태 / Login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // 로그인 상태 확인 함수 / Check login status
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setRole(savedRole);
    };

    checkLogin(); // 첫 렌더링 시 로그인 여부 확인 / Check on initial render

    // 로그인/로그아웃 이벤트 감지 / Listen for login/logout events
    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  // 로그아웃 처리 / Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("logout")); // 로그아웃 이벤트 발행 / Dispatch logout event
    setIsLoggedIn(false);
    setRole(null);
    window.location.href = "/"; // 홈으로 이동 / Redirect to home
  };

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.site_container}>
          {/* 로고 영역 / Logo section */}
          <div className={styles.logoWrap}>
            <Link to="/">
              <img
                src="/img/i-Keeper_logo(white, name).jpg"
                alt="i-keeper"
                className={styles.logoImg}
              />
            </Link>
          </div>

          {/* 데스크톱 네비게이션 / Desktop navigation */}
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              {/* i-Keeper 메뉴 / i-Keeper menu */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>i-Keeper</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/rule">Rule</NavLink></li>
                </ul>
              </li>

              {/* Notice 메뉴 / Notice menu */}
              <li className={styles.dropdown_container}><NavLink to="/notice">Notice</NavLink></li>

              {/* Activity 메뉴 / Activity menu */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>Activity</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/gallery">Gallery</NavLink></li>
                  <li><NavLink to="/activities">TeamBuild</NavLink></li>
                  <li><NavLink to="/reference">Seminar</NavLink></li>
                </ul>
              </li>

              {/* ETC 메뉴 / ETC menu */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>ETC</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/library">Library</NavLink></li>
                  <li><NavLink to="/cleaning">Clean</NavLink></li>
                  <li><NavLink to="/fee">Fee</NavLink></li>
                  <li><NavLink to="/support">Support</NavLink></li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* 로그인/회원가입 or 마이페이지/로그아웃 / Auth Links */}
          <div className={styles.authLinks}>
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={styles.authLink}>
                  LOGIN
                </NavLink>
                <NavLink to="/signup" className={styles.authLink}>
                  JOIN
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/mypage" className={styles.authLink}>
                  MYPAGE
                </NavLink>
                {/* officer 권한일 때만 노출 */}
                {role === "officer" && (
                  <NavLink to="/officer" className={styles.authLink}>
                    MANAGEMENT
                  </NavLink>
                )}
                <button onClick={handleLogout} className={styles.authLink}>
                  LOGOUT
                </button>
              </>
            )}
          </div>

          {/* 모바일 전용 햄버거 버튼 / Mobile hamburger menu button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 / Mobile side menu */}
      {open && (
        <div
          className={styles.sideMenuOverlay}
          onClick={() => setOpen(false)}
        >
          <aside
            className={`${styles.sideMenu} ${open ? styles.slideIn : styles.slideOut}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 / Close button */}
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>

            {/* 모바일 네비게이션 / Mobile navigation */}
            <nav className={styles.sideNav}>
              {/* i-Keeper 메뉴 */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>i-Keeper</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>
                  <li><NavLink to="/rule" onClick={() => setOpen(false)}>Rule</NavLink></li>
                </ul>
              </div>

              {/* Notice 메뉴 */}
              <div className={cn(styles.sideDropdown, styles.dropdownLabel)}>
                <NavLink to="/notice" onClick={() => setOpen(false)}>Notice</NavLink>
              </div>

              {/* Activity 메뉴 */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>Activity</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink></li>
                  <li><NavLink to="/activities" onClick={() => setOpen(false)}>TeamBuild</NavLink></li>
                  <li><NavLink to="/reference" onClick={() => setOpen(false)}>Seminar</NavLink></li>
                </ul>
              </div>

              {/* ETC 메뉴 */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>ETC</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/library" onClick={() => setOpen(false)}>Library</NavLink></li>
                  <li><NavLink to="/cleaning" onClick={() => setOpen(false)}>Clean</NavLink></li>
                  <li><NavLink to="/fee" onClick={() => setOpen(false)}>Fee</NavLink></li>
                  <li><NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink></li>
                </ul>
              </div>
            </nav>

            {/* 모바일 로그인/회원가입 vs 마이페이지/로그아웃 / Mobile auth links */}
            <div className={styles.sideAuth}>
              {!isLoggedIn ? (
                <>
                  <NavLink to="/login" className={styles.authLink}>
                    LOGIN
                  </NavLink>
                  <NavLink to="/signup" className={styles.authLink}>
                    JOIN
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/mypage" className={styles.authLink}>
                    MYPAGE
                  </NavLink>
                  {role === "officer" && (
                    <NavLink to="/officer" className={styles.authLink}>
                      MANAGEMENT
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className={styles.authLink}>
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
