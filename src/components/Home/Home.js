import BannerHome from "./BannerHome";
import BrowseProduct from "./BrowseProduct";
import HomeListProduct from "./HomeListProduct";
import HomeFooter from "./HomeFooter";
const Home = () => {
  return (
    <section>
      <BannerHome />
      <BrowseProduct />
      <HomeListProduct />
      <HomeFooter />
    </section>
  );
};

export default Home;
