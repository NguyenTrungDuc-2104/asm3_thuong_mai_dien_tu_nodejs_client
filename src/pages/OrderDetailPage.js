import { json } from "react-router-dom";
import OrderDetail from "../components/OrderHistory/OrderDetail";
const OrderDetailPage = () => {
  return <OrderDetail />;
};

export default OrderDetailPage;

export const loader = async ({ request, params }) => {
  const oederId = params.orderId;

  const response = await fetch(
    process.env.REACT_APP_API_URL + `/product/get_order/${oederId}`,
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
