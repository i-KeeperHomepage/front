import SiteHeader from "@/components/siteHeader/SiteHeader";
import SiteFooter from "@/components/sitefooter/SiteFooter";
import Activities from "@/app/routes/Activities";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <Activities />
    <SiteFooter/>
    </>
  );
}
