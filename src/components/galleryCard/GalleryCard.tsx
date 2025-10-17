// ==============================
// GalleryCard.tsx (갤러리 카드 프리젠테이셔널 컴포넌트)
// ==============================
//
// 설명:
// - 부모(Gallery.tsx)에서 전달한 이미지/제목/설명을 그대로 렌더링하는 "단일 카드" 컴포넌트입니다.
// - 데이터 fetch, 로딩/에러 상태는 이 컴포넌트에서 처리하지 않습니다.
// - image 또는 imageUrl 어느 쪽을 주어도 동작합니다.

import styles from "./GalleryCard.module.css";

export interface GalleryCardProps {
  image?: string;       // 대표 키
  imageUrl?: string;    // 기존 호출부 호환용
  title: string;
  description: string;
}

export default function GalleryCard({
  image,
  imageUrl,
  title,
  description,
}: GalleryCardProps) {
  const src = image ?? imageUrl ?? "";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={src} alt={title} className={styles.image} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
