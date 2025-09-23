import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/sitefooter/SiteFooter";
import Reference from "@/app/routes/Reference";

export default function Home() {
  return (
    <>
    <SiteHeader/>
    <Reference />
    <SiteFooter/>
    </>
  );
}
