import SiteHeader from "@/components/siteHeader/SiteHeader";
import SiteFooter from "@/components/sitefooter/SiteFooter";
import Support from "@/app/routes/Support";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <Support />
    <SiteFooter/>
    </>
  );
}
