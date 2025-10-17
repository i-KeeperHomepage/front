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

import { useEffect, useState } from "react";
import GalleryCard from "@/components/galleryCard/GalleryCard";
import style from "./Gallery.module.css";

// 갤러리 항목 타입 정의
interface GalleryItem {
  imageUrl: string;
  title: string;
  description: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((result) => setItems(result))
      .catch((err) => console.error("갤러리 데이터 불러오기 실패:", err));
  }, []);

  return (
    <section className="site-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <h2 className={style.subject}>Gallery</h2>

      {/* 빈 상태 표시 */}
      {items.length === 0 && (
        <div className={`col-span-full ${style.empty}`}>
          등록된 게시글이 없습니다.
        </div>
      )}

      {items.map((item, idx) => (
        <GalleryCard
          key={idx}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
}
