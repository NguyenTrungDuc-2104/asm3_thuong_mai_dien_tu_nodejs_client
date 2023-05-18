import { redirect, json } from "react-router-dom";
import Detail from "../components/Detail/Detail";
const DetailPage = () => {
  return <Detail />;
};
export default DetailPage;

export const loader = async ({ request, params }) => {
  const detailId = params.detailId;

  const response = await fetch(
    process.env.REACT_APP_API_URL + `/product/get_detail/${detailId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.log("detail loader error");
    return null;
  }
  const data = await response.json();

  return data;
};

export const action = async ({ request, params }) => {
  const productId = params.detailId;
  const method = request.method;
  const inputValue = await request.formData();
  const body = {
    productId,
    quantity: inputValue.get("quantity"),
  };
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/post_addToCart",
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
  const data = await response.json();
  window.alert(data.message);

  return redirect("/cart");
};
