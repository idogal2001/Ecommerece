import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HomePageContext } from '../../../Pages/HomePage/HomePage';
import styles from '../../GlobalProductBox/Global.module.scss';
import AddProduct from '../AddProduct/AddProduct';

const ProductList = (): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const search = homePageData.search;
	const categoryFilter = homePageData.categories;
	const maxPriceRange = homePageData.maxPriceRange;
	const minPriceRange = homePageData.minPrice;
	let productList = homePageData.productListFiltered;

	productList = productList.filter(({ description: itemName }) => {
		if (search === "") {
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

	if (productList.length === 0) {
		return <div className={styles.notInStock}>Not in stock</div>;
	}

	if (minPriceRange !== 0) {
		productList = productList.filter(({ price: itemPrice }) => itemPrice >= minPriceRange);
	}
	if (maxPriceRange !== 1300) {
		productList = productList.filter(({ price: itemPrice }) => itemPrice <= maxPriceRange);
	}

	if (categoryFilter.length > 0) {
		productList = productList.filter((product) => 
		  product.categories.some((productCategory) => 
			categoryFilter.some((category) => category.id === productCategory.id)
		  )
		);
	  }

	return (
		<div className={styles.productList}>
			{productList.map(product => (
				<div className={styles.productBox} key={product.id}>
					<Link to={`/ProductPage/${product.id}`}>
						<div className={styles.imageContainer}>
							<div>
								<img className={styles.image} alt={`product${product.id}`} src={product.image_url} />
							</div>
						</div>
					</Link>
					<div className={styles.productName}>Name: {product.description}</div>
					<div>Date: {new Date(product.upload_date).toLocaleDateString("en-GB")}</div>
					<div>Price: {product.price}₪</div>
					<div className={styles.description}>description: {product.name}</div>
					<AddProduct
						id={product.id}
						image_url={product.image_url}
						description={product.description}
						name={product.name}
						price={product.price}
						upload_date={product.upload_date}
						seller_name={product.seller_name}
						amount={product.amount}
						categories={product.categories}
					/>
				</div>
			))}
		</div>
	);
};

export default ProductList;
