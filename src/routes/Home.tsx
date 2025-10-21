import SiteHeader from "@/components/siteHeader/SiteHeader";
import SiteHome from "@/app/routes/SiteHome";
import SiteFooter from "@/components/sitefooter/SiteFooter";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <SiteHome />
    <SiteFooter/>
    </>
  );
}
