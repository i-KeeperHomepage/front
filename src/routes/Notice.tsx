import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/sitefooter/SiteFooter";
import Notice from "@/app/routes/Notice";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <Notice />
    <SiteFooter/>
    </>
  );
}
