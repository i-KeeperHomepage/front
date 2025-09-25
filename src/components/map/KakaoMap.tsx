import { useEffect, useRef } from "react";
import styles from "./KakaoMap.module.css";

interface KakaoMapProps {
  lat: number;
  lng: number;
  level?: number;
}

export default function KakaoMap({ lat, lng, level = 3 }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  console.log("카카오 API KEY:", import.meta.env.VITE_KAKAO_API_KEY);
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&autoload=false`;
  script.async = true;

  script.onload = () => {
    console.log("Kakao Maps SDK 로드 완료");
    (window as any).kakao.maps.load(() => {
      if (!mapRef.current) return;
      const map = new (window as any).kakao.maps.Map(mapRef.current, {
        center: new (window as any).kakao.maps.LatLng(lat, lng),
        level,
      });
      const marker = new (window as any).kakao.maps.Marker({
        position: new (window as any).kakao.maps.LatLng(lat, lng),
      });
      marker.setMap(map);
    });
  };

  document.head.appendChild(script);

  // return () => document.head.removeChild(script); // 🔴 이 줄은 일단 빼보세요
}, [lat, lng, level]);

  return <div ref={mapRef} className={styles.map}></div>;
}
