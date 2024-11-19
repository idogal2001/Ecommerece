import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HomePageContext } from '../../../Context/Context';
import styles from '../../GlobalProductBox/Global.module.scss';
import AddProduct from '../AddProduct/AddProduct';
import type { Category } from '../../../Interfaces/Category';
import type { Product } from '../../../Interfaces/Product';

const ProductList = (): JSX.Element => {
	const search: string = useContext(HomePageContext).search;
	const categoryFilter: Category[] = useContext(HomePageContext).categories;
	const maxPriceRange: number = useContext(HomePageContext).maxPriceRange;
	const minPriceRange: number = useContext(HomePageContext).minPrice;
	let productList: Product[] = useContext(HomePageContext).productListFiltered;

	productList = productList.filter(({ description: itemName }) => {
		if (search === '') {
			return true;
		} else {
			let count = 0;
			for (let i = 0; i < search.length; i++) {
				if (itemName.length < search.length) {
					return false;
				}
				if (search[i].toLowerCase() === itemName[i].toLowerCase()) {
					count++;
				}
			}
			if (count === search.length) {
				return true;
			}
			return false;
		}
	});

	if (minPriceRange !== 0) {
		productList = productList.filter(({ price: itemPrice }) => itemPrice >= minPriceRange);
	}
	if (maxPriceRange !== 1300) {
		productList = productList.filter(({ price: itemPrice }) => itemPrice <= maxPriceRange);
	}

	if (categoryFilter.length > 0) {
		productList = productList.filter(product =>
			product.categories.some(productCategory => categoryFilter.some(category => category.id === productCategory.id)),
		);
	}

	if (productList.length === 0) {
		return <div className={styles.notInStock}>Not in stock</div>;
	}

	return (
		<div className={styles.productList}>
			{productList.map((product: Product) => (
				<div className={styles.productBox} key={product.id}>
					<Link to={`/ProductPage/${product.id}`}>
						<div className={styles.imageContainer}>
							<div>
								<img className={styles.image} alt={`product${product.id}`} src={product.imageUrl} />
							</div>
						</div>
					</Link>
					<div className={styles.productName}>Name: {product.name}</div>
					<div>Date: {new Date(product.date).toLocaleDateString('en-GB')}</div>
					<div>Price: {product.price}₪</div>
					<div className={styles.description}>description: {product.description}</div>
					<AddProduct product={product} />
				</div>
			))}
		</div>
	);
};

export default ProductList;
