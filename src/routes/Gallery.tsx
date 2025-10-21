import SiteHeader from "@/components/siteHeader/SiteHeader";
import SiteFooter from "@/components/sitefooter/SiteFooter";
import Gallery from "@/app/routes/Gallery";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <Gallery />
    <SiteFooter/>
    </>
  );
}
