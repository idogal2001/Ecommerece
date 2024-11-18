import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { categories } from '../GQLQueries.tsx/CategoriesQuery';
import { products } from '../GQLQueries.tsx/ProductsQuery';
import styles from '../Query/Query.module.scss';
import type { Category } from '../../Category';
import type { Product } from '../../Product';

interface QueryProps {
	setProductCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	setProductListDB: React.Dispatch<React.SetStateAction<Product[]>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Query = ({ setProductCategories, setProductListDB, setLoading }: QueryProps): JSX.Element => {
	const { data: productsData, loading: productsLoading, error: productsError } = useQuery(products);
	const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(categories);

	useEffect(() => {
		if (productsData) {
			const formattedProducts = productsData.products.map((product: Product) => ({
				id: product.id,
				name: product.name,
				image_url: product.image_url,
				upload_date: product.upload_date,
				description: product.description,
				price: product.price,
				seller_name: product.seller_name,
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

		if(!productsLoading && !categoriesLoading){
			setLoading(false);
		}
	}, [productsData, categoriesData, productsLoading, categoriesLoading, setProductCategories, setProductListDB, setLoading]);



	if (productsLoading ?? categoriesLoading) return <div className={styles.loading}>Loading...</div>;
	if (productsError ?? categoriesError) return <div className={styles.error}>error...</div>;

	return <></>;
};

export default Query;
