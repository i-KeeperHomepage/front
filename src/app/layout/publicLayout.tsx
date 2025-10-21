import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/siteHeader/SiteHeader";
import styles from "./publicLayout.module.css";
import SiteFooter from "@/components/sitefooter/SiteFooter";

export default function PublicLayout() {
  return (
    <div className={styles.root}>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.site_container}>
          <Outlet />
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}
