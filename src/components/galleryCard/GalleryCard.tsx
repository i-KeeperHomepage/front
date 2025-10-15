// ==============================
// GalleryCard.tsx (갤러리 카드 컴포넌트 - 백엔드 연동 버전)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 백엔드에서 갤러리 데이터를 불러와 카드 형태로 출력합니다.
// 각 이미지, 제목, 설명 데이터는 서버에서 받아오며, useEffect를 통해 API 호출을 수행합니다.
//
// 주요 기능:
// 1. 백엔드에서 갤러리 데이터 요청 (GET /api/gallery)
// 2. 응답 데이터를 map으로 순회하여 카드 여러 개 렌더링
// 3. 로딩 중/오류 상태 처리 포함
// 4. CSS 모듈로 스타일링 유지
//
// English Explanation:
// This component fetches gallery data from the backend API
// and displays each image, title, and description as a card.
// Uses useEffect to fetch on mount, with loading/error handling.

import { useEffect, useState } from "react";
import styles from "./GalleryCard.module.css";

// ==============================
// 데이터 타입 정의
// ==============================
// 한국어: 백엔드에서 받아올 갤러리 데이터 구조
// English: Data structure fetched from backend
interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

// ==============================
// GalleryCard 컴포넌트
// ==============================
export default function GalleryCard() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==============================
  // 백엔드에서 갤러리 데이터 불러오기
  // ==============================
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery"); // 백엔드 갤러리 API 호출
        if (!res.ok) throw new Error("갤러리 데이터를 불러올 수 없습니다.");

        const data = await res.json();

        // 데이터 매핑 (백엔드 응답 구조에 따라 조정 가능)
        const mapped: GalleryItem[] = data.items.map((g: any) => ({
          id: g.id,
          imageUrl: g.imageUrl,
          title: g.title,
          description: g.description,
        }));

        setItems(mapped);
      } catch (err: any) {
        console.error("갤러리 불러오기 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  // ==============================
  // 로딩/오류 처리
  // ==============================
  if (loading) return <p>갤러리를 불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  // ==============================
  // 갤러리 카드 렌더링
  // ==============================
  return (
    <section className="site-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          {/* 이미지 영역 */}
          <div className={styles.imageWrap}>
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
          </div>

          {/* 제목 + 설명 */}
          <div className={styles.body}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
