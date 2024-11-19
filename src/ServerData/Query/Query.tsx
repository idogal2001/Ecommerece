import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { categories } from '../GQLQueries.tsx/CategoriesQuery';
import { products } from '../GQLQueries.tsx/ProductsQuery';
import styles from '../Query/Query.module.scss';
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
}

const Query = ({ setProductCategories, setProductListDB }: QueryProps): JSX.Element => {
	const { data: productsData, loading: productsLoading, error: productsError } = useQuery(products);
	const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(categories);

	useEffect(() => {
		if (productsData) {
			const formattedProducts = productsData.products.map((product: OldProduct) => ({
				id: product.id,
				name: product.description,
				imageUrl: product.image_url,
				date: product.upload_date,
				description: product.name,
				price: product.price,
				sellerName: product.seller_name,
				categories: product.categories.map((category: Category) => ({
					id: category.id,
					name: category.name,
				})),
			}));
			setProductListDB(formattedProducts);
		}

		if (categoriesData) {
			const formattedCategories = categoriesData.categories.map((category: Category) => ({
				id: category.id,
				name: category.name,
			}));
			setProductCategories(formattedCategories);
		}
	}, [productsData, categoriesData, productsLoading, categoriesLoading, setProductCategories, setProductListDB]);

	if (productsLoading ?? categoriesLoading) return <div className={styles.loading}>Loading...</div>;
	if (productsError ?? categoriesError) return <div className={styles.error}>error...</div>;

	return <></>;
};

export default Query;
