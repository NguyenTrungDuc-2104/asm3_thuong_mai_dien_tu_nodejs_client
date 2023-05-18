import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage, { action as logoutAction } from "./pages/LayoutPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import ShopPage, { loader as shopLoader } from "./pages/ShopPage";
import ShopList from "./components/Shop/ShopList";
import DetailPage, {
  loader as detailLoader,
  action as detailAction,
} from "./pages/DetailPage";
import CartPage, {
  loader as cartLoader,
  action as cartAction,
} from "./pages/CartPage";
import CheckoutPage, {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./pages/CheckoutPage";
import OrderHistoryPage, {
  loader as orderHistoryLoader,
} from "./pages/OrderHistoryPage";
import OrderDetailPage, {
  loader as orderDetailLoader,
} from "./pages/OrderDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    action: logoutAction,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "shop",
        element: <ShopPage />,
        children: [
          {
            path: ":shopType",
            element: <ShopList />,
            loader: shopLoader,
          },
        ],
      },

      {
        path: "detail/:detailId",
        element: <DetailPage />,
        loader: detailLoader,
        action: detailAction,
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: cartLoader,
        action: cartAction,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        loader: checkoutLoader,
        action: checkoutAction,
      },
      {
        path: "orders",
        element: <OrderHistoryPage />,
        loader: orderHistoryLoader,
      },
      {
        path: "order/:orderId",
        element: <OrderDetailPage />,
        loader: orderDetailLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
