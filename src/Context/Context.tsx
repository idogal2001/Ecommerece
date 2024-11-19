import { createContext } from "react";
import type { Category } from "../Interfaces/Category";
import type { Product } from "../Interfaces/Product";
import type { Dispatch, SetStateAction } from "react";

interface HomePageContextProps {
	minPrice: number;
	setMinPrice: Dispatch<SetStateAction<number>>;
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	layout: boolean;
	setLayout: Dispatch<SetStateAction<boolean>>;
	categories: Category[];
	setCategories: Dispatch<SetStateAction<Category[]>>;
	productListFiltered: Product[];
	setProductListFiltered: Dispatch<SetStateAction<Product[]>>;
	maxPriceRange: number;
	setMaxPriceRange: Dispatch<SetStateAction<number>>;
}

export const HomePageContext = createContext<HomePageContextProps>({
	minPrice: 0,
	setMinPrice: () => {},
	search: '',
	setSearch: () => {},
	layout: false,
	setLayout: () => {},
	categories: [],
	setCategories: () => {},
	productListFiltered: [],
	setProductListFiltered: () => {},
	maxPriceRange: 1300,
	setMaxPriceRange: () => {},
});

export const cartProductListContext = createContext<[Product[], Dispatch<SetStateAction<Product[]>>]>([[], () => {}]);
export const amountContext = createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => {}]);
export const productListDBContext = createContext<[Product[], Dispatch<SetStateAction<Product[]>>]>([[], () => {}]);
export const productDBCategoriesContext = createContext<[Category[], Dispatch<SetStateAction<Category[]>>]>([[], () => {}]);