import React, { createContext, useContext, useState } from "react";
import ProductList from "../components/ProductListComponents/ProductList";
import Navbar from "../components/Navbar";
import Filters from "../components/FiltersComponents/FilterChoices/Filters";
import { ProductsDataBackUp } from "../ProductsDataBackUp";
import { amountContext } from "../App";
import styles from "../styles/HomePage/HomePage.module.scss";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Query from "../ApolloData/Query";

interface ProductListProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface HomePageContextProps {
  minPrice: number | undefined;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  layout: boolean;
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  productList: ProductListProps[];
  setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
  maxPriceRange: number | undefined;
  setMaxPriceRange: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const HomePageContext = createContext<HomePageContextProps | undefined>(undefined);

const HomePage = () => {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [layout, setLayout] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [productList, setProductList] = useState<ProductListProps[]>(ProductsDataBackUp);
  const [maxPriceRange, setMaxPriceRange] = useState<number | undefined>()

  const amountData = useContext(amountContext);
  if(!amountData){
    throw new Error('amountContext is not provided');
  }

  const [amount, ] = amountData;

  return (
  <HomePageContext.Provider value={{
    minPrice,
    setMinPrice,
    search,
    setSearch,
    layout,
    setLayout,
    categories,
    setCategories,
    productList,
    setProductList,
    maxPriceRange,
    setMaxPriceRange
  }}>
    <div className={styles.webContainer}>
      <Navbar />
      <div className={styles.pageUnderNavBar}>
        <Filters />
        <div className={styles.rightSideOfPage}>
      <span className={styles.cartButtonVisible}><Link to="/CartList"><button className={styles.cartButton}>{amount}<span className={styles.cartButtonPadding}> Cart</span><FaCartShopping /></button></Link></span>
          <div className={styles.productListPadding}>
              <ProductList />
          </div>
        </div>
      </div>
    </div>
    </HomePageContext.Provider>
  );

};


export default HomePage;
