// ==============================
// GalleryCard.tsx (갤러리 카드 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 갤러리 페이지에서 사용하는 단일 카드 컴포넌트입니다.
// 이미지, 제목, 설명을 props로 받아서 16:9 비율 이미지와 함께 카드 형식으로 출력합니다.
//
// 주요 기능:
// 1. props로 전달된 image, title, description을 UI에 표시
// 2. CSS 모듈(GalleryCard.module.css)을 사용해 스타일링
// 3. 갤러리 리스트(Gallery.tsx)에서 여러 개의 GalleryCard를 배치하여 활용
//
// English Explanation:
// This component represents a single card used in the gallery page.
// It receives image, title, and description as props, and displays them
// in a card layout with a 16:9 image aspect ratio.
//
// Features:
// 1. Displays image, title, and description passed via props
// 2. Styled using CSS modules (GalleryCard.module.css)
// 3. Used inside Gallery.tsx where multiple GalleryCard components are rendered

import styles from "./GalleryCard.module.css";

// ==============================
// Props 타입 정의
// ==============================
// 한국어: image(이미지 경로), title(제목), description(설명) 전달
// English: image (path), title, description passed as props
interface GalleryCardProps {
  image: string;       // 이미지 경로 / Image path
  title: string;       // 카드 제목 / Card title
  description: string; // 카드 설명 / Card description
}

// ==============================
// GalleryCard 컴포넌트
// ==============================
// 한국어: 갤러리에서 단일 카드(이미지+텍스트)를 출력
// English: Render a single gallery card (image + text)
export default function GalleryCard({ image, title, description }: GalleryCardProps) {
  return (
    <div className={styles.card}>
      {/* 이미지 영역 / Image Section */}
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      {/* 본문 영역 (제목 + 설명) / Body Section (Title + Description) */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
