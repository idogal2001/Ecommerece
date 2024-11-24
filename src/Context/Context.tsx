import { createContext } from 'react';
import type { Category } from '../Interfaces/Category';
import type { Product } from '../Interfaces/Product';
import type { Dispatch, SetStateAction } from 'react';

interface HomePageContextProps {
	minPriceRange: number;
	setMinPriceRange: Dispatch<SetStateAction<number>>;
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
	minPriceRange: 0,
	setMinPriceRange: () => {},
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

export const cartProductListContext = createContext<{
	cartProductList: Product[];
	setCartProductList: Dispatch<SetStateAction<Product[]>>;
}>({ cartProductList: [], setCartProductList: () => {} });

export const amountContext = createContext<{
	amount: number;
	setAmount: Dispatch<SetStateAction<number>>;
}>({ amount: 0, setAmount: () => {} });

export const productListDBContext = createContext<{
	productListDB: Product[];
	setProductListDB: Dispatch<SetStateAction<Product[]>>;
}>({ productListDB: [], setProductListDB: () => {} });

export const productDBCategoriesContext = createContext<{
	productCategories: Category[];
	setProductCategories: Dispatch<SetStateAction<Category[]>>;
}>({ productCategories: [], setProductCategories: () => {} });

export const highestPriceContext = createContext<{
	highestPrice: number;
	setHighestPrice: Dispatch<SetStateAction<number>>;
}>({ highestPrice: 0, setHighestPrice: () => {} });
