import { useContext } from 'react';
import { amountContext, cartProductListContext } from '../../../Context/Context';
import styles from '../AddItemProductPage/AddItemProductPage.module.scss';
import type { Product } from '../../../Interfaces/Product';

interface AddItemProductPageProps {
	product: Product;
	itemAmount: number;
	allowAdd: boolean;
}

const AddItemProductPage = ({ product, itemAmount, allowAdd }: AddItemProductPageProps): JSX.Element => {
	const {amount, setAmount} = useContext(amountContext);
	const {cartProductList, setCartProductList} = useContext(cartProductListContext);

	const addProduct = (itemAmount: number, product: Product): void => {
		const newProduct: Product = { ...product, amount: itemAmount };
		if (allowAdd) {
			const existingProduct = cartProductList.find(product => product.id === newProduct.id);
			if (!existingProduct) {
				setCartProductList([...cartProductList, newProduct]);
				setAmount(amount + itemAmount);
			} else {
				if (existingProduct.amount + itemAmount > 20) {
					alert('pls less then 20');
				} else {
					const updatedProductList: Product[] = cartProductList.map((productCart: Product) => productCart.id === product.id ? { ...productCart, amount: existingProduct.amount + itemAmount } : productCart);
					setCartProductList(updatedProductList);
					setAmount(amount + itemAmount);
				}
			}
		}
	};

	return (
		<div className={styles.addCartButtonPadding}>
			<button className={styles.addCartButton} onClick={() => addProduct(itemAmount, product)}>
				Add To Cart
			</button>
		</div>
	);
};

export default AddItemProductPage;
