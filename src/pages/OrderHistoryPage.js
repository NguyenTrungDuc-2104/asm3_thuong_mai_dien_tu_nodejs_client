import { json } from "react-router-dom";
import OrderHistory from "../components/OrderHistory/OrderHistory";
const OrderHistoryPage = () => {
  return <OrderHistory />;
};
export default OrderHistoryPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/get_orders",
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
