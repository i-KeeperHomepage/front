import { useState } from "react";
import styles from "./Activities.module.css";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";

export default function Activities() {
const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);
  const [iKeeperSeminarPage, setiKeeperSeminarPage] = useState(1);

  return (
    <section className={`site-container ${styles.activities}`}>

      {/* ✅ PostTable 사용 */}
      <PostTable
        posts={demoPosts}
        currentPage={iKeeperSeminarPage}
        setCurrentPage={setiKeeperSeminarPage}
        postsPerPage={5}
        basePath="/reference/KeeperSeminar"
        title="Keeper Seminar"
      />

      <PostTable
        posts={demoPosts}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        postsPerPage={5}
        basePath="/reference/seminar"
        title="정보공유세미나"
      />

      <PostTable
        posts={demoPosts}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        postsPerPage={5}
        basePath="/reference/special"
        title="특강"
      />
    </section>
  );
}
