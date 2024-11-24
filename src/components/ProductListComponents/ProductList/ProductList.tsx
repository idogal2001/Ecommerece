import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HomePageContext, highestPriceContext } from '../../../Context/Context';
import styles from '../../GlobalProductBox/Global.module.scss';
import AddProduct from '../AddProduct/AddProduct';
import type { Product } from '../../../Interfaces/Product';

const ProductList = (): JSX.Element => {
	let { minPriceRange, maxPriceRange, categories, productListFiltered, search } = useContext(HomePageContext);
	const { highestPrice } = useContext(highestPriceContext);

	productListFiltered = productListFiltered.filter(({ name: itemName }) => {
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
		productListFiltered = productListFiltered.filter(({ price: itemPrice }) => itemPrice >= minPriceRange);
	}

	if (maxPriceRange !== highestPrice) {
		productListFiltered = productListFiltered.filter(({ price: itemPrice }) => itemPrice <= maxPriceRange);
	}

	if (categories.length > 0) {
		productListFiltered = productListFiltered.filter(product =>
			product.categories.some(productCategory => categories.some(category => category.id === productCategory.id)),
		);
	}

	return productListFiltered.length === 0 ? (
		<div className={styles.notInStock}>Not in stock</div>
	) : (
		<div className={styles.productList}>
			{productListFiltered.map((product: Product) => (
				<div className={styles.productBox} key={product.id}>
					<Link to={`/ProductPage/${product.id}`}>
						<div className={styles.imageContainer}>
							<div className={styles.imgBox}>
								<img className={styles.image} alt={`product${product.id}`} src={product.imageUrl} />
							</div>
						</div>
					</Link>
					<div className={styles.productName}>Name: {product.name}</div>
					<div className={styles.dateBox}>Date: {new Date(product.date).toLocaleDateString('en-GB')}</div>
					<div className={styles.priceBox}>Price: {product.price}₪</div>
					<div className={styles.descriptionBox}>description: {product.description}</div>
					<AddProduct {...product} />
				</div>
			))}
		</div>
	);
};

export default ProductList;
