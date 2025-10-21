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
    const onLoadKakaoMap = () => {
      if (!(window as any).kakao || !(window as any).kakao.maps) return;

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

    // 이미 로드된 스크립트가 있다면 바로 실행
    if (document.getElementById("kakao-map-script")) {
      onLoadKakaoMap();
      return;
    }

    // 새로 로드
    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&autoload=false`;
    script.async = true;
    script.onload = onLoadKakaoMap;
    document.head.appendChild(script);

    // cleanup
    return () => {
      if (mapRef.current) mapRef.current.innerHTML = "";
    };
  }, [lat, lng, level]);

  return <div ref={mapRef} className={styles.map}></div>;
}
