import React, { useContext } from 'react';
import { amountContext, cartProductListContext } from '../../../Context/Context';
import styles from '../../GlobalProductBox/Global.module.scss';
import type { Product } from '../../../Interfaces/Product';

interface AddProductProps {
	product: Product;
}

const AddProduct = ({ product }: AddProductProps): JSX.Element => {
	const [amount, setAmount] = useContext(amountContext);
	const [cartProductList, setCartProductList] = useContext(cartProductListContext);

	const addProduct = (
		product: Product
	): void => {
		const currentProduct = cartProductList.find((productCart: Product) => productCart.id === product.id);
		if (!currentProduct) {
			const productData: Product = { ...product, amount: 1 };
			setCartProductList([...cartProductList, productData]);
			setAmount(amount + 1);
		} else if (currentProduct.amount < 20) {
			const productData: Product[] = cartProductList.map(item => (item.id === product.id ? { ...item, amount: item.amount + 1 } : item));
			setCartProductList(productData);
			setAmount(amount + 1);
		} else {
			alert('please choose less then 20 products');
		}
	};

	return (
		<div className={styles.addCartButtonFlex}>
			<button
				className={styles.addCartButtonProductPage}
				onClick={() =>
					addProduct(product)
				}
			>
				add to cart
			</button>
		</div>
	);
};

export default AddProduct;
