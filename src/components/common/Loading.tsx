import React from "react";

type LoadingProps = {
  message?: string;
  minHeight?: number | string;   // 페이지/섹션 높이 커스터마이즈
  inline?: boolean;              // 인라인(텍스트 흐름)로 쓰고 싶을 때
  spinner?: boolean;             // 스피너 표시 여부
  ariaLive?: "polite" | "assertive";
};

export default function Loading({
  message = "불러오는 중...",
  minHeight,
  inline = false,
  ariaLive = "polite",
}: LoadingProps) {
  const style: React.CSSProperties = {};
  if (minHeight !== undefined) style.minHeight = minHeight;

  if (inline) {
    return (
      <span role="status" aria-live={ariaLive} style={{ fontWeight: 600 }}>
        {message}
      </span>
    );
  }

  return (
    <div className="loading-center" role="status" aria-live={ariaLive} style={style}>
      <div>
        <div>{message}</div>
      </div>
    </div>
  );
}
