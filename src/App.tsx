import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, createContext } from "react";
import "./App.css";
import CartList from "./Pages/CartList";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";

interface Product {
  id: number;
  image: string;
  description: string;
  name: string;
  price: number;
  amount: number;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/CartList",
    element: <CartList />,
  },
  {
    path: "/ProductPage",
    element: <ProductPage />,
    errorElement: <NotFoundPage />,
    children: [{ path: ":id", element: <ProductPage /> }],
  },
]);

export const amountContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>] | undefined>(undefined);
export const productListContext = createContext<[Product[], React.Dispatch<React.SetStateAction<Product[]>>] | undefined>(undefined);

const App = () => {
  const [amount, setAmount] = useState<number>(0);
  const [productNewList, setProductNewList] = useState<Product[]>([])

  return (
    <productListContext.Provider value = {[productNewList, setProductNewList]}>
    <amountContext.Provider value={[amount, setAmount]}>
      <RouterProvider router={router} />
    </amountContext.Provider>
    </productListContext.Provider>
  );
};

export default App;
