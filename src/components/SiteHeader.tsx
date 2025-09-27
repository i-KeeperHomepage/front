import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";
import cn from 'classnames';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // 로그인 여부 (추후에는 Context/Auth 상태 or localStorage/JWT 로 대체)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin(); // 첫 렌더링 때 로그인 여부 확인
    window.addEventListener("login", checkLogin);  // 로그인 이벤트
    window.addEventListener("logout", checkLogin); // 로그아웃 이벤트

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout")); // 로그아웃 이벤트 발행
    setIsLoggedIn(false);
    window.location.href = "/"; // 홈으로 이동
  };

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

          {/* 네비게이션 */}
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              {/* i-Keeper */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>i-Keeper</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/rule">Rule</NavLink></li>
                </ul>
              </li>

              {/* Notice */}
              <li className={styles.dropdown_container}><NavLink to="/notice">Notice</NavLink></li>

              {/* Activity */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>Activity</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/gallery">Gallery</NavLink></li>
                  <li><NavLink to="/activities">TeamBuilding</NavLink></li>
                  <li><NavLink to="/reference">Seminar</NavLink></li>
                </ul>
              </li>

              {/* ETC */}
              <li className={styles.dropdown}>
                <span className={styles.dropdown_container}>ETC</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/library">Library</NavLink></li>
                  <li><NavLink to="/cleaning">Cleaning</NavLink></li>
                  <li><NavLink to="/fee">Fee</NavLink></li>
                  <li><NavLink to="/support">Support</NavLink></li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* 로그인/가입 (데스크톱 전용) */}
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
                <button onClick={handleLogout} className={styles.authLink}>
                  LOGOUT
                </button>
              </>
            )}
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
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>
            <nav className={styles.sideNav}>
              {/* i-Keeper */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>i-Keeper</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>
                  <li><NavLink to="/rule" onClick={() => setOpen(false)}>Rule</NavLink></li>
                </ul>
              </div>

              {/* Notice */}
              <div className={cn(styles.sideDropdown, styles.dropdownLabel)}>
                <NavLink to="/notice" onClick={() => setOpen(false)}>Notice</NavLink>
              </div>

              {/* Activity */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>Activity</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink></li>
                  <li><NavLink to="/activities" onClick={() => setOpen(false)}>TeamBuilding</NavLink></li>
                  <li><NavLink to="/reference" onClick={() => setOpen(false)}>Seminar</NavLink></li>
                </ul>
              </div>

              {/* ETC */}
              <div className={styles.sideDropdown}>
                <span className={styles.dropdownLabel}>ETC</span>
                <ul className={styles.submenu}>
                  <li><NavLink to="/library" onClick={() => setOpen(false)}>Library</NavLink></li>
                  <li><NavLink to="/cleaning" onClick={() => setOpen(false)}>Cleaning</NavLink></li>
                  <li><NavLink to="/fee" onClick={() => setOpen(false)}>Fee</NavLink></li>
                  <li><NavLink to="/support" onClick={() => setOpen(false)}>Support</NavLink></li>
                </ul>
              </div>
            </nav>

            {/* 모바일 하단 로그인/가입 vs 마이페이지 */}
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