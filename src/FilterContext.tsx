import React, { useState } from "react";
import { createContext } from "react";
import { ProductsDataBackUp } from "./ProductsDataBackUp";

interface Counter {
    number: number;
  }

export const maxPriceContext = createContext<[Counter, React.Dispatch<React.SetStateAction<Counter>>] | undefined>(undefined);


const FilterContext = () => {
    // const [maxPrice, setMaxPrice] = useState<number | undefined>();
    // const [minPrice, setMinPrice] = useState<number | undefined>();
    // const [search, setSearch] = useState<string>();
    // const [categories, setCategories] = useState<string[]>([]);
    // const [productList, setProductList] = useState<ProductListProps[]>(ProductsDataBackUp);
}

export default FilterContext;