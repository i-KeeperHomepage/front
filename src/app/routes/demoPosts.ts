export interface Post {
  id: number;
  category: string;
  subject: string;
  name: string;
  date: string;
  hit: number;
  content: string;
  image?: string;
}

export const demoPosts: Post[] = [
  {
    id: 3,
    category: "공지",
    subject: "오시는 길 안내드립니다. (자동차 / 대중교통 / 자전거 / 주차안내)",
    name: "관리자",
    date: "2022-05-17",
    hit: 5,
    content:
      "자동차, 대중교통, 자전거, 주차 안내에 대한 자세한 설명이 들어갑니다.\n지도를 참고해주세요.",
    image: "/img/map-pin.jpg",
  },
  {
    id: 2,
    category: "공지",
    subject: "운영시간 안내드립니다.",
    name: "관리자",
    date: "2022-05-17",
    hit: 1,
    content: "운영시간은 평일 오전 9시부터 오후 6시까지입니다.",
  },
  {
    id: 1,
    category: "공지",
    subject: "웹사이트 리뉴얼 소식 전해드립니다.",
    name: "관리자",
    date: "2022-05-17",
    hit: 1,
    content: "i-Keeper 홈페이지가 새롭게 리뉴얼되었습니다!",
  },
];
