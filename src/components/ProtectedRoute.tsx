// ==============================
// ProtectedRoute.tsx (보호된 라우트 컴포넌트)
// ==============================
//
// 한국어 설명:
// 이 컴포넌트는 특정 페이지 접근을 보호하는 역할을 합니다.
// 사용자가 로그인하지 않았거나(requiredRole이 있는 경우) 지정된 권한이 없으면 다른 페이지로 리다이렉트됩니다.
//
// 주요 기능:
// 1. localStorage에서 token 확인 → 없으면 로그인 페이지로 이동
// 2. requiredRole이 지정되어 있으면 role 확인 → 일치하지 않으면 홈("/")으로 이동
// 3. 조건을 만족하면 전달받은 element를 렌더링
//
// English Explanation:
// This component protects specific routes from unauthorized access.
// If the user is not logged in, or (if requiredRole is set) the user does not have the correct role,
// they will be redirected to another page.
//
// Key Features:
// 1. Check token in localStorage → if not found, redirect to login page
// 2. If requiredRole is specified, check role → if it does not match, redirect to home ("/")
// 3. If all conditions are met, render the provided element

import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactElement;   // 한국어: 렌더링할 컴포넌트 / English: Component to render
  requiredRole?: string;   // 한국어: 필요 권한 / English: Required role (optional)
}

export default function ProtectedRoute({ element, requiredRole }: ProtectedRouteProps) {
  // 한국어: localStorage에서 로그인 정보(token, role) 가져오기
  // English: Get login info (token, role) from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 한국어: 토큰이 없으면 로그인 페이지로 이동
  // English: If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace /> as ReactElement;
  }

  // 한국어: requiredRole이 설정되어 있고, 현재 role과 일치하지 않으면 홈("/")으로 이동
  // English: If requiredRole is set and does not match the current role, redirect to home ("/")
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace /> as ReactElement;
  }

  // 한국어: 모든 조건이 통과되면 원래의 element 렌더링
  // English: If conditions are met, render the original element
  return element;
}
