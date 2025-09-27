export interface DemoPost {
  id: number;
  category: string;
  title: string;
  author_name: string;
  createAt: string;
  content: string;
  image?: string;
  file?: string;       // 첨부파일 경로/URL
  fileName?: string;
}

export const demoPosts: DemoPost[] = [
  {
    id: 3,
    category: "공지",
    title: "오시는 길 안내드립니다. (자동차 / 대중교통 / 자전거 / 주차안내)",
    author_name: "관리자",
    createAt: "2022-05-17",
    content:
      "자동차, 대중교통, 자전거, 주차 안내에 대한 자세한 설명이 들어갑니다.\n지도를 참고해주세요.",
    image: "/img/map-pin.jpg",
  },
  {
    id: 2,
    category: "공지",
    title: "운영시간 안내드립니다.",
    author_name: "관리자",
    createAt: "2022-05-17",
    content: "운영시간은 평일 오전 9시부터 오후 6시까지입니다.",
  },
  {
    id: 1,
    category: "공지",
    title: "웹사이트 리뉴얼 소식 전해드립니다.",
    author_name: "관리자",
    createAt: "2022-05-17",
    content: "i-Keeper 홈페이지가 새롭게 리뉴얼되었습니다!",
  },
];
