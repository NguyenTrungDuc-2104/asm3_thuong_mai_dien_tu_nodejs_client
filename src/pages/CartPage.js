import { redirect, json } from "react-router-dom";
import Cart from "../components/Cart/Cart";

const CartPage = () => {
  return <Cart />;
};
export default CartPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/get_cart",
    { method: "GET", credentials: "include" }
  );
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  const data = await response.json();
  return data;
};

export const action = async ({ request, params }) => {
  const method = request.method;
  const dataValue = await request.formData();
  const body = {
    type: dataValue.get("type"),
    productId: dataValue.get("productId"),
  };

  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/change_cart",
    {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  return redirect("/cart");
};
