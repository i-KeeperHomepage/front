import styles from "./GalleryCard.module.css";

interface GalleryCardProps {
  image: string;
  title: string;
  description: string;
}

export default function GalleryCard({ image, title, description }: GalleryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
