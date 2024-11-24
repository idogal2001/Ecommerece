import { useQuery } from '@apollo/client';
import { categories } from '../GQLQueries.tsx/CategoriesQuery';
import { products } from '../GQLQueries.tsx/ProductsQuery';
import type { Category } from '../../Interfaces/Category';

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

interface FetchDataResult {
	productsData?: { products: OldProduct[] };
	productsLoading: boolean;
	productsError?: Error;
	categoriesData?: { categories: Category[] };
	categoriesLoading: boolean;
	categoriesError?: Error;
}

const useFetchData = (): FetchDataResult => {
	const { data: productsData, loading: productsLoading, error: productsError } = useQuery(products);
	const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(categories);

	return {
		productsData,
		productsLoading,
		productsError,
		categoriesData,
		categoriesLoading,
		categoriesError,
	};
};

export default useFetchData;
