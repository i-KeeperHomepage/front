import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import "./index.css";
import "@/global.css";

const kakaoKey = import.meta.env.VITE_KAKAO_API_KEY;


function AppLoader() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      (window as any).kakao.maps.load(() => {
        console.log("Kakao Maps SDK 로드 완료 및 초기화 가능");
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <RouterProvider router={router} />;
}


createRoot(document.getElementById("root")!).render(
    <AppLoader />
);
