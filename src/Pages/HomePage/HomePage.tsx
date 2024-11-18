import React, { createContext, useContext, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { amountContext, productListDBContext } from '../../App';
import Filters from '../../components/FiltersComponents/Filters/Filters';
import Navbar from '../../components/Navbar/Navbar';
import ProductList from '../../components/ProductListComponents/ProductList/ProductList';
import styles from '../HomePage/HomePage.module.scss';
import type { Category } from '../../Category';
import type { Product } from '../../Product';

interface HomePageContextProps {
	minPrice: number;
	setMinPrice: React.Dispatch<React.SetStateAction<number>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	layout: boolean;
	setLayout: React.Dispatch<React.SetStateAction<boolean>>;
	categories: Category[];
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	productListFiltered: Product[];
	setProductListFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
	maxPriceRange: number;
	setMaxPriceRange: React.Dispatch<React.SetStateAction<number>>;
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

const HomePage = (): JSX.Element => {
	const productListDB = useContext(productListDBContext);
	const [productDB] = productListDB;
	const [minPrice, setMinPrice] = useState<number>(0);
	const [search, setSearch] = useState<string>("");
	const [layout, setLayout] = useState<boolean>(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [productListFiltered, setProductListFiltered] = useState<Product[]>(productDB);
	const [maxPriceRange, setMaxPriceRange] = useState<number>(1300);

	const amountData = useContext(amountContext);
	const [amount] = amountData;
	  
	return (
		<HomePageContext.Provider
			value={{
				minPrice,
				setMinPrice,
				search,
				setSearch,
				layout,
				setLayout,
				categories,
				setCategories,
				productListFiltered,
				setProductListFiltered,
				maxPriceRange,
				setMaxPriceRange,
			}}
		>
			<div className={styles.webContainer}>
				<Navbar />
				<div className={styles.pageUnderNavBar}>
					<Filters />
					<div className={styles.rightSideOfPage}>
						<div className={styles.cartButtonVisible}>
							<Link to='/CartList'>
								<button className={styles.cartButton}>
									{amount}
									<div className={styles.cartButtonPadding}> Cart</div>
									<FaCartShopping />
								</button>
							</Link>
						</div>
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