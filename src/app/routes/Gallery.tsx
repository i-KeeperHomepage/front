import GalleryCard from "@/components/galleryCard/GalleryCard";
import style from "./Gallery.module.css"

export default function Gallery() {
  const items = [
    {
      image: "/img/racoon.png",
      title: "보안 세미나",
      description: "2025년 i-Keeper 정기 보안 세미나 활동 사진",
    },
    {
      image: "/img/sieun.png",
      title: "해커톤",
      description: "팀 프로젝트를 통한 보안 해커톤 대회 참여",
    },
  ];

  return (
    <section className="site-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <h2 className={style.subject}>Gallery</h2>
      {items.map((item, idx) => (
        <GalleryCard
          key={idx}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
}
