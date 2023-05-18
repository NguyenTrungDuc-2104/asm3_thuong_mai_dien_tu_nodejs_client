import { json, redirect } from "react-router-dom";
import Checkout from "../components/Checkout/Checkout";
const CheckoutPage = () => {
  return <Checkout />;
};
export default CheckoutPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/get_checkout",
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

export const action = async ({ request, params }) => {
  const method = request.method;
  const inputValue = await request.formData();

  const body = {
    name: inputValue.get("name"),
    email: inputValue.get("email"),
    phoneNumber: inputValue.get("phoneNumber"),
    address: inputValue.get("address"),
    total: inputValue.get("total"),
  };
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/post_order",
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
  window.alert("Order successful, check your order in your email");
  return redirect("/shop/all");
};
