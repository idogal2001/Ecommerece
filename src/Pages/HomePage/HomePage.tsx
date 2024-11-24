import { useContext, useEffect, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { amountContext, productListDBContext, productDBCategoriesContext, HomePageContext, highestPriceContext } from '../../Context/Context';
import Query from '../../ServerData/Query/Query';
import Filters from '../../components/FiltersComponents/Filters/Filters';
import Navbar from '../../components/Navbar/Navbar';
import ProductList from '../../components/ProductListComponents/ProductList/ProductList';
import styles from '../HomePage/HomePage.module.scss';
import type { Category } from '../../Interfaces/Category';
import type { Product } from '../../Interfaces/Product';

const HomePage = (): JSX.Element => {
	const { highestPrice , setHighestPrice} = useContext(highestPriceContext);
	const { productListDB, setProductListDB } = useContext(productListDBContext);
	const { setProductCategories } = useContext(productDBCategoriesContext);
	const [minPriceRange, setMinPriceRange] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [layout, setLayout] = useState<boolean>(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const { amount } = useContext(amountContext);
	const [maxPriceRange, setMaxPriceRange] = useState<number>(highestPrice);

	useEffect(() => {
		setProductListFiltered(productListDB);
		setMaxPriceRange(highestPrice);
	}, [highestPrice, productListDB]);

	const [productListFiltered, setProductListFiltered] = useState<Product[]>(productListDB);

	return productListFiltered.length === 0 ? (
		<Query setProductCategories={setProductCategories} setProductListDB={setProductListDB} setHighestPrice={setHighestPrice} />
	) : (
		<HomePageContext.Provider
			value={{
				minPriceRange,
				setMinPriceRange,
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
			<Query setProductCategories={setProductCategories} setProductListDB={setProductListDB} setHighestPrice={setHighestPrice} />
			{productListFiltered.length > 0 && (
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
			)}
		</HomePageContext.Provider>
	);
};

export default HomePage;
