import SiteHeader from "@/components/siteHeader/SiteHeader";
import SiteAbout from "@/app/routes/SiteAbout";
import SiteFooter from "@/components/sitefooter/SiteFooter";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <SiteAbout />
    <SiteFooter/>
    </>
  );
}
