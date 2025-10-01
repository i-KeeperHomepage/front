// ==============================
// 갤러리 페이지 (Gallery.tsx)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 갤러리 페이지를 담당합니다.
// 각 활동 사진과 설명을 담은 GalleryCard 컴포넌트를 반복적으로 렌더링합니다.
// 주요 기능:
// 1. items 배열에 갤러리에 표시할 이미지, 제목, 설명 데이터를 정의
// 2. map 함수를 사용하여 GalleryCard 컴포넌트 여러 개를 생성
// 3. 반응형 grid 레이아웃 (1열, 2열, 3열)으로 정렬
//
// English Explanation:
// This component represents the gallery page.
// It repeatedly renders GalleryCard components with images and descriptions of activities.
// Main features:
// 1. Define an `items` array containing image, title, and description data
// 2. Use the map function to render multiple GalleryCard components
// 3. Arrange the cards in a responsive grid layout (1 column, 2 columns, 3 columns)

import GalleryCard from "@/components/galleryCard/GalleryCard";
import style from "./Gallery.module.css";

export default function Gallery() {
  // 한국어: 갤러리에 표시할 항목 데이터 (이미지, 제목, 설명)
  // English: Items to display in the gallery (image, title, description)
  const items = [
    {
      image: "/img/racoon.png",
      title: "보안 세미나",
      description: "2025년 i-Keeper 정기 보안 세미나 활동 사진",
    },
    {
      image: "/img/sieun.png",
      title: "해커톤",
      description: "팀 프로젝트를 통한 보안 해커톤 대회 참여",
    },
  ];

  return (
    // 한국어: site-container 클래스로 전체 레이아웃 정렬 + Tailwind grid를 활용해 반응형 그리드 구성
    // English: Layout aligned with site-container + responsive grid using Tailwind
    <section className="site-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* 한국어: 섹션 제목 */}
      {/* English: Section Title */}
      <h2 className={style.subject}>Gallery</h2>

      {/* 한국어: items 배열을 map으로 순회하면서 GalleryCard 렌더링 */}
      {/* English: Render GalleryCard for each item in items */}
      {items.map((item, idx) => (
        <GalleryCard
          key={idx}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
}
