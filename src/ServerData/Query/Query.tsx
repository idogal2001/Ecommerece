import { useEffect } from 'react';
import styles from '../Query/Query.module.scss';
import useFetchData from '../UseFetchData/UseFetchData';
import type { Category } from '../../Interfaces/Category';
import type { Product } from '../../Interfaces/Product';

interface OldProduct {
	id: number;
	name: string;
	upload_date: string;
	description: string;
	price: number;
	seller_name: string;
	image_url: string;
	amount: number;
	categories: Category[];
}

interface QueryProps {
	setProductCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	setProductListDB: React.Dispatch<React.SetStateAction<Product[]>>;
	setHighestPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Query = ({ setProductCategories, setProductListDB, setHighestPrice}: QueryProps): JSX.Element => {
	const { productsData, productsLoading, productsError, categoriesData, categoriesLoading, categoriesError } = useFetchData();

	useEffect(() => {
		if (productsData) {
			const formattedProducts: Product[] = productsData.products.map((product: OldProduct) => ({
				id: product.id,
				name: product.description,
				imageUrl: product.image_url,
				date: product.upload_date,
				description: product.name,
				price: product.price,
				sellerName: product.seller_name,
				amount: 0,
				categories: product.categories.map((category: Category) => ({
					id: category.id,
					name: category.name,
				})),
			}));
			setProductListDB(formattedProducts);
			const highestPriceData: number = formattedProducts.reduce((max, product) => (product.price > max ? product.price : max), 0);
			setHighestPrice(highestPriceData);
		}

		if (categoriesData) {
			const formattedCategories = categoriesData.categories.map((category: Category) => ({
				id: category.id,
				name: category.name,
			}));
			setProductCategories(formattedCategories);
		}
	}, [productsData, categoriesData, setProductCategories, setProductListDB, setHighestPrice]);

	if (productsLoading ?? categoriesLoading) return <div className={styles.loading}>Loading...</div>;
	if (productsError ?? categoriesError) return <div className={styles.error}>Error...</div>;

	return <></>;
};

export default Query;
