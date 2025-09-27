import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";
import { Outlet } from "react-router-dom";

const sortByDate = (a: DemoPost, b: DemoPost) =>
  new Date(b.createAt).getTime() - new Date(a.createAt).getTime();

export default function Reference() {
  const [keeperPosts, setKeeperPosts] = useState<DemoPost[]>([]);
  const [seminarPosts, setSeminarPosts] = useState<DemoPost[]>([]);
  const [specialPosts, setSpecialPosts] = useState<DemoPost[]>([]);

  const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);
  const [KeeperSeminarPage, setKeeperSeminarPage] = useState(1);

  const location = useLocation();

  // 초기 로딩 시 demoPosts → 카테고리별 분리
  useEffect(() => {
    if (
      keeperPosts.length === 0 &&
      seminarPosts.length === 0 &&
      specialPosts.length === 0
    ) {
      const keeper = demoPosts.filter((p) => p.category === "Keeper 세미나");
      const seminar = demoPosts.filter((p) => p.category === "정보공유세미나");
      const special = demoPosts.filter((p) => p.category === "특강");

      setKeeperPosts(keeper.sort(sortByDate));
      setSeminarPosts(seminar.sort(sortByDate));
      setSpecialPosts(special.sort(sortByDate));
    }
  }, [keeperPosts, seminarPosts, specialPosts]);

  // 새 글 작성 시 해당 카테고리에만 추가
  useEffect(() => {
    if (location.state?.newPost) {
      const newPost = { ...location.state.newPost };

      if (newPost.category === "Keeper 세미나") {
        setKeeperPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "정보공유세미나") {
        setSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "특강") {
        setSpecialPosts((prev) => [newPost, ...prev].sort(sortByDate));
      }
    }
  }, [location.state]);

  return (
    <section>
      <PostTable
        posts={keeperPosts}
        currentPage={KeeperSeminarPage}
        setCurrentPage={setKeeperSeminarPage}
        postsPerPage={5}
        basePath="/reference/KeeperSeminar"
        title="Keeper Seminar"
        showWriteButton={true}
      />

      <PostTable
        posts={seminarPosts}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        postsPerPage={5}
        basePath="/reference/seminar"
        title="Info Sharing Seminar"
        showWriteButton={true}
      />

      <PostTable
        posts={specialPosts}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        postsPerPage={5}
        basePath="/reference/special"
        title="Special Lecture"
        showWriteButton={true}
      />
      <Outlet />
    </section>
  );
}
