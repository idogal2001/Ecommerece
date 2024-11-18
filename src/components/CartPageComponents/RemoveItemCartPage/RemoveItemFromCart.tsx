import React, { useContext } from 'react';
import { amountContext, newProductListContext } from '../../../App';
import styles from '../RemoveItemCartPage/RemoveItemCartPage.module.scss';
import type { Product } from '../../../Product';

interface RemoveItemCartPageProps {
	priceOfList: number;
	setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
	id: number;
}

const RemoveItemFromCart = ({ priceOfList, setPriceOfList, id }: RemoveItemCartPageProps): JSX.Element => {
	const amountData = useContext(amountContext);
	const [amount, setAmount] = amountData;
	const productListData = useContext(newProductListContext);
	const [newProductList, setNewProductList] = productListData;

	const removeItem = (id: number): void => {
		const itemInfo: Product | undefined = newProductList.find(product => product.id === id);
		if (itemInfo) {
			const filteredProductList: Product[] = newProductList.filter(product => product.id !== id);
			setAmount(amount - 1);
			setPriceOfList(priceOfList - itemInfo.price);
			setNewProductList(filteredProductList);
		}
	};

	const removingItem = (id: number): void => {
		const currentProduct = newProductList.find((product: Product) => product.id === id);
		if (currentProduct) {
			if (currentProduct.amount === 1) {
				removeItem(id);
			} else {
				const updatedProductList: Product[] = newProductList.map((product: Product) => {
					if (product.id === id) {
						return { ...product, amount: currentProduct.amount - 1 };
					} else {
						return product;
					}
				});
				setPriceOfList(priceOfList - currentProduct.price);
				setAmount(amount - 1);
				setNewProductList(updatedProductList);
			}
		}
	};

	return (
		<button className={styles.itemButton} onClick={() => removingItem(id)}>
			-
		</button>
	);
};

export default RemoveItemFromCart;
