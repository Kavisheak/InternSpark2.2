
import { AdNavbar } from "./AdNavbar";
import { AdHero } from "./AdHero";
import AdFooter from "./AdFooter";

const AdvertismentPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AdNavbar />
      <main className="flex-grow">
        <AdHero />
      </main>
      <AdFooter />
    </div>
  );
};

export default AdvertismentPage;
