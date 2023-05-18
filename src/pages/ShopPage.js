import { json } from "react-router-dom";
import Shop from "../components/Shop/Shop";

const ShopPage = () => {
  return <Shop />;
};
export default ShopPage;

export const loader = async ({ request, params }) => {
  const shopType = params.shopType || "all";
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/product/get_products/${shopType}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  const data = await response.json();
  return data;
};
