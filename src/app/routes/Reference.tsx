// ==============================
// Reference.tsx
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 "Reference(자료실)" 페이지를 담당합니다.
// Reference 페이지는 세 개의 하위 카테고리 게시판으로 구성됩니다:
// 1) Keeper 세미나
// 2) 정보공유세미나
// 3) 특강
//
// 각 카테고리별로 PostTable 컴포넌트를 재사용하여 테이블 형태로 게시글을 보여줍니다.
// 초기에는 demoPosts에서 카테고리별로 데이터를 분리하고, 이후 글 작성 시 해당 카테고리에만 추가됩니다.
//
// 주요 기능:
// - useEffect를 사용해 초기 데이터 로딩 (demoPosts에서 카테고리별 분리)
// - 새 글 작성 시 location.state.newPost를 이용하여 해당 카테고리에만 글 추가
// - 최신 글이 위로 오도록 날짜 기준 정렬
// - PostTable 컴포넌트를 재사용하여 페이지네이션 및 글쓰기 버튼 제공
//
// English Explanation:
// This component handles the "Reference" page.
// The Reference page consists of three sub-category boards:
// 1) Keeper Seminar
// 2) Info Sharing Seminar
// 3) Special Lecture
//
// Each category uses the PostTable component to display posts in a table format.
// Initially, posts are loaded from demoPosts and split by category.
// When a new post is created, it is added only to the corresponding category.
// Posts are sorted by date (newest first).
//
// Key Features:
// - Load initial demo data and split posts into categories
// - Add new post only to the corresponding category (via location.state.newPost)
// - Sort posts by creation date (newest first)
// - Reuse PostTable component for pagination and write button per category

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostTable from "@/components/postable/PostTable";
import { demoPosts } from "./demoPosts";
import type { DemoPost } from "./demoPosts";

// 한국어: 날짜 기준 정렬 함수 (최신 글이 위로 오도록)
// English: Sort function by date (newest first)
const sortByDate = (a: DemoPost, b: DemoPost) =>
  new Date(b.createAt).getTime() - new Date(a.createAt).getTime();

export default function Reference() {
  // 한국어: 카테고리별 게시글 상태 관리
  // English: Manage state for each category of posts
  const [keeperSeminarPosts, setKeeperSeminarPosts] = useState<DemoPost[]>([]);
  const [seminarPosts, setSeminarPosts] = useState<DemoPost[]>([]);
  const [specialPosts, setSpecialPosts] = useState<DemoPost[]>([]);

  // 한국어: 각 카테고리별 페이지네이션 상태
  // English: Pagination state for each category
  const [seminarPage, setSeminarPage] = useState(1);
  const [specialPage, setSpecialPage] = useState(1);
  const [KeeperSeminarPage, setKeeperSeminarPage] = useState(1);

  const location = useLocation();

  // 초기 로딩: demoPosts 데이터를 카테고리별로 분리
  // Initial load: Split demoPosts by category
  useEffect(() => {
    if (
      !keeperSeminarPosts.length&&
      !seminarPosts.length &&
      !specialPosts.length
    ) {
      const keeper = demoPosts.filter((p) => p.category === "Keeper 세미나");
      const seminar = demoPosts.filter((p) => p.category === "정보공유세미나");
      const special = demoPosts.filter((p) => p.category === "특강");

      setKeeperSeminarPosts(keeper.sort(sortByDate));
      setSeminarPosts(seminar.sort(sortByDate));
      setSpecialPosts(special.sort(sortByDate));
    }
  }, []);

  // 새 글 작성 시 해당 카테고리에만 추가
  // When a new post is created, add it only to the correct category
  useEffect(() => {
    if (location.state?.newPost) {
      const newPost = { ...location.state.newPost };

      if (newPost.category === "Keeper 세미나") {
        setKeeperSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "정보공유세미나") {
        setSeminarPosts((prev) => [newPost, ...prev].sort(sortByDate));
      } else if (newPost.category === "특강") {
        setSpecialPosts((prev) => [newPost, ...prev].sort(sortByDate));
      }
    }
  }, [location.state]);

  return (
    <section>
      {/* Keeper Seminar 게시판 */}
      <PostTable
        posts={keeperSeminarPosts}
        currentPage={KeeperSeminarPage}
        setCurrentPage={setKeeperSeminarPage}
        postsPerPage={5}
        basePath="/reference/KeeperSeminar"
        title="Keeper Seminar"
        showWriteButton={true}
      />

      {/* Info Sharing Seminar 게시판 */}
      <PostTable
        posts={seminarPosts}
        currentPage={seminarPage}
        setCurrentPage={setSeminarPage}
        postsPerPage={5}
        basePath="/reference/seminar"
        title="Info Sharing Seminar"
        showWriteButton={true}
      />

      {/* Special Lecture 게시판 */}
      <PostTable
        posts={specialPosts}
        currentPage={specialPage}
        setCurrentPage={setSpecialPage}
        postsPerPage={5}
        basePath="/reference/special"
        title="Special Lecture"
        showWriteButton={true}
      />
    </section>
  );
}
