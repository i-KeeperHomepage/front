import { useState } from "react";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";
import { Outlet } from "react-router-dom";

export default function Reference() {
  const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);
  const [iKeeperSeminarPage, setiKeeperSeminarPage] = useState(1);

  return (
    <section>
      <PostTable
        posts={demoPosts}
        currentPage={iKeeperSeminarPage}
        setCurrentPage={setiKeeperSeminarPage}
        postsPerPage={5}
        basePath="/reference/KeeperSeminar"
        title="Keeper Seminar"
        showWriteButton = {true}
      />

      <PostTable
        posts={demoPosts}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        postsPerPage={5}
        basePath="/reference/seminar"
        title="Info Sharing Seminar"
        showWriteButton = {true}
      />

      <PostTable
        posts={demoPosts}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        postsPerPage={5}
        basePath="/reference/special"
        title="Special Lecture"
        showWriteButton = {true}
      />
      <Outlet />
    </section>
  );
}
